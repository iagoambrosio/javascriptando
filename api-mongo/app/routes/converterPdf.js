const roteador = require("express").Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const crypto = require("crypto");

// Configuração do Multer para a rota original (em memória)
const uploadMemory = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4 * 1024 * 1024 // Limita a 5MB para uploads diretos
  }
});

// Configuração do Multer para chunks (também em memória)
const uploadChunk = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4 * 1024 * 1024 // Limita cada chunk a 2MB
  }
});

// Armazenamento de uploads em andamento
const activeUploads = {};

// Função para gerar ID único para cada upload
function generateUniqueFileId(fileName, clientInfo = {}) {
  const timestamp = Date.now();
  const randomBytes = crypto.randomBytes(8).toString('hex');
  const clientIp = clientInfo.ip || 'unknown';
  const clientId = clientInfo.clientId || 'anonymous';
  
  // Criando uma string única combinando vários elementos
  const uniqueString = `${fileName}-${timestamp}-${clientIp}-${clientId}-${randomBytes}`;
  
  // Gerando um hash da string para ter um ID compacto
  return crypto.createHash('md5').update(uniqueString).digest('hex');
}

// Função de log aprimorada
function logInfo(message, details = null) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
  if (details) {
    console.log('  Detalhes:', JSON.stringify(details, null, 2));
  }
}

// Rota GET para verificar se a API está funcionando
roteador.get("/converter", (req, res) => {
  logInfo("GET /converter - API está funcionando");
  res.status(200).json({ message: "API de conversão de PDF está funcionando!" });
});

// Rota POST original para processar PDFs pequenos
roteador.post("/converter", uploadMemory.single("file"), async (req, res) => {
  try {
    // Verifica se um arquivo foi enviado
    if (!req.file) {
      logInfo("POST /converter - Nenhum arquivo enviado");
      return res.status(400).json({ error: "Nenhum arquivo foi enviado." });
    }
    
    logInfo("POST /converter - Processando upload direto", {
      fileName: req.file.originalname,
      fileSize: `${(req.file.size / 1024).toFixed(2)}KB`,
      mimeType: req.file.mimetype
    });
    
    // Processa o PDF diretamente como buffer
    const pdfBuffer = req.file.buffer;
    
    logInfo("Iniciando extração de texto do PDF");
    // Extrai o texto do PDF
    const data = await pdfParse(pdfBuffer);
    logInfo(`Texto extraído com sucesso. Tipo de conversão: ${req.query.type || "text"}`, {
      textLength: data.text.length
    });
    
    // Verifica o parâmetro `type` na query string
    const responseType = req.query.type || "text"; // Padrão: json
    
    if (responseType === "text") {
      // Retorna o texto puro
      logInfo("Enviando resposta em formato TEXT");
      res.status(200).send(data.text);
    } else if (responseType === "json") {
      // Retorna o texto no formato JSON
      logInfo("Enviando resposta em formato JSON");
      res.status(200).json({ text: data.text });
    } else {
      // Retorna erro se o tipo especificado não for suportado
      logInfo(`Formato de resposta inválido: ${responseType}`);
      res.status(400).json({ error: "Formato de resposta inválido. Use 'text' ou 'json'." });
    }
  } catch (error) {
    logInfo("ERRO ao processar o PDF", { error: error.message, stack: error.stack });
    res.status(500).json({ error: "Falha ao processar o PDF." });
  }
});

// ROTAS PARA UPLOAD EM CHUNKS (mantendo tudo em memória)

// Rota para iniciar um upload
roteador.post("/iniciar-upload", (req, res) => {
  try {
    const fileName = req.body.fileName || "desconhecido.pdf";
    const totalChunks = parseInt(req.body.totalChunks) || 0;
    
    // Cria um ID único baseado no nome do arquivo, IP do cliente e outros dados
    const clientInfo = {
      ip: req.ip || req.connection.remoteAddress,
      clientId: req.body.clientId || req.headers['x-client-id'],
      userAgent: req.headers['user-agent']
    };
    
    const fileId = generateUniqueFileId(fileName, clientInfo);
    
    // Verifica se já existe um upload com este ID (improvável, mas possível)
    if (activeUploads[fileId]) {
      logInfo(`Conflito de ID detectado: ${fileId}`, { fileName });
      // Tenta gerar outro ID 
      const newFileId = generateUniqueFileId(fileName + Math.random(), clientInfo);
      logInfo(`Novo ID gerado: ${newFileId}`);
      fileId = newFileId;
    }
    
    activeUploads[fileId] = {
      chunks: [],
      totalChunks: totalChunks,
      receivedChunks: 0,
      fileName: fileName,
      startTime: Date.now(),
      clientInfo: clientInfo,
      chunkStatus: Array(totalChunks).fill(false), // Array para controlar quais chunks foram recebidos
      // Adicionando um temporizador para limpar uploads abandonados
      timeoutId: setTimeout(() => {
        if (activeUploads[fileId]) {
          logInfo(`Upload ${fileId} expirado e removido da memória após 1 hora de inatividade`, {
            fileName: activeUploads[fileId].fileName,
            progress: `${activeUploads[fileId].receivedChunks}/${activeUploads[fileId].totalChunks}`
          });
          delete activeUploads[fileId];
        }
      }, 60 * 60 * 1000) // 1 hora de timeout
    };
    
    logInfo("Upload iniciado", { 
      fileId,
      fileName,
      totalChunks,
      startTime: new Date().toISOString(),
      clientInfo: {
        ip: clientInfo.ip.replace(/^.*:/, '*****:'), // Mascarando o IP por segurança no log
        userAgent: clientInfo.userAgent
      }
    });
    
    res.status(200).json({ fileId, message: "Upload iniciado" });
  } catch (error) {
    logInfo("ERRO ao iniciar upload", { error: error.message, stack: error.stack });
    res.status(500).json({ error: "Falha ao iniciar o upload." });
  }
});

// Rota para enviar um chunk
roteador.post("/enviar-chunk", uploadChunk.single("chunk"), (req, res) => {
  try {
    if (!req.file) {
      logInfo("Tentativa de envio de chunk sem arquivo");
      return res.status(400).json({ error: "Nenhum chunk enviado" });
    }
    
    const { fileId, chunkIndex } = req.body;
    const chunkIndexNum = parseInt(chunkIndex);
    
    if (!activeUploads[fileId]) {
      logInfo(`Upload não encontrado: ${fileId}`);
      return res.status(404).json({ error: "Upload não encontrado" });
    }
    
    const upload = activeUploads[fileId];
    
    // Verifica se este chunk já foi recebido antes (evita duplicatas)
    if (upload.chunkStatus[chunkIndexNum]) {
      logInfo(`Chunk duplicado recebido [${chunkIndex}]`, { fileId });
      return res.status(200).json({ 
        message: `Chunk ${chunkIndex} já foi recebido anteriormente`,
        progress: `${upload.receivedChunks}/${upload.totalChunks}`,
        progressPercent: (upload.receivedChunks / upload.totalChunks * 100).toFixed(2)
      });
    }
    
    // Atualiza o tempo de inatividade para este upload
    clearTimeout(upload.timeoutId);
    upload.timeoutId = setTimeout(() => {
      if (activeUploads[fileId]) {
        logInfo(`Upload ${fileId} expirado e removido da memória após 1 hora de inatividade`, {
          fileName: upload.fileName,
          progress: `${upload.receivedChunks}/${upload.totalChunks}`
        });
        delete activeUploads[fileId];
      }
    }, 60 * 60 * 1000); // 1 hora de timeout
    
    // Log detalhado do chunk recebido
    logInfo(`Chunk recebido [${chunkIndex}/${upload.totalChunks - 1}]`, {
      fileId,
      fileName: upload.fileName,
      chunkSize: `${(req.file.size / 1024).toFixed(2)}KB`,
      chunkIndex: chunkIndexNum
    });
    
    // Armazena o chunk em memória
    upload.chunks.push({
      buffer: req.file.buffer,
      index: chunkIndexNum
    });
    
    upload.receivedChunks++;
    upload.chunkStatus[chunkIndexNum] = true; // Marca este chunk como recebido
    
    // Calcular estatísticas
    const progress = (upload.receivedChunks / upload.totalChunks * 100).toFixed(2);
    const elapsedMs = Date.now() - upload.startTime;
    const elapsedSec = elapsedMs / 1000;
    const chunksPerSecond = upload.receivedChunks / elapsedSec;
    
    logInfo(`Progresso do upload: ${progress}%`, {
      fileId,
      fileName: upload.fileName,
      received: upload.receivedChunks,
      total: upload.totalChunks,
      tempoDecorrido: `${elapsedSec.toFixed(2)} segundos`,
      velocidade: `${chunksPerSecond.toFixed(2)} chunks/segundo`
    });
    
    res.status(200).json({ 
      message: `Chunk ${chunkIndex} recebido`,
      progress: `${upload.receivedChunks}/${upload.totalChunks}`,
      progressPercent: progress
    });
  } catch (error) {
    logInfo("ERRO ao processar chunk", { error: error.message, stack: error.stack });
    res.status(500).json({ error: "Falha ao processar chunk" });
  }
});

// Rota para finalizar o upload e processar o PDF
roteador.post("/finalizar-upload", async (req, res) => {
  try {
    const { fileId } = req.body;
    
    if (!fileId) {
      logInfo("Tentativa de finalizar upload sem fornecer fileId");
      return res.status(400).json({ error: "fileId não fornecido" });
    }
    
    if (!activeUploads[fileId]) {
      logInfo(`Tentativa de finalizar upload inexistente: ${fileId}`);
      return res.status(404).json({ error: "Upload não encontrado" });
    }
    
    const uploadInfo = activeUploads[fileId];
    
    // Cancela o temporizador de timeout
    clearTimeout(uploadInfo.timeoutId);
    
    logInfo(`Iniciando finalização do upload ${fileId}`, {
      fileName: uploadInfo.fileName,
      chunks: `${uploadInfo.receivedChunks}/${uploadInfo.totalChunks}`
    });
    
    // Verifica se todos os chunks foram recebidos
    if (uploadInfo.receivedChunks !== uploadInfo.totalChunks) {
      logInfo(`Upload incompleto ${fileId}`, { 
        received: uploadInfo.receivedChunks, 
        expected: uploadInfo.totalChunks,
        chunkStatus: uploadInfo.chunkStatus
      });
      
      // Identifica quais chunks estão faltando
      const missingChunks = uploadInfo.chunkStatus
        .map((status, index) => !status ? index : null)
        .filter(index => index !== null);
      
      return res.status(400).json({ 
        error: "Upload incompleto", 
        received: uploadInfo.receivedChunks, 
        expected: uploadInfo.totalChunks,
        missingChunks: missingChunks
      });
    }
    
    // Ordena os chunks pelo índice
    logInfo(`Ordenando ${uploadInfo.chunks.length} chunks...`);
    uploadInfo.chunks.sort((a, b) => a.index - b.index);
    
    // Combina todos os chunks em um único buffer
    const totalLength = uploadInfo.chunks.reduce((acc, chunk) => acc + chunk.buffer.length, 0);
    logInfo(`Combinando chunks em um único buffer (tamanho total: ${(totalLength / (1024 * 1024)).toFixed(2)}MB)...`);
    
    const combinedBuffer = Buffer.concat(
      uploadInfo.chunks.map(chunk => chunk.buffer),
      totalLength
    );
    
    // Estatísticas de memória
    const memoryUsage = process.memoryUsage();
    logInfo(`Uso de memória após combinação de chunks:`, {
      rss: `${(memoryUsage.rss / (1024 * 1024)).toFixed(2)}MB`,
      heapTotal: `${(memoryUsage.heapTotal / (1024 * 1024)).toFixed(2)}MB`,
      heapUsed: `${(memoryUsage.heapUsed / (1024 * 1024)).toFixed(2)}MB`,
      external: `${(memoryUsage.external / (1024 * 1024)).toFixed(2)}MB`
    });
    
    // Cria uma cópia da informação do upload antes de excluí-la
    const uploadSummary = {
      fileName: uploadInfo.fileName,
      fileSize: totalLength,
      startTime: uploadInfo.startTime,
      clientInfo: {
        ip: uploadInfo.clientInfo.ip.replace(/^.*:/, '*****:'), // Mascarando o IP por segurança
        userAgent: uploadInfo.clientInfo.userAgent
      }
    };
    
    // Remove o upload da lista de ativos para liberar memória (antes de processar o PDF)
    delete activeUploads[fileId];
    logInfo(`Upload ${fileId} removido da memória antes do processamento`, {
      fileName: uploadSummary.fileName,
      fileSize: `${(uploadSummary.fileSize / (1024 * 1024)).toFixed(2)}MB`
    });
    
    try {
      // Processa o PDF
      logInfo("Processando PDF completo...");
      const startTime = Date.now();
      const data = await pdfParse(combinedBuffer);
      const processingTime = (Date.now() - startTime) / 1000;
      
      // Tempo total desde o início do upload
      const totalTimeMs = Date.now() - uploadSummary.startTime;
      const totalTimeSec = totalTimeMs / 1000;
      
      logInfo(`Texto extraído com sucesso em ${processingTime.toFixed(2)} segundos`, { 
        fileName: uploadSummary.fileName,
        textLength: data.text.length,
        processTime: `${processingTime.toFixed(2)}s`,
        textSizeKb: `${(data.text.length / 1024).toFixed(2)}KB`,
        tempoTotal: `${totalTimeSec.toFixed(2)} segundos`
      });
      
      // Retorna a resposta conforme o tipo solicitado
      const responseType = req.query.type || "text"; // Padrão: json
      
      if (responseType === "text") {
        // Retorna o texto puro
        logInfo("Enviando resposta em formato TEXT");
        res.status(200).send(data.text);
      } else if (responseType === "json") {
        // Retorna o texto no formato JSON
        logInfo("Enviando resposta em formato JSON");
        res.status(200).json({ 
          text: data.text,
          metadados: {
            fileName: uploadSummary.fileName,
            tempoTotalProcessamento: `${totalTimeSec.toFixed(2)} segundos`,
            tamanhoArquivo: `${(uploadSummary.fileSize / (1024 * 1024)).toFixed(2)}MB`,
            tamanhoTexto: `${(data.text.length / 1024).toFixed(2)}KB`
          }
        });
      } else {
        // Retorna erro se o tipo especificado não for suportado
        logInfo(`Formato de resposta inválido: ${responseType}`);
        res.status(400).json({ error: "Formato de resposta inválido. Use 'text' ou 'json'." });
      }
    } catch (pdfError) {
      logInfo("ERRO ao processar o PDF após combinação de chunks", { 
        error: pdfError.message, 
        stack: pdfError.stack,
        fileName: uploadSummary.fileName 
      });
      res.status(500).json({ error: "Falha ao processar o PDF após combinação dos chunks." });
    }
  } catch (error) {
    logInfo("ERRO ao finalizar upload", { error: error.message, stack: error.stack });
    
    // Tenta limpar da memória em caso de erro
    if (req.body.fileId && activeUploads[req.body.fileId]) {
      clearTimeout(activeUploads[req.body.fileId].timeoutId);
      delete activeUploads[req.body.fileId];
      logInfo(`Upload ${req.body.fileId} removido da memória após erro`);
    }
    
    res.status(500).json({ error: "Falha ao finalizar o upload." });
  }
});

// Rota para verificar o status de um upload específico
roteador.get("/status-upload/:fileId", (req, res) => {
  const { fileId } = req.params;
  
  if (!activeUploads[fileId]) {
    return res.status(404).json({ error: "Upload não encontrado" });
  }
  
  const upload = activeUploads[fileId];
  const elapsedMs = Date.now() - upload.startTime;
  const progress = (upload.receivedChunks / upload.totalChunks * 100).toFixed(2);
  
  res.status(200).json({
    fileId,
    fileName: upload.fileName,
    progress: `${progress}%`,
    receivedChunks: upload.receivedChunks,
    totalChunks: upload.totalChunks,
    elapsedTime: `${(elapsedMs / 1000).toFixed(2)} segundos`,
    status: upload.receivedChunks === upload.totalChunks ? "Completo" : "Em andamento"
  });
});

// Rota para visualizar status de todos os uploads ativos (útil para debug)
roteador.get("/status-uploads", (req, res) => {
  const uploadsStatus = Object.keys(activeUploads).map(fileId => {
    const upload = activeUploads[fileId];
    return {
      fileId,
      fileName: upload.fileName,
      progressPercent: (upload.receivedChunks / upload.totalChunks * 100).toFixed(2) + '%',
      receivedChunks: upload.receivedChunks,
      totalChunks: upload.totalChunks,
      startTime: new Date(upload.startTime).toISOString(),
      elapsedSeconds: ((Date.now() - upload.startTime) / 1000).toFixed(2),
      clientIp: upload.clientInfo?.ip?.replace(/^.*:/, '*****:') || 'desconhecido'
    };
  });
  
  logInfo("Solicitação de status de uploads", { totalAtivos: uploadsStatus.length });
  res.status(200).json(uploadsStatus);
});

// Rota para cancelar um upload em andamento
roteador.delete("/cancelar-upload/:fileId", (req, res) => {
  const { fileId } = req.params;
  
  if (!activeUploads[fileId]) {
    return res.status(404).json({ error: "Upload não encontrado" });
  }
  
  const uploadInfo = activeUploads[fileId];
  clearTimeout(uploadInfo.timeoutId);
  
  logInfo(`Upload ${fileId} cancelado manualmente`, {
    fileName: uploadInfo.fileName,
    progress: `${uploadInfo.receivedChunks}/${uploadInfo.totalChunks}`
  });
  
  delete activeUploads[fileId];
  res.status(200).json({ message: "Upload cancelado com sucesso" });
});

// Middleware para limpeza periódica de uploads abandonados
// Executado uma vez a cada 15 minutos
setInterval(() => {
  const now = Date.now();
  const inactiveThreshold = 30 * 60 * 1000; // 30 minutos
  let removedCount = 0;
  
  Object.keys(activeUploads).forEach(fileId => {
    const upload = activeUploads[fileId];
    const inactiveTime = now - upload.startTime;
    
    // Se o upload estiver inativo por mais de 30 minutos e não estiver completo
    if (inactiveTime > inactiveThreshold && upload.receivedChunks < upload.totalChunks) {
      clearTimeout(upload.timeoutId);
      delete activeUploads[fileId];
      removedCount++;
      
      logInfo(`Upload abandonado removido durante limpeza periódica: ${fileId}`, {
        fileName: upload.fileName,
        inativoPor: `${(inactiveTime / (60 * 1000)).toFixed(2)} minutos`,
        progresso: `${upload.receivedChunks}/${upload.totalChunks}`
      });
    }
  });
  
  if (removedCount > 0) {
    logInfo(`Limpeza periódica concluída: ${removedCount} uploads abandonados removidos`);
  }
}, 15 * 60 * 1000); // 15 minutos

// Middleware para mostrar informações da requisição
roteador.use((req, res, next) => {
  logInfo(`${req.method} ${req.url}`, {
    contentType: req.headers['content-type'],
    contentLength: req.headers['content-length'] ? 
      `${(parseInt(req.headers['content-length']) / 1024).toFixed(2)}KB` : 'N/A'
  });
  next();
});

module.exports = roteador;
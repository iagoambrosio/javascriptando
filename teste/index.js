const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

/**
 * Upload de arquivo diretamente (para arquivos menores)
 * Equivalente a: curl -X POST -F "file=@teste.pdf" https://gerar-cadastro.vercel.app/util/converter
 */
async function uploadDirectPdf(filePath, apiUrl) {
  try {
    // Cria um form data
    const formData = new FormData();
    
    // Adiciona o arquivo ao form data
    formData.append('file', fs.createReadStream(filePath));
    
    console.log(`Enviando arquivo: ${filePath}`);
    
    // Envia a requisição
    const response = await axios.post(apiUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      // Aumenta o timeout para arquivos maiores
      timeout: 30000,
    });
    
    console.log('Upload concluído com sucesso!');
    console.log('Resposta:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar arquivo:', error.message);
    
    // Se o erro for relacionado ao tamanho do arquivo, sugerir a abordagem em chunks
    if (error.code === 'ECONNRESET' || (error.response && error.response.status === 413)) {
      console.log('O arquivo parece ser muito grande. Tente usar uploadLargePdf() para envio em chunks.');
    }
    
    throw error;
  }
}

/**
 * Upload de arquivo grande em chunks
 */
async function uploadLargePdf(filePath, apiBaseUrl) {
  try {
    const fileName = path.basename(filePath);
    const fileStats = fs.statSync(filePath);
    const fileSize = fileStats.size;
    
    // Tamanho de cada chunk (2MB)
    const chunkSize = 3 * 1024 * 1024;
    const totalChunks = Math.ceil(fileSize / chunkSize);
    
    console.log(`Arquivo: ${fileName}, Tamanho: ${(fileSize / (1024 * 1024)).toFixed(2)}MB`);
    console.log(`Iniciando upload em ${totalChunks} chunks...`);
    
    // Iniciar o processo de upload
    const initResponse = await axios.post(`${apiBaseUrl}/iniciar-upload`, {
      fileName: fileName,
      totalChunks: totalChunks
    });
    
    const { fileId } = initResponse.data;
    console.log(`Upload iniciado, ID: ${fileId}`);
    
    // Abre o arquivo para leitura
    const fileHandle = fs.openSync(filePath, 'r');
    
    // Envia cada chunk
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, fileSize);
      const chunkLength = end - start;
      
      // Lê o chunk do arquivo
      const buffer = Buffer.alloc(chunkLength);
      fs.readSync(fileHandle, buffer, 0, chunkLength, start);
      
      // Cria form data para o chunk
      const formData = new FormData();
      formData.append('chunk', buffer, { filename: `${fileName}.part${i}` });
      formData.append('fileId', fileId);
      formData.append('chunkIndex', i);
      
      // Envia o chunk
      const chunkResponse = await axios.post(`${apiBaseUrl}/enviar-chunk`, formData, {
        headers: {
          ...formData.getHeaders()
        }
      });
      
      // Atualiza o progresso
      const progress = Math.round((i + 1) / totalChunks * 100);
      console.log(`Progresso: ${progress}%`);
    }
    
    // Fecha o arquivo
    fs.closeSync(fileHandle);
    
    // Finaliza o upload
    console.log('Finalizando upload...');
    const finalizeResponse = await axios.post(`${apiBaseUrl}/finalizar-upload`, {
      fileId: fileId
    });
    
    console.log('Upload completo! Texto extraído com sucesso.');
    console.log('Resposta:', finalizeResponse.data);
    
    return finalizeResponse.data;
  } catch (error) {
    console.error('Erro durante upload:', error.message);
    throw error;
  }
}

/**
 * Função inteligente que escolhe o método adequado com base no tamanho do arquivo
 */
async function uploadPdf(filePath, apiBaseUrl = 'https://gerar-cadastro.vercel.app/util') {
  try {
    // Verifica se o arquivo existe
    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo não encontrado: ${filePath}`);
    }
    
    // Obtém o tamanho do arquivo
    const stats = fs.statSync(filePath);
    
    // Se o arquivo for menor que 5MB, usa o método direto
    if (stats.size <= 4 * 1024 * 1024) {
      console.log('Arquivo pequeno, usando upload direto');
      return await uploadDirectPdf(filePath, `${apiBaseUrl}/converter`);
    } else {
      console.log('Arquivo grande, usando upload em chunks');
      return await uploadLargePdf(filePath, apiBaseUrl);
    }
  } catch (error) {
    console.error('Erro ao processar o arquivo:', error.message);
    throw error;
  }
}

// Função principal para executar o upload
async function main() {
  // Pega o caminho do arquivo da linha de comando ou usa o padrão
  const filePath = process.argv[2] || './teste2.pdf';
  
  // Pega a URL da API da linha de comando ou usa o padrão
  const apiUrl = process.argv[3] || 'https://gerar-cadastro.vercel.app/util';
  
  try {
    await uploadPdf(filePath, apiUrl);
  } catch (error) {
    console.error('Falha no upload:', error.message);
    process.exit(1);
  }
}

// Executa a função principal
main();
const roteador = require("express").Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const upload = multer(); // Configuração sem salvar arquivo em disco

// Rota GET para verificar se a API está funcionando
roteador.get("/", (req, res) => {
  res.status(200).json({ message: "API de conversão de PDF está funcionando!" });
});

// Rota POST para receber e processar o PDF
roteador.post("/converter", upload.single("file"), async (req, res) => {
  try {
    // Verifica se um arquivo foi enviado
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo foi enviado." });
    }

    console.log("Acessando a API de conversão...");
    // Processa o PDF diretamente como buffer
    const pdfBuffer = req.file.buffer;

    // Extrai o texto do PDF
    const data = await pdfParse(pdfBuffer);
    console.log('Texto extraído com sucesso. Tipo de conversão: '+ req.query.type +'');

    // Verifica o parâmetro `type` na query string
    const responseType = req.query.type || "text"; // Padrão: json

    if (responseType === "text") {
      // Retorna o texto puro
      res.status(200).send(data.text);
    } else if (responseType === "json") {
      // Retorna o texto no formato JSON
      res.status(200).json({ text: data.text });
    } else {
      // Retorna erro se o tipo especificado não for suportado
      res.status(400).json({ error: "Formato de resposta inválido. Use 'text' ou 'json'." });
    }
  } catch (error) {
    console.error("Erro ao processar o PDF:", error);
    res.status(500).json({ error: "Falha ao processar o PDF." });
  }
});

module.exports = roteador;

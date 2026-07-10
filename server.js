const express = require('express');

const app = express();
const port = 5500;

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Servidor rodando em http://127.0.0.1:${port}`);
});


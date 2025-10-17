const express = require('express');
const app = express();
const PORT = 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', './views'); // Diz ao Express onde buscar os arquivos .ejs

// Configuração mínima (para receber dados de formulário)
app.use(express.urlencoded({ extended: true }));

// Rota inicial - será o login
app.get('/', (req, res) => {
    res.send('<h1>Tela de Login</h1><p>Esta é a rota raiz, em breve a página real de Login.</p>');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
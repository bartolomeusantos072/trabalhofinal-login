const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public')); // <--- ADICIONE ESTA LINHA AQUI
// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', './views'); // Diz ao Express onde buscar os arquivos .ejs

// Configuração para receber dados de formulário (Requisito de Interação)
app.use(express.urlencoded({ extended: true }));

// Importa o mock de API (Requisito 4)
const mockDb = require('./data/users');

// ------------------------------------------------------------------
// ROTAS E LÓGICA
// ------------------------------------------------------------------

// Rota GET para a Tela de Login (Rota principal)
app.get('/', (req, res) => {
    // Passa o parâmetro 'error' para a view, se existir (usado no login.ejs)
    const error = req.query.error;
    const success = req.query.success;

    res.render('login', { error, success });
});

// Rota POST para processar o Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = mockDb.findByEmail(email);

    // Lógica SIMPLES de validação
    if (user && user.password === password) {
        // Sucesso: MOCK da Home Page
        return res.send(`<h1>Bem-vindo, ${user.email}!</h1><p>Autenticação MOCKADA com sucesso. <a href="/">Fazer Logout</a></p>`);
    } else {
        // Falha: Redireciona para login com erro
        return res.redirect('/?error=1');
    }
});

// Rota GET para a Tela de Cadastro
app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

// Rota POST para processar o Cadastro
app.post('/cadastro', (req, res) => {
    const { email, password } = req.body;
    
    // Simula a verificação se o usuário já existe
    if (mockDb.findByEmail(email)) {
        // MOCK de erro (em um projeto real, você retornaria um erro 400 ou renderizaria com mensagem)
        return res.send(`<h1>Erro no Cadastro</h1><p>O e-mail ${email} já está cadastrado. <a href="/cadastro">Tentar novamente</a></p>`);
    }

    // Simula o salvamento no mock de dados
    mockDb.addUser(email, password);
    
    // Sucesso: Redireciona para o login
    return res.redirect('/?success=1'); 
});

// Rota GET para a Tela de Esqueceu a Senha
app.get('/esqueci-senha', (req, res) => {
    res.render('esqueci-senha');
});

// Rota POST para processar o Esqueceu a Senha
app.post('/esqueci-senha', (req, res) => {
    const { email } = req.body;
    
    // Simula o processo de envio de e-mail (mockado)
    console.log(`[MOCK] E-mail de recuperação simulado enviado para: ${email}`);
    
    // Sucesso
    return res.render('esqueci-senha', { message: `As instruções de recuperação foram enviadas para ${email} (simulado).` });
});


// ------------------------------------------------------------------
// INICIALIZAÇÃO
// ------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
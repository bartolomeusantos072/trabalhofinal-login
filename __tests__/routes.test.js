const request = require('supertest');
// Nota: Você pode precisar ajustar o require para apontar para o seu server.js
const app = require('../server'); // Assume que seu server.js exporta o 'app'

// Garanta que você exporta o 'app' no final do seu server.js
// Mude a última linha do server.js para: module.exports = app;

describe('Testes de Aceitação e Integração das Rotas', () => {

    // Teste de Aceitação (Rota GET)
    test('GET / deve retornar a tela de login (status 200)', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('<h1>Login</h1>'); // Verifica se o HTML está correto
    });

    // Teste de Aceitação (Login com Sucesso)
    test('POST /login com credenciais válidas deve autenticar (MOCK)', async () => {
        const response = await request(app)
            .post('/login')
            .send({ email: 'admin@ifmg.edu.br', password: '123' });

        // Verifica a página de sucesso mockada
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Bem-vindo, admin@ifmg.edu.br!');
    });

    // Teste de Aceitação (Login com Falha)
    test('POST /login com credenciais inválidas deve redirecionar (status 302)', async () => {
        const response = await request(app)
            .post('/login')
            .send({ email: 'admin@ifmg.edu.br', password: 'senhaerrada' });

        // Deve redirecionar para a rota raiz com o parâmetro de erro
        expect(response.statusCode).toBe(302);
        expect(response.header.location).toBe('/?error=1');
    });

    // Teste de Integração (Cadastro)
    test('POST /cadastro deve adicionar novo usuário e redirecionar', async () => {
        const newEmail = 'teste_integracao@ifmg.edu.br';
        const response = await request(app)
            .post('/cadastro')
            .send({ email: newEmail, password: '999', confirm_password: '999' });

        // Redirecionamento de sucesso
        expect(response.statusCode).toBe(302); 
        expect(response.header.location).toBe('/?success=1');
    });

    // Teste para rota Esqueceu a Senha
     test('POST /esqueci-senha deve simular o envio e retornar 200', async () => {
        const response = await request(app)
            .post('/esqueci-senha')
            .send({ email: 'algum@email.com' });

        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('As instruções de recuperação foram enviadas');
    });
});
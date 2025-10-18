// auth.test.js

const request = require('supertest');
const app = require('../server'); // Importa o app.js para testar as rotas
const mockDb = require('../data/users');

// Certifica-se de que o mockDb está limpo antes de cada teste de integração
beforeEach(() => {
    mockDb.resetUsers(); 
});


// auth.test.js (Continuando o arquivo)

describe('Testes da Rota de Login: GET / e POST /login', () => {

    // Teste de Integração (GET /)
    test('GET / deve renderizar a tela de login corretamente (200)', async () => {
        const response = await request(app).get('/');
        
        expect(response.statusCode).toBe(200);
        // CORREÇÃO: A tela inicial deve conter o título "Login", não "Bem-vindo"
        expect(response.text).toContain('<h1>Login</h1>'); 
    });

    // Teste de Aceitação (POST /login - Sucesso)
    test('POST /login com credenciais corretas deve retornar sucesso (200)', async () => {
        const response = await request(app)
            .post('/login')
            .type('form') // CORREÇÃO: Garante que os dados sejam enviados como urlencoded
            .send({ 
                email: 'admin@ifmg.edu.br', 
                password: '123' 
            });

        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Bem-vindo, admin@ifmg.edu.br!');
    });

    // Teste de Aceitação (POST /login - Falha de Senha)
    test('POST /login com senha incorreta deve redirecionar com erro (302)', async () => {
        const response = await request(app)
            .post('/login')
            .type('form') // CORREÇÃO
            .send({ 
                email: 'admin@ifmg.edu.br', 
                password: '999' 
            });

        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/?error=1');
    });

    // Teste de Aceitação (POST /login - Falha de Usuário Inexistente)
    test('POST /login com email inexistente deve redirecionar com erro (302)', async () => {
        const response = await request(app)
            .post('/login')
            .type('form') // CORREÇÃO
            .send({ 
                email: 'naoexiste@ifmg.edu.br', 
                password: '123' 
            });

        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/?error=1');
    });
});

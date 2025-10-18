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

// ===================================================================
// ROTAS DE CADASTRO
// ===================================================================

describe('Testes da Rota de Cadastro: GET /cadastro e POST /cadastro', () => {
    
    // Teste de Integração (GET /cadastro)
    test('GET /cadastro deve renderizar a tela de cadastro (200)', async () => {
        const response = await request(app).get('/cadastro');
        
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('<h1>Cadastro de Novo Usuário</h1>'); 
        expect(response.text).toContain('/cadastro');
    });

    // Teste de Aceitação (POST /cadastro - Sucesso)
    test('POST /cadastro deve criar um novo usuário e redirecionar para /?success=1 (302)', async () => {
        const newEmail = 'novo@teste.com';
        const initialCount = mockDb.getAllUsers().length;

        const response = await request(app)
            .post('/cadastro')
            .type('form') // Importante para enviar dados de formulário
            .send({ 
                email: newEmail, 
                password: 'novasenha' 
            });

        // 1. Verifica Redirecionamento de Sucesso
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/?success=1');
        
        // 2. Verificação Unitária no MockDb
        expect(mockDb.getAllUsers().length).toBe(initialCount + 1);
        expect(mockDb.findByEmail(newEmail)).toBeDefined();
    });

    // Teste de Aceitação (POST /cadastro - Falha por Duplicidade)
    test('POST /cadastro com email existente deve retornar a página de erro (200)', async () => {
        // Tenta cadastrar um usuário que já existe no mockDb inicial
        const initialEmail = 'admin@ifmg.edu.br';
        const initialCount = mockDb.getAllUsers().length;

        const response = await request(app)
            .post('/cadastro')
            .type('form') // Importante para enviar dados de formulário
            .send({ 
                email: initialEmail, 
                password: 'qualquer_senha' 
            });

        // 1. Verifica Status Code (O server.js faz um res.send(), que retorna 200 por padrão)
        expect(response.statusCode).toBe(200); 
        // 2. Verifica Mensagem de Erro
        expect(response.text).toContain('Erro no Cadastro');
        expect(response.text).toContain(`O e-mail ${initialEmail} já está cadastrado.`);
        
        // 3. Verificação Unitária (Garante que o DB não foi alterado)
        expect(mockDb.getAllUsers().length).toBe(initialCount);
    });
});

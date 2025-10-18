const mockDb = require('../data/users');

describe('Testes Unitários do Mock de API (mockDb)', () => {
    
    // Configuração para garantir que cada teste comece com os dados iniciais.
    // Isso é CRUCIAL para testes de mocks mutáveis como este.
    beforeEach(() => {
        mockDb.resetUsers();
    });

    // 1. Testes para a função findByEmail
    describe('Testes de findByEmail', () => {
        test('Deve encontrar um usuário existente pelo email e verificar sua senha', () => {
            const user = mockDb.findByEmail('admin@ifmg.edu.br');
            // Garante que o usuário foi encontrado
            expect(user).toBeDefined(); 
            // Garante que os dados do usuário estão corretos
            expect(user.password).toBe('123');
            expect(user.id).toBe(1);
        });

        test('Não deve encontrar um usuário inexistente', () => {
            const user = mockDb.findByEmail('inexistente@ifmg.edu.br');
            // Garante que o retorno é undefined ou null
            expect(user).toBeUndefined();
        });
    });

    // 2. Testes para a função addUser
    describe('Testes de addUser', () => {
        test('Deve adicionar um novo usuário, retornar o objeto e torná-lo encontrável', () => {
            const initialCount = mockDb.getAllUsers().length;
            const newEmail = 'teste@novo.com';
            const newPassword = 'senha123';

            // Adiciona o usuário
            const newUser = mockDb.addUser(newEmail, newPassword);

            // Verifica se o objeto retornado está correto
            expect(newUser.email).toBe(newEmail);
            // Verifica se um novo ID foi atribuído (o próximo é 3)
            expect(newUser.id).toBe(3); 
            
            // Verifica se o usuário foi realmente adicionado (tamanho do array)
            expect(mockDb.getAllUsers().length).toBe(initialCount + 1);

            // Verifica se o novo usuário pode ser encontrado pelo findByEmail
            const foundUser = mockDb.findByEmail(newEmail);
            expect(foundUser).toBeDefined();
            expect(foundUser.password).toBe(newPassword);
        });
    });

    // 3. Teste para a função getAllUsers e resetUsers
    describe('Testes de Utilidade (Reset/Get)', () => {
        test('Deve retornar a lista inicial de usuários', () => {
            const users = mockDb.getAllUsers();
            expect(users.length).toBe(2);
            expect(users[0].email).toBe('admin@ifmg.edu.br');
        });

        test('Deve resetar o banco de dados para o estado inicial', () => {
            // Adiciona um usuário temporário
            mockDb.addUser('temp@user.com', '123');
            expect(mockDb.getAllUsers().length).toBe(3); // 3 usuários agora

            // Reseta o DB
            mockDb.resetUsers(); 

            // Verifica se voltou ao estado inicial
            expect(mockDb.getAllUsers().length).toBe(2);
            expect(mockDb.findByEmail('temp@user.com')).toBeUndefined();
        });
    });
});
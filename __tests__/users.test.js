const mockDb = require('../data/users');

describe('Testes Unitários do Mock de API (mockDb)', () => {

    // 1. Teste para a função findByEmail
    test('Deve encontrar um usuário existente pelo email', () => {
        const user = mockDb.findByEmail('admin@ifmg.edu.br');
        expect(user).toBeDefined();
        expect(user.password).toBe('123');
    });

    test('Não deve encontrar um usuário inexistente', () => {
        const user = mockDb.findByEmail('inexistente@ifmg.edu.br');
        expect(user).toBeUndefined();
    });

    // 2. Teste para a função addUser
    test('Deve adicionar um novo usuário e ser encontrável', () => {
        const newEmail = 'teste@novo.com';
        const newPassword = 'senha';

        // Adiciona o usuário
        const newUser = mockDb.addUser(newEmail, newPassword);

        // Verifica se a função retorna o objeto corretamente
        expect(newUser.email).toBe(newEmail);

        // Verifica se o usuário foi realmente adicionado ao mockDb
        const foundUser = mockDb.findByEmail(newEmail);
        expect(foundUser).toBeDefined();
        expect(foundUser.password).toBe(newPassword);
    });
});
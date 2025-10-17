// Simula o banco de dados
let users = [
    { id: 1, email: 'admin@ifmg.edu.br', password: '123' },
    { id: 2, email: 'aluno@ifmg.edu.br', password: '456' }
];

// Variável para simular a criação de novos IDs
let nextId = 3;

// Funções que o "back-end" usará para interagir com esses dados
const mockDb = {
    // Encontrar usuário pelo e-mail
    findByEmail: (email) => users.find(u => u.email === email),

    // Adicionar novo usuário (para o Cadastro)
    addUser: (email, password) => {
        const newUser = { id: nextId++, email, password };
        users.push(newUser);
        return newUser;
    }
};

module.exports = mockDb;
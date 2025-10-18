// Dados iniciais (a fonte de verdade)

const initialUsers = [

{ id: 1, email: 'admin@ifmg.edu.br', password: '123' },

{ id: 2, email: 'aluno@ifmg.edu.br', password: '456' }

];



// Estado mutável do banco de dados MOCK

let users = [...initialUsers];

let nextId = 3;



const mockDb = {

// Encontrar usuário pelo e-mail

findByEmail: (email) => users.find(u => u.email === email),



// Adicionar novo usuário (para o Cadastro)

addUser: (email, password) => {

const newUser = { id: nextId++, email, password };

users.push(newUser);

return newUser;

},



// FUNÇÃO CRÍTICA PARA TESTES: Reseta o estado do MockDb antes de cada teste

resetUsers: () => {

users = [...initialUsers];

nextId = 3;

},


// Funcao para testes unitarios usarem

getAllUsers: () => [...users]

};



module.exports = mockDb;
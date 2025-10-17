# [NOME DO PROJETO - Ex: Sistema de Autenticação Simples em Node.js]

## Objetivo

Este projeto foi desenvolvido como trabalho final da disciplina [Nome da Disciplina] e tem como objetivo aplicar conceitos de desenvolvimento web, testes automatizados e controle de versão (Git/GitHub) em uma aplicação web simples usando Node.js.

---

## 💻 Descrição da Aplicação

Esta aplicação simula um sistema básico de **autenticação** com três telas principais de interação:

1.  **Login:** Permite ao usuário tentar autenticar-se.
2.  **Cadastro:** Permite ao usuário criar uma nova conta (os dados são armazenados em um *mock* de API).
3.  **Esqueceu a Senha:** Simula o processo de recuperação de senha.

### Requisito 4: Mock de API

A aplicação **"mocka"** a comunicação com uma API de autenticação. Os dados dos usuários (usuário e senha) são armazenados localmente em um *array* (simulando um banco de dados temporário), e toda a lógica de validação é feita contra essa estrutura de dados, **sem integração com API externa real**.

---

## ⚙️ Instruções para Instalação

Para rodar este projeto localmente, siga os passos abaixo:

1.  **Clone o Repositório:**
    ```bash
    git clone [LINK DO SEU REPOSITÓRIO NO GITHUB]
    cd [pasta do projeto]
    ```
2.  **Instale as Dependências:**
    ```bash
    npm install
    ```

---

## ▶️ Instruções para Execução de Comandos

O projeto pode ser executado e testado usando os seguintes comandos:

### Iniciar o Servidor Web

```bash
npm start
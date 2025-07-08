# ❄️ FrostSys – Sistema de Gestão para Sorveterias - Backend
![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql2-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/jwt-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/bcryptjs-E2B714?style=for-the-badge&logo=veracrypt&logoColor=black)
![Dotenv](https://img.shields.io/badge/dotenv-8DD6F9?style=for-the-badge&logo=dotenv&logoColor=black)
![Nodemailer](https://img.shields.io/badge/nodemailer-EA4335?style=for-the-badge&logo=gmail&logoColor=white)
![CORS](https://img.shields.io/badge/cors-4B8BBE?style=for-the-badge&logo=fastapi&logoColor=white)
![Render](https://img.shields.io/badge/render-000000?style=for-the-badge&logo=render&logoColor=white)
![Railway](https://img.shields.io/badge/railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)

<p >
  API RESTful para gerenciamento de sorveteria com autenticação JWT, CRUD completo, controle de vendas, caixa e mais.
</p>

---

## 📦 Sobre o Projeto

Este repositório representa o backend da aplicação **FrostSys**, um sistema para sorveterias. A API foi construída em Node.js com banco de dados em nuvem (Railway) e está hospedada na plataforma Render.

---

## 🚀 Funcionalidades da API

- ✅ Autenticação com **JWT**
- ✅ Recuperação de senha com envio de código por **e-mail**
- ✅ CRUD de:
  - Usuários
  - Clientes
  - Fornecedores
  - Produtos
  - Vendas (balcão e clientes)
  - Saída de caixa
  - Saída por vendedor
- ✅ Dashboard com totais do mês (vendas brutas, líquidas, saídas)
- ✅ Middleware de autenticação para proteger rotas privadas

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **MySQL2 (Promise)**
- **JWT (jsonwebtoken)**
- **BcryptJS**
- **Dotenv**
- **Nodemailer**
- **CORS**
- **Render (deploy)**
- **Railway (banco de dados em nuvem)**

---

## 🔐 Autenticação

- Utiliza token JWT com tempo de expiração de 8h
- Middleware que protege rotas privadas

---

## 📁 Estrutura do Projeto
```bash

```
## 🔧 Variáveis de Ambiente (.env)

```env
PORT=SUA_PORT
DB_USER=SEU_USER
DB_PASSWORD=SUA_SENHA
DB_SERVER=SEU_SERVER
DB_DATABASE=SEU_DATABASE
SECRET_KEY=sua_chave_jwt
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_email
EMAIL_HOST=SEU_EMAIL_HOST
EMAIL_PORT=SEU_EMAIL_PORT
```
---

## 🌐 Endpoints Principais
| Método | Rota                       | Descrição                    |
| ------ | -------------------------- | ---------------------------- |
| POST   | `/login`                   | Login do usuário             |
| GET    | `/usuario`                 | Retorna nome do usuário      |
| POST   | `/usuario/esqueci-senha`   | Envia código por e-mail      |
| POST   | `/usuario/redefinir-senha` | Redefine senha usando código |

## 📩 Contato

Caso tenha dúvidas ou sugestões, entre em contato:

- **E-mail**: [gabrielmoraiss755@gmail.com](mailto:gabrielmoraiss755@gmail.com)
- **LinkedIn**: [Gabriel Morais](https://www.linkedin.com/in/gabriel-morais-649016295/)
- **GitHub**: [gabriellmrs](https://github.com/gabriellmrs)


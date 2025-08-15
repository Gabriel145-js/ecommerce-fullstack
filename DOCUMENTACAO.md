# 📚 Documentação do E-commerce

## 🎯 O que é este projeto?

Um e-commerce (loja online) completo sendo desenvolvido do zero com tecnologias modernas.

**Funcionalidades planejadas:**
- Catálogo de produtos
- Carrinho de compras
- Sistema de pedidos
- Painel administrativo
- Produtos favoritos
- Adição e edição de produtos e categorias
- Filtros por tag

## 🛠️ Tecnologias utilizadas

- **Frontend**: React + Vite + Sass
- **Backend**: Node.js + Express
- **Banco de dados**: PostgreSQL (Neon)
- **Deploy**: Netlify

## 🏗️ Como funciona

```
Site React ↔ API Node.js ↔ Banco PostgreSQL
```

1. **Site (React)**: Interface que o usuário vê
2. **API (Node.js)**: Processa as requisições e regras de negócio
3. **Banco (PostgreSQL)**: Armazena produtos, usuários, pedidos



## 🗄️ Banco de dados

O arquivo [database](/database_schema.sql) contém os comandos SQL para criação das tabelas utilizadas no projeto. Ele pode ser usado para restaurar ou replicar o banco em outro ambiente.


## 🚀 Progresso do projeto

### ✅ Implementado
- Servidor Express configurado (porta 5000 + URL pública)
- Middleware CORS habilitado
- Parser JSON configurado
- Conexão com PostgreSQL (Neon) funcionando
- Estrutura base de rotas no backend
- App React 19 inicializado com Vite
- Sass/SCSS configurado
- Hot reload ativo
- Build otimizado configurado
- Adição de produtos no dashboard admin
- Exibição inicial de produtos no Home
- Tabelas `produtos` e `categorias` criadas
- Schema SQL documentado no arquivo [database](./database_schema.sql)

### 🚧 Em desenvolvimento
- Exibição completa dos produtos vindos do DB
- CRUD de categorias e produtos
- Sistema de usuários
- Carrinho de compras
- Processamento de pedidos
- Painel administrativo completo
- Filtros e pesquisa de produtos


## 🔧 Scripts disponíveis

### Backend
```bash
npm run dev    # Desenvolvimento (com auto-reload)
npm start      # Produção
```

### Frontend
```bash
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
```

## 🌐 URLs do projeto

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **Banco**: Neon Cloud (PostgreSQL)

## 📖 Arquivos importantes

- `backend/index.js`: Servidor principal
- `backend/db/db.js`: Conexão com banco
- `frontend/src/App.jsx`: Componente principal
- `database_schema.sql`: Estrutura do banco
- `.env`: Variáveis de ambiente (não versionado)
- `.env.local` : Variavel de ambiente local, utilizado no desenvolvimento
- `.env.production` : Variavel de ambiente de produção, utilizado em produção

## 💡 Observações

- Projeto em desenvolvimento ativo
- Estrutura preparada para crescer
- Código limpo e bem organizado
- Documentação atualizada regularmente


## 📁 Estrutura do projeto

```
ecommerce-fullstack/
├── 📁backend
│   ├── 📁db
│   │   └── db.js
│   ├── 📁routes
│   │   ├── categorias.js
│   │   ├── imagens.js
│   │   └── produtos.js
│   ├── 📁scripts
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
├── 📁frontend
│   ├── 📁public
│   ├── 📁src
│   │   ├── 📁assets
│   │   │   └── 📁icons
│   │   │       ├── addProdutoIcon.svg
│   │   │       ├── adminIcon.svg
│   │   │       ├── fecharIcon.svg
│   │   │       ├── lupaIcon.svg
│   │   │       ├── menuHamburguerIcon.svg
│   │   │       └── uploadIcon.svg
│   │   ├── 📁components
│   │   │   ├── 📁Admin
│   │   │   │   └── 📁AddProduto
│   │   │   │       ├── 📁Categorias
│   │   │   │       │   └── SelecionaCategoria.jsx
│   │   │   │       ├── 📁ImagensProdutos
│   │   │   │       │   ├── ImagensProdutos.module.scss
│   │   │   │       │   └── ImagensProodutos.jsx
│   │   │   │       ├── AddProduto.jsx
│   │   │   │       └── AddProduto.module.scss
│   │   │   ├── 📁Navigation
│   │   │   │   ├── Navigation.jsx
│   │   │   │   └── Navigation.module.scss
│   │   │   └── 📁Produtos
│   │   │       ├── ProdutosList.jsx
│   │   │       └── ProdutosList.module.scss
│   │   ├── 📁pages
│   │   │   ├── 📁Admin
│   │   │   │   ├── DashboardAdmin.jsx
│   │   │   │   └── DashboardAdmin.module.scss
│   │   │   └── 📁index
│   │   │       ├── IndexPage.jsx
│   │   │       └── IndexPage.module.scss
│   │   ├── 📁styles
│   │   │   ├── animation.scss
│   │   │   └── variables.scss
│   │   ├── App.jsx
│   │   ├── index.scss
│   │   └── main.jsx
│   ├── .env.example
│   ├── .env.local
│   ├── .env.production
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
├── database_schema.sql
├── DOCUMENTACAO.md
├── netlify.toml
├── package.json
├── README.md   
```
---

**Projeto E-commerce Fullstack**
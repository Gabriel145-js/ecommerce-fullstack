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
- Carrinho de Compras
- CRUD de categorias e produtos
- Schema SQL documentado no arquivo [database](./database_schema.sql)

### 🚧 Em desenvolvimento
- Exibição completa dos produtos vindos do DB
- Sistema de usuários
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
- **Imagens**: Cloudinary

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

Este projeto é dividido em duas partes principais: **backend** (servidor) e **frontend** (cliente). Abaixo está a descrição detalhada de cada diretório e arquivo relevante. E um esqueleto da estrutura de pastas.

---

## 📁 Raiz do Projeto

- **`backend/`**: Código do servidor (Node.js + Express).
- **`frontend/`**: Código da aplicação cliente (React + Vite).
- **`database_schema.sql`**: Script SQL com a estrutura inicial do banco de dados.
- **`DOCUMENTACAO.md`**: Documentação completa do projeto.
- **`netlify.toml`**: Configuração para deploy do frontend no Netlify.
- **`package.json`**: Dependências e scripts para rodar o projeto (backend e frontend simultaneamente).

---

## 🔙 Backend (`backend/`)

### Arquivos principais:

- **`index.js`**: Ponto de entrada do servidor Express.
- **`db/db.js`**: Configuração da conexão com o banco de dados (PostgreSQL, MySQL, etc.).

### 📦 Rotas da API (`routes/`):

- **`categorias.js`**: CRUD de categorias de produtos.
- **`produtos.js`**: Gerenciamento de produtos.
- **`imagens.js`**: Upload e gerenciamento de imagens dos produtos.

---

## 🌐 Frontend (`frontend/`)

### Arquivos principais:

- **`vite.config.js`**: Configuração do bundler Vite.
- **`index.html`**: Template HTML principal.

### 📁 Diretório `src/`:

- **`main.jsx`**: Ponto de entrada da aplicação React.
- **`App.jsx`**: Componente raiz que gerencia rotas e estrutura geral.

### 🧩 Subdiretórios:

- **`pages/`**: Páginas completas da aplicação (Ex: Home, Admin, Detalhes do Produto).
- **`components/`**: Componentes reutilizáveis de UI (Ex: Botões, Formulários, Navegação, Rodapé).
- **`assets/`**: Ícones, imagens e arquivos estáticos.
- **`hooks/`**: Hooks customizados do React (Ex: `useBreadcrumbs`).
- **`styles/`**: Estilização global (SCSS), incluindo variáveis, mixins e animações.

```
ecommerce-fullstack
├─ .qodo
├─ backend
│  ├─ .env
│  ├─ .env.example
│  ├─ db
│  │  └─ db.js
│  ├─ index.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  │  ├─ categorias.js
│  │  ├─ imagens.js
│  │  └─ produtos.js
│  └─ scripts
├─ database_schema.sql
├─ DOCUMENTACAO.md
├─ frontend
│  ├─ .env.example
│  ├─ .env.local
│  ├─ .env.production
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ imgs
│  │     └─ heroWoman.png
│  ├─ README.md
│  ├─ src
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  └─ icons
│  │  │     ├─ addProdutoIcon.svg
│  │  │     ├─ adminIcon.svg
│  │  │     ├─ analyticsIcon.svg
│  │  │     ├─ boxIcon.svg
│  │  │     ├─ carCompras.svg
│  │  │     ├─ editIcon.svg
│  │  │     ├─ estoqueIcon.svg
│  │  │     ├─ fecharIcon.svg
│  │  │     ├─ folderIcon.svg
│  │  │     ├─ gerenciarIcon.svg
│  │  │     ├─ listProdutosIcon.svg
│  │  │     ├─ lixoIcon.svg
│  │  │     ├─ lupaIcon.svg
│  │  │     ├─ menuHamburguerIcon.svg
│  │  │     ├─ sacolaIcon.svg
│  │  │     ├─ saleIcon.svg
│  │  │     ├─ uploadIcon.svg
│  │  │     └─ userIcon.svg
│  │  ├─ components
│  │  │  ├─ Admin
│  │  │  │  └─ AddProduto
│  │  │  │     ├─ AddProduto.jsx
│  │  │  │     ├─ AddProduto.module.scss
│  │  │  │     ├─ Categorias
│  │  │  │     │  ├─ GerenciarCategorias
│  │  │  │     │  │  ├─ GerenciarCategorias.jsx
│  │  │  │     │  │  └─ GerenciarCategorias.module.scss
│  │  │  │     │  └─ SelecionaCategoria.jsx
│  │  │  │     ├─ ImagensProdutos
│  │  │  │     │  ├─ ImagensProdutos.module.scss
│  │  │  │     │  └─ ImagensProodutos.jsx
│  │  │  │     └─ TodosProdutos
│  │  │  │        ├─ Acoes.jsx
│  │  │  │        ├─ TodosProdutos.jsx
│  │  │  │        └─ TodosProdutos.module.scss
│  │  │  ├─ CarrinhoCompras
│  │  │  │  ├─ CarrinhoCompras.jsx
│  │  │  │  ├─ CarrinhoCompras.module.scss
│  │  │  │  ├─ ItemCarrinho.jsx
│  │  │  │  └─ ItemCarrinho.module.scss
│  │  │  ├─ Footer
│  │  │  │  ├─ Footer.jsx
│  │  │  │  └─ Footer.module.scss
│  │  │  ├─ Navigation
│  │  │  │  ├─ BreadCrumb
│  │  │  │  │  ├─ Breadcrumb.jsx
│  │  │  │  │  └─ Breadcrumb.module.scss
│  │  │  │  ├─ Navigation.jsx
│  │  │  │  └─ Navigation.module.scss
│  │  │  ├─ OrdemConclusaoPedido
│  │  │  │  ├─ EndereçoPedido
│  │  │  │  └─ InfosPessoais
│  │  │  │     ├─ InfosPessoais.jsx
│  │  │  │     └─ InfosPessoais.module.scss
│  │  │  └─ Produtos
│  │  │     ├─ DetalhesProdutos
│  │  │     │  ├─ DetalhesProdutos.jsx
│  │  │     │  └─ DetalhesProdutos.module.scss
│  │  │     ├─ ProdutosList.jsx
│  │  │     ├─ ProdutosList.module.scss
│  │  │     └─ SugestaoProdutos
│  │  │        ├─ SugestaoProdutos.jsx
│  │  │        └─ SugestaoProdutos.module.scss
│  │  ├─ hooks
│  │  │  └─ useBreadcrumbs.js
│  │  ├─ index.scss
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ Admin
│  │  │  │  ├─ DashboardAdmin.jsx
│  │  │  │  ├─ DashboardAdmin.module.scss
│  │  │  │  └─ HomeAdmin
│  │  │  │     ├─ HomeAdmin.jsx
│  │  │  │     └─ HomeAdmin.module.scss
│  │  │  ├─ index
│  │  │  │  ├─ IndexPage.jsx
│  │  │  │  └─ IndexPage.module.scss
│  │  │  ├─ OrdemConclusaoPedido
│  │  │  │  ├─ ConclusaoPedido.jsx
│  │  │  │  └─ ConclusaoPedido.module.scss
│  │  │  └─ Produtos_PorCategoria
│  │  │     └─ TodosProdutos
│  │  └─ styles
│  │     ├─ animation.scss
│  │     ├─ variables.scss
│  │     └─ _mixin.scss
│  └─ vite.config.js
├─ netlify.toml
├─ package.json
└─ README.md


```
---

**Projeto E-commerce Fullstack**
# 📚 Documentação do E-commerce

## 🎯 O que é este projeto?

Um e-commerce (loja online) completo sendo desenvolvido do zero com tecnologias modernas.

**Funcionalidades planejadas:**
- Catálogo de produtos
- Carrinho de compras
- Sistema de pedidos
- Painel administrativo

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

## 📁 Estrutura do projeto

```
ecommerce-fullstack/
├── backend/           # Servidor da API
│   ├── db/           # Conexão com banco
│   ├── index.js      # Servidor principal
│   └── package.json  # Dependências
├── frontend/         # Site React
│   ├── src/          # Código fonte
│   └── package.json  # Dependências
└── database_schema.sql # Estrutura do banco
```

## 🗄️ Banco de dados

### Tabela atual: produtos

```sql
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    preco NUMERIC(10, 2),
    estoque INTEGER,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Campos:**
- `id`: Identificador único do produto
- `nome`: Nome do produto (até 100 caracteres)
- `preco`: Preço com 2 casas decimais
- `estoque`: Quantidade disponível
- `data_criacao`: Quando foi cadastrado

## 🔧 O que foi implementado

### Backend
- Servidor Express configurado na porta 5000
- Middleware CORS habilitado para requisições
- Parser JSON configurado para APIs
- Conexão com banco PostgreSQL (Neon) funcionando
- Estrutura preparada para rotas da API

### Frontend
- App React 19 inicializado com Vite
- Componente App.jsx criado (estrutura base)
- Sass/SCSS configurado para estilos
- Hot reload funcionando para desenvolvimento
- Build otimizado configurado

### Banco de dados
- Projeto PostgreSQL criado no Neon
- Tabela `produtos` implementada
- Dados de exemplo inseridos para teste
- Schema documentado no arquivo SQL

## 🎯 Status atual

### ✅ Implementado
- Estrutura base do projeto
- Servidor Express configurado
- App React inicializado
- Conexão com banco funcionando
- Tabela produtos criada

### 🚧 Em desenvolvimento
- API REST para produtos
- Interface para listar produtos
- Formulários de cadastro

### 📋 Próximas funcionalidades
- Sistema de usuários
- Carrinho de compras
- Processamento de pedidos
- Painel administrativo

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

## 💡 Observações

- Projeto em desenvolvimento ativo
- Estrutura preparada para crescer
- Código limpo e bem organizado
- Documentação atualizada regularmente

---

**Projeto E-commerce Fullstack**
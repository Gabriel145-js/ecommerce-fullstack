-- =====================================================
-- SCHEMA ATUAL - E-COMMERCE FULLSTACK


-- Tabela de produtos (atual em desenvolvimento)
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    preco NUMERIC(10, 2),
    estoque INTEGER CHECK (estoque <= 9999),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dados de exemplo para teste
INSERT INTO produtos (nome, preco, estoque) VALUES
('Smartphone Samsung', 899.99, 50),
('Notebook Dell', 2499.90, 25),
('Fone Bluetooth', 199.99, 100),
('Mouse Gamer', 89.90, 75),
('Teclado Mecânico', 299.99, 30);


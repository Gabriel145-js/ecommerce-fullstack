-- =====================================================
-- SCHEMA ATUAL - E-COMMERCE FULLSTACK


-- Tabela de produtos (atual em desenvolvimento)
-- Criação da tabela produtos com todas as colunas já incluídas
-- Criação da tabela produtos com todas as colunas e FK já incluídas
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(400) NOT NULL,
    descricao VARCHAR(500),
    preco NUMERIC(10, 2) NOT NULL,
    estoque INTEGER NOT NULL,
    tamanho BOOLEAN NOT NULL,
    tamanho_p BOOLEAN DEFAULT FALSE,
    tamanho_m BOOLEAN DEFAULT FALSE,
    tamanho_g BOOLEAN DEFAULT FALSE,
    imagem_principal TEXT NOT NULL CHECK (imagem_principal ~ '^https?://'),
    imagens_adicionais TEXT[] NOT NULL,
    categorias_id INT,
    CONSTRAINT fk_categoria
        FOREIGN KEY (categorias_id)
        REFERENCES categorias(id)
        ON DELETE SET NULL
);

-- Função para validar URLs do array
CREATE OR REPLACE FUNCTION validar_urls()
RETURNS TRIGGER AS $$
BEGIN
    -- Valida cada elemento do array
    IF EXISTS (
        SELECT 1
        FROM unnest(NEW.imagens_adicionais) AS url
        WHERE url !~ '^https?://'
    ) THEN
        RAISE EXCEPTION 'Todas as imagens adicionais devem começar com http:// ou https://';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para validar antes de inserir ou atualizar
CREATE TRIGGER trigger_validar_urls
BEFORE INSERT OR UPDATE ON produtos
FOR EACH ROW
EXECUTE FUNCTION validar_urls();

--CREATE TABLE para criar as categorias
CREATE TABLE categorias (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

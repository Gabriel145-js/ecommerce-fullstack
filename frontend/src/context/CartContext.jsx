
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Tenta carregar o carrinho do localStorage, ou inicia como um array vazio
    const [carrinhoItens, setCarrinhoItens] = useState(() => {
        const storedCart = localStorage.getItem('carrinhoItens');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Salva o carrinho no localStorage sempre que ele for alterado
    useEffect(() => {
        localStorage.setItem('carrinhoItens', JSON.stringify(carrinhoItens));
    }, [carrinhoItens]);

    // Função para adicionar produtos ao carrinho
    const addAoCarrinho = (produto) => {
        setCarrinhoItens(prevItems => {
            // Verifica se o produto já existe no carrinho
            const itemExists = prevItems.find(item => item.id === produto.id);
            if (itemExists) {
                // Se existe, aumenta a quantidade
                return prevItems.map(item =>
                    item.id === produto.id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
            } else {
                // Se não existe, adiciona ao carrinho com quantidade 1
                return [...prevItems, { ...produto, quantidade: 1 }];
            }
        });
    };

    // Função para remover produtos do carrinho
    const removerDoCarrinho = (produtoId) => {
        setCarrinhoItens(prevItems => prevItems.filter(item => item.id !== produtoId));
    };

    // Função para limpar o carrinho
    const limparCarrinho = () => {
        setCarrinhoItens([]);
    };

    // Calcula o total do pedido
    const totalPedido = carrinhoItens.reduce((total, item) => {
        return total + (item.preco * item.quantidade);
    }, 0);

    return (
        <CartContext.Provider value={{ carrinhoItens, addAoCarrinho, removerDoCarrinho, limparCarrinho, totalPedido }}>
            {children}
        </CartContext.Provider>
    );
};

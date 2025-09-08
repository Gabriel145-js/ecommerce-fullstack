
import React from 'react';

const ConcluirPedido = ({
    nomeCliente,
    sobrenomeCliente,
    emailCliente,
    telefoneCliente,
    cep,
    rua,
    numResidencia,
    cidade,
    estado,
    onConcluir
}) => {
    return (
        <div style={{ textAlign: 'center', margin: '32px 0' }}>
            <h2>Resumo do Pedido</h2>
            <p><b>Nome:</b> {nomeCliente} {sobrenomeCliente}</p>
            <p><b>Email:</b> {emailCliente}</p>
            <p><b>Telefone:</b> {telefoneCliente}</p>
            <p><b>Endereço:</b> {rua}, {numResidencia} - {cidade}/{estado} - CEP: {cep}</p>
            {/* Adicione mais detalhes do pedido se necessário */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
                <button onClick={onConcluir}>Concluir Pedido</button>
            </div>
        </div>
    );
};

export default ConcluirPedido;
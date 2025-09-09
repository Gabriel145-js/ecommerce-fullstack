
import React from 'react';

const ConcluirPedido = ({
    nomeCliente,
    sobrenomeCliente,
    emailCliente,
    telefoneCliente,
    cep,
    rua,
    bairro,
    numResidencia,
    cidade,
    estado,
    complemento,

}) => {
    return (
        <div style={{ textAlign: 'center', margin: '32px 0' }}>
            <h2>Resumo do Pedido</h2>
            <p><b>Nome:</b> {nomeCliente} {sobrenomeCliente}</p>
            <p><b>Email:</b> {emailCliente}</p>
            <p><b>Telefone:</b> {telefoneCliente}</p>
            <p><b>Endereço:</b> {bairro},{rua}, {numResidencia} - {cidade}/{estado} - CEP: {cep}</p>
            <p><b>Complemento:</b> {complemento}</p>
        </div>
    );
};

export default ConcluirPedido;
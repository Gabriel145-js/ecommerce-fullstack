import React, { useState } from 'react'
import DefaultFormPedido from '../DefaultFormPedido'
import pingLocalIcon from '../../../assets/icons/pingLocalIcon.svg'

const EndereçoPedido = ({
    cep, setCep,
    rua, setRua,
    bairro, setBairro,
    complemento, setComplemento,        
    numResidencia, setNumResidencia,
    cidade, setCidade,
    estado, setEstado
}) => {
    const campos = [
        { label: 'CEP', placeholder: 'Digite seu CEP', value: cep, onChange: setCep },
        { label: 'Bairro',placeholder: 'Digite seu bairro', value: bairro, onChange: setBairro },
        { label: 'Rua', placeholder: 'Digite sua rua', value: rua, onChange: setRua },
        { label: 'Número', placeholder: 'Digite seu número da residencia', value: numResidencia, onChange: setNumResidencia },
        { label: 'Cidade', placeholder: 'Digite sua cidade', value: cidade, onChange: setCidade },
        { label: 'Estado', placeholder: 'Digite seu estado', value: estado, onChange: setEstado },
        { label: 'Complemento', placeholder: 'Complemento', value: complemento, onChange: setComplemento },
    ];

    return (
        <DefaultFormPedido
            titulo="Endereço de entrega"
            icone={pingLocalIcon}
            campos={campos}
        />
    );
};


export default EndereçoPedido
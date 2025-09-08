import React, { useState } from 'react'
import DefaultFormPedido from '../DefaultFormPedido'
import pingLocalIcon from '../../../assets/icons/pingLocalIcon.svg'

const EndereçoPedido = ({
    cep, setCep,
    rua, setRua,
    numResidencia, setNumResidencia,
    cidade, setCidade,
    estado, setEstado
}) => {
    const campos = [
        { label: 'CEP', value: cep, onChange: setCep },
        { label: 'Rua', value: rua, onChange: setRua },
        { label: 'Número', value: numResidencia, onChange: setNumResidencia },
        { label: 'Cidade', value: cidade, onChange: setCidade },
        { label: 'Estado', value: estado, onChange: setEstado },
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
import React from 'react'
import userIcon from '../../../assets/icons/userIcon.svg'
import { useState } from 'react'
import DefaultFormPedido from '../DefaultFormPedido'

const InfosPessoais = ({
    nomeCliente, setNomeCliente,
    sobrenomeCliente, setSobrenomeCliente,
    emailCliente, setEmailCliente,
    telefoneCliente, setTelefoneCliente
}) => {
    const campos = [
        { label: 'Seu nome', placeholder: 'Digite seu nome', value: nomeCliente, onChange: setNomeCliente },
        { label: 'Sobrenome', placeholder: 'Digite seu sobrenome', value: sobrenomeCliente, onChange: setSobrenomeCliente },
        { label: 'Email', placeholder: 'Digite seu email', value: emailCliente, onChange: setEmailCliente },
        { label: 'Telefone', placeholder: '(X) XXXX-XXXX', value: telefoneCliente, onChange: setTelefoneCliente },
    ];

    return (
        <DefaultFormPedido
            titulo="Informações Pessoais"
            icone={userIcon}
            campos={campos}
        />
    );
};


export default InfosPessoais
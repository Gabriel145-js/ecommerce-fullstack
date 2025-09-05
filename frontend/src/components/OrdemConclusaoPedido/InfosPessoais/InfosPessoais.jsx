import React from 'react'
import userIcon from '../../../assets/icons/userIcon.svg'
import { useState } from 'react'
import DefaultFormPedido from '../DefaultFormPedido'

const InfosPessoais = () => {

    const [nomeCliente, setNomeCliente] = useState('')
    const [sobrenomeCliente, setSobrenomeCliente] = useState('')
    const [emailCliente, setEmailCliente] = useState('')
    const [telefoneCliente, setTelefoneCliente] = useState('')

    const campos = [
        {
            label: 'Seu nome',
            placeholder: 'Nome',
            value: nomeCliente,
            onChange: setNomeCliente,
        },
        {
            label: 'Sobrenome',
            placeholder: 'Seu sobrenome',
            value: sobrenomeCliente,
            onChange: setSobrenomeCliente,
        },
        {
            label: 'Email',
            placeholder: 'seu@email.com',
            value: emailCliente,
            onChange: setEmailCliente,
        },
        {
            label: 'Telefone',
            placeholder: '(11) 99999-9999',
            value: telefoneCliente,
            onChange: setTelefoneCliente,
        },
    ]

    return (
        <DefaultFormPedido
            titulo="Informações Pessoais"
            icone={userIcon}
            campos={campos}
        />
    )

}

export default InfosPessoais
import React, { useState } from 'react'
import DefaultFormPedido from '../DefaultFormPedido'
import pingLocalIcon from '../../../assets/icons/pingLocalIcon.svg'

const EndereçoPedido = () => {
    const [cep, setCep] = useState('')
    const [rua, setRua] = useState('')
    const [numResidencia, setNumResidencia] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')

    const campos = [
        {
            label: 'CEP',
            placeholder: '00000-000',
            value: cep,
            onChange: setCep,
        },
        {
            label: 'Rua',
            placeholder: 'Sua rua',
            value: rua,
            onChange: setRua,
        },
        {
            label: 'Numero',
            placeholder: 'Numero da residencia',
            value: numResidencia,
            onChange: setNumResidencia,
        },
        {
            label: 'Cidade',
            placeholder: 'Sua cidade',
            value: cidade,
            onChange: setCidade,
        },
        {
            label: 'Estado',
            placeholder: 'Seu estado',
            value: estado,
            onChange: setEstado,
        },

    ]
    return (
        <DefaultFormPedido
            titulo={'Endereço de entrega'}
            icone={pingLocalIcon}
            campos={campos}

        />
    )
}

export default EndereçoPedido
import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './ConclusaoPedido.module.scss';
import InfosPessoais from '../../components/OrdemConclusaoPedido/InfosPessoais/InfosPessoais';
import EndereçoPedido from '../../components/OrdemConclusaoPedido/EndereçoPedido/EndereçoPedido';
import ConcluirPedido from '../../components/OrdemConclusaoPedido/ConcluirPedido/ConcluirPedido';

const nomePassos = ['Informações Pessoais', 'Endereço de Entrega', 'Revisão e Pagamento'];

const ConclusaoPedido = () => {
  const { carrinhoItens, totalPedido, limparCarrinho } = useContext(CartContext);

  const API_URL = import.meta.env.VITE_API_URL;
  const urlPedido = `${API_URL}/api/pedido`;

  const [passoAtual, setPassoAtual] = useState(0);

  // Estados dos dados do cliente
  const [nomeCliente, setNomeCliente] = useState('');
  const [sobrenomeCliente, setSobrenomeCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numResidencia, setNumResidencia] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const proximoPasso = () => {
    if (passoAtual < nomePassos.length - 1) {
      setPassoAtual(passoAtual + 1);
    }
  };

  const voltarPasso = () => {
    if (passoAtual > 0) {
      setPassoAtual(passoAtual - 1);
    }
  };

  const handleConcluir = () => {

    if (carrinhoItens.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const itensFormatados = carrinhoItens.map(item => ({
      produto_id: item.id,
      quantidade: item.quantidade,
      preco_unitario: item.preco
    }));

    const dadosPedido = {
      cliente: {
        nome_cliente: nomeCliente,
        sobrenome_cliente: sobrenomeCliente,
        email_cliente: emailCliente,
        telefone_cliente: telefoneCliente,
        cep: cep,
        estado: estado,
        cidade: cidade,
        bairro: '', // Adicione bairro se tiver
        rua: rua,
        numero: numResidencia,
        complemento: '' // Adicione complemento se tiver
      },
      itens: itensFormatados,
      valor_total: totalPedido
    };

    const enviarPedido = async () => {
      try {
        const response = await fetch(urlPedido, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dadosPedido)
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Pedido enviado:', data);
          alert('Pedido enviado com sucesso!');
          limparCarrinho();
        } else {
          const erro = await response.json();
          console.error('Erro do servidor:', erro);
          throw new Error('Falha ao enviar pedido');
        }

      } catch (error) {
        console.error('Erro ao enviar pedido:', error);
        alert('Erro ao enviar pedido. Verifique o console para mais detalhes.');
      }
    };
    enviarPedido();
  };

  return (
    <section className={styles.containerCncluirPedido}>
      <header className={styles.tituloSubtitulo}>
        <h1>Finalizar Pedido</h1>
        <p>Complete seus dados para concluir a compra</p>
      </header>

      <div className={styles.linhaDoTempo}>
        {nomePassos.map((nome, index) => (
          <div
            key={nome}
            className={`${styles.passo} ${index === passoAtual ? styles.passoAtivo : ''} ${index < passoAtual ? styles.passoCompleto : ''}`}
          >
            <div className={styles.numeroPasso}>{index + 1}</div>
            <div className={styles.nomePasso}>{nome}</div>
          </div>
        ))}
      </div>
      
      {/* Adicionado o resumo do pedido no passo de revisão */}
      {passoAtual === 2 && (
         <div className={styles.resumoCarrinho}>
            <h2>Revisão do Pedido</h2>
            {carrinhoItens.length > 0 ? (
              <ul>
                {carrinhoItens.map(item => (
                  <li key={item.id}>
                    <span>{item.nome} (x{item.quantidade})</span>
                    <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Seu carrinho está vazio.</p>
            )}
            <h3>Total: R$ {totalPedido.toFixed(2)}</h3>
          </div>
      )}

      <div className={styles.conteudoPasso}>
        {passoAtual === 0 && (
          <InfosPessoais
            nomeCliente={nomeCliente}
            setNomeCliente={setNomeCliente}
            sobrenomeCliente={sobrenomeCliente}
            setSobrenomeCliente={setSobrenomeCliente}
            emailCliente={emailCliente}
            setEmailCliente={setEmailCliente}
            telefoneCliente={telefoneCliente}
            setTelefoneCliente={setTelefoneCliente}
          />
        )}
        {passoAtual === 1 && (
          <EndereçoPedido
            cep={cep}
            setCep={setCep}
            rua={rua}
            setRua={setRua}
            numResidencia={numResidencia}
            setNumResidencia={setNumResidencia}
            cidade={cidade}
            setCidade={setCidade}
            estado={estado}
            setEstado={setEstado}
          />
        )}
        {passoAtual === 2 && (
          <ConcluirPedido
            nomeCliente={nomeCliente}
            sobrenomeCliente={sobrenomeCliente}
            emailCliente={emailCliente}
            telefoneCliente={telefoneCliente}
            cep={cep}
            rua={rua}
            numResidencia={numResidencia}
            cidade={cidade}
            estado={estado}
            onConcluir={handleConcluir}
          />
        )}
      </div>

      <div className={styles.botoesNavegacao}>
        <button onClick={voltarPasso} disabled={passoAtual === 0}>
          Voltar
        </button>
        {passoAtual === nomePassos.length - 1 ? (
          <button onClick={handleConcluir} disabled={carrinhoItens.length === 0}>
            Finalizar Compra
          </button>
        ) : (
          <button onClick={proximoPasso}>
            Próximo
          </button>
        )}
      </div>
    </section>
  );
};

export default ConclusaoPedido;
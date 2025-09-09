import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import styles from './ConclusaoPedido.module.scss';
import InfosPessoais from '../../components/OrdemConclusaoPedido/InfosPessoais/InfosPessoais';
import EndereçoPedido from '../../components/OrdemConclusaoPedido/EndereçoPedido/EndereçoPedido';
import ConcluirPedido from '../../components/OrdemConclusaoPedido/ConcluirPedido/ConcluirPedido';
import Stepper from '../../components/Stepper/Stepper';
import { Player } from '@lottiefiles/react-lottie-player';

const nomePassos = ['Informações Pessoais', 'Endereço de Entrega', 'Pagamento'];

const ConclusaoPedido = () => {
  const { carrinhoItens, totalPedido, limparCarrinho } = useContext(CartContext);
  const navigate = useNavigate()

  const API_URL = import.meta.env.VITE_API_URL;
  const urlPedido = `${API_URL}/api/pedido`;

  const [passoAtual, setPassoAtual] = useState(0);
  const [loading, setLoading] = useState(false)

  // Estados dos dados do cliente
  const [nomeCliente, setNomeCliente] = useState('');
  const [sobrenomeCliente, setSobrenomeCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [complemento, setComplemento] = useState('');
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
        bairro: bairro,
        rua: rua,
        numero: numResidencia,
        complemento: complemento
      },
      itens: itensFormatados,
      valor_total: totalPedido
    };

    //Faz o POST para o db
    const enviarPedido = async () => {
      try {
        setLoading(true)
        const response = await fetch(urlPedido, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dadosPedido)
        })

        const data = response.json()
        limparCarrinho()

        setTimeout(() => {
          setLoading(false);
          navigate('/');
        }, 2000); // espera 2s para o loading sumir e depois redireciona
        

      } catch (error) {
        console.error('Erro ao enviar pedido:', error);

      }
    }

    enviarPedido();
  };

  return (
    <section className={styles.containerCncluirPedido}>

      {loading && (
        <div className={styles.animacaoSucessoOverlay}>
          <Player
            src="https://lottie.host/7ab3d1b4-ae52-4ce0-a002-3db5e7db9c36/4XYPoHAFEE.json"
            className={styles.animacaoSucesso}
            autoplay
            onEvent={(event) => {
              if (event === 'complete') {
                setTimeout(() => {
                  setLoading(false);
                  navigate('/');
                }, 0);
              }
            }}
          />
        </div>
      )}
      <header className={styles.tituloSubtitulo}>
        <h1>Finalizar  Pedido</h1>
        <p>Complete seus dados para concluir a compra</p>
      </header>

      <Stepper currentStep={passoAtual} />


      <div className={styles.conteudoPasso}>
        {passoAtual === 0 && (
          <div className={styles.cardEtapa}>
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
            <div className={styles.botoesNavegacao}>
              <button onClick={voltarPasso} disabled={passoAtual === 0}>
                Voltar
              </button>
              <button onClick={proximoPasso}>
                Próximo
              </button>
            </div>
          </div>
        )}

        {passoAtual === 1 && (
          <div className={styles.cardEtapa}>
            <EndereçoPedido
              cep={cep}
              setCep={setCep}
              rua={rua}
              setRua={setRua}
              numResidencia={numResidencia}
              setNumResidencia={setNumResidencia}
              cidade={cidade}
              setCidade={setCidade}
              bairro={bairro}
              setBairro={setBairro}
              complemento={complemento}
              setComplemento={setComplemento}
              estado={estado}
              setEstado={setEstado}
            />
            <div className={styles.botoesNavegacao}>
              <button onClick={voltarPasso}>
                Voltar
              </button>
              <button onClick={proximoPasso}>
                Próximo
              </button>
            </div>
          </div>
        )}

        {passoAtual === 2 && (
          <div className={styles.cardEtapa}>
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
              <h3 >Total: R$ {totalPedido.toFixed(2)}</h3>
            </div>
            <ConcluirPedido
              nomeCliente={nomeCliente}
              sobrenomeCliente={sobrenomeCliente}
              emailCliente={emailCliente}
              telefoneCliente={telefoneCliente}
              cep={cep}
              rua={rua}
              bairro={bairro}
              numResidencia={numResidencia}
              cidade={cidade}
              estado={estado}
              complemento={complemento}
            />
            <div className={styles.botoesNavegacao}>
              <button onClick={voltarPasso}>
                Voltar
              </button>
              <button onClick={handleConcluir} disabled={carrinhoItens.length === 0}>
                Finalizar Compra
              </button>
            </div>
          </div>
        )}



      </div>
    </section>
  );
};

export default ConclusaoPedido;
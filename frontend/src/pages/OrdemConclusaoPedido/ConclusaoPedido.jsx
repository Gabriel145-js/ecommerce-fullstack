import React, { useState } from 'react'
import styles from './ConclusaoPedido.module.scss'
import InfosPessoais from '../../components/OrdemConclusaoPedido/InfosPessoais/InfosPessoais'
import EndereçoPedido from '../../components/OrdemConclusaoPedido/EndereçoPedido/EndereçoPedido'

const nomePassos = ['Informações Pessoais', 'Endereço de Entrega', 'Pagamento']

const ConclusaoPedido = () => {
  const [passoAtual, setPassoAtual] = useState(0)

  const proximoPasso = () => {
    if (passoAtual < nomePassos.length - 1) {
      setPassoAtual(passoAtual + 1)
    }
  }

  const voltarPasso = () => {
    if (passoAtual > 0) {
      setPassoAtual(passoAtual - 1)
    }
  }

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
            className={`${styles.passo} ${
              index === passoAtual ? styles.passoAtivo : ''
            } ${index < passoAtual ? styles.passoCompleto : ''}`}
          >
            <div className={styles.numeroPasso}>{index + 1}</div>
            <div className={styles.nomePasso}>{nome}</div>
          </div>
        ))}
      </div>

      <div className={styles.conteudoPasso}>

        {/* Exibe os componentes de acordo com o passo atual */}
        {passoAtual === 0 && <InfosPessoais />}
        {passoAtual === 1 && <EndereçoPedido/>}
        {passoAtual === 2 && <div>Componente de Pagamento aqui.</div>}
      </div>

      {/* Exibe os botoes de voltar e proximo */}
      <div className={styles.botoesNavegacao}>
        <button onClick={voltarPasso} disabled={passoAtual === 0}>
          Voltar
        </button>
        <button onClick={proximoPasso} disabled={passoAtual === nomePassos.length - 1}>
          Próximo
        </button>
      </div>
    </section>
  )
}

export default ConclusaoPedido
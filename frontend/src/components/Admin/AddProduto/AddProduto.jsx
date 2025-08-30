import React, { useEffect, useState } from 'react'
import styles from './AddProduto.module.scss'
import SelecionaCategoria from './Categorias/SelecionaCategoria'
import ImagensProodutos from './ImagensProdutos/ImagensProodutos'


const AddProduto = () => {

  const [nomeProduto, setNomeProduto] = useState('')
  const [estoque, setEstoque] = useState('')
  const [preco, setPreco] = useState('')
  const [descricao, setDescricao] = useState('')
  const [selecionaCategoria, setSelecionaCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [tagsCor, setTagCor] = useState([])
  const [cor, setCor] = useState([])
  const [tamanhoP, setTamanhoP] = useState(false);
  const [tamanhoM, setTamanhoM] = useState(false);
  const [tamanhoG, setTamanhoG] = useState(false);
  const [imagemPrincipal, setImagemPrincipal] = useState(null);
  const [imagensAdicionais, setImagensAdicionais] = useState([]);


  const API_URL = import.meta.env.VITE_API_URL;
  const urlProdutos = `${API_URL}/api/produtos`;


  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload da imagem principal
      let imagemPrincipalUrl = '';
      if (imagemPrincipal) {
        const formData = new FormData();
        formData.append('file', imagemPrincipal);
        formData.append('upload_preset', UPLOAD_PRESET);

        const res = await fetch(CLOUDINARY_URL, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        imagemPrincipalUrl = data.secure_url;
      }

      //Upload das imagens adicionais
      const imagensAdicionaisUrls = [];
      for (const file of imagensAdicionais) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);

        const res = await fetch(CLOUDINARY_URL, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        imagensAdicionaisUrls.push(data.secure_url);
      }

      // Enviar dados do produto + URLs das imagens para o backend
      const produtos = {
        nome: nomeProduto,
        descricao,
        preco: Number(preco),
        estoque: Number(estoque),
        cor: tagsCor,
        tamanho_p: tamanhoP,
        tamanho_m: tamanhoM,
        tamanho_g: tamanhoG,
        categorias_id: Number(selecionaCategoria),
        imagem_principal: imagemPrincipalUrl,
        imagens_adicionais: imagensAdicionaisUrls,
      };

      console.log('Enviando produto:', produtos);


      const resProduto = await fetch(urlProdutos, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produtos),
      });
      const resultado = await resProduto.json();
      console.log('Produto criado com sucesso:', resultado);

      // Resetar estados
      setNomeProduto('');
      setDescricao('');
      setPreco('');
      setEstoque('');
      setImagemPrincipal(null);
      setImagensAdicionais([]);

    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  //Adicionar no array as cores escritas 
  const handleAddTag = (e) => {
    e.preventDefault()

    const corTrim = cor.trim();

    if (corTrim && !tagsCor.includes(corTrim)) {

      setTagCor([...tagsCor, corTrim]);
      setCor('');

    } else {
      console.error('erro ao criar tag')
    }
    console.log(tagsCor)
  }

  const removerTag = () => {
    setTagCor(tagsCor.filter((_, i) => i !== tagsCor.length - 1))
  }

  return (
    <div className={styles.containerAddProduto}>
      <header className={styles.titESubtitulo}>
        <h1>Administração de Produtos</h1>
        <p>Crie produtos e categorias, adicione imagens e muito mais</p>
      </header>

      <section className={styles.quadroAdicionarProduto}>
        <form className={styles.formProduto} onSubmit={handleSubmit}>
          <section className={styles.sectionDadosProd}>
            <label className={styles.labelInput}>
              <span>Nome</span>
              <input type="text" placeholder='Nome do produto' value={nomeProduto} onChange={e => setNomeProduto(e.target.value)} />
            </label>

            <label className={styles.labelInput}>
              <span>Descrição</span>
              <input type="text" placeholder='Descrição' value={descricao} onChange={e => setDescricao(e.target.value)} />
            </label>

            <label className={styles.labelInput}>
              <span>Preço</span>
              <input type="number" placeholder='Preço' value={preco} onChange={e => setPreco(e.target.value)} />
            </label>

            <label className={styles.labelInput}>
              <span>Estoque</span>
              <input type="number" placeholder='Quantidade em estoque' value={estoque} onChange={e => setEstoque(e.target.value)} />
            </label>


            <SelecionaCategoria
              categorias={categorias}
              setCategorias={setCategorias}
              selecionaCategoria={selecionaCategoria}
              setSelecionaCategoria={setSelecionaCategoria}
            />
            <label className={styles.labelInput}>
              <span>Cores</span>

              <input type="text" placeholder='Cores do produto' value={cor} onChange={e => setCor(e.target.value)} />
              <button onClick={e => handleAddTag(e)}>Criar tag</button>
              <div className={styles.tagsWrapper}>
                {tagsCor.map((tag, index) => (
                  <div className={styles.containerTagCor} key={index}>
                    <p className={styles.tagCor}>
                      {tag}
                      <span className={styles.removeTagsCor} onClick={() => removerTag(index)}>X</span>
                    </p>
                  </div>
                ))}
              </div>

            </label>


            <div className={styles.labelInput}>
              <span>Tamanhos disponíveis</span>
              <div className={styles.checkboxGroup}>
                <div className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    checked={tamanhoP}
                    onChange={e => setTamanhoP(e.target.checked)}
                  />
                  <span>P</span>
                </div>
                <div className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    checked={tamanhoM}
                    onChange={e => setTamanhoM(e.target.checked)}
                  />
                  <span>M</span>
                </div>
                <div className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    checked={tamanhoG}
                    onChange={e => setTamanhoG(e.target.checked)}
                  />
                  <span>G</span>
                </div>
              </div>
            </div>
          </section>




          <ImagensProodutos
            imagemPrincipal={imagemPrincipal}
            setImagemPrincipal={setImagemPrincipal}
            imagensAdicionais={imagensAdicionais}
            setImagensAdicionais={setImagensAdicionais}
          />

          <button type="submit">Criar produto</button>
        </form>
      </section>


    </div>
  )
}

export default AddProduto
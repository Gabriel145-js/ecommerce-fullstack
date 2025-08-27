import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const nomesEstaticos = {
  'produtos': 'Produtos',
  'admin': 'Painel Administrativo',
  'adicionar-produto': 'Adicionar Produto',
  'Detalhes-Produto': 'Produtos',
};

const API_URL = import.meta.env.VITE_API_URL;

const buscarNomeProdutoPorId = async (id) => {
  try {
    const resposta = await fetch(`${API_URL}/api/produtos/${id}`);

    if (!resposta.ok) {
      return `Produto ${id}`;
    }

    const produto = await resposta.json();

    return produto.nome;
  } catch (error) {

    console.error("Erro ao buscar nome do produto:", error);
    return `Produto ${id}`;
  }
};

const useBreadcrumbs = () => {
  const location = useLocation();

  const [caminho, setCaminho] = useState([]);


  useEffect(() => {
    const gerarCaminho = async () => {

      const segmentosDaUrl = location.pathname.split('/').filter(Boolean);

      const caminhoDefault = [{ path: '/', label: 'Início' }];


      let caminhoAtual = '';
      for (let i = 0; i < segmentosDaUrl.length; i++) {
        const segmento = segmentosDaUrl[i];
        caminhoAtual += `/${segmento}`;

        const ePaginaDeProduto = (segmento === 'produtos' || segmento === 'Detalhes-Produto');

        const proximoSegmentoEUmId = segmentosDaUrl[i + 1] && !isNaN(segmentosDaUrl[i + 1]);

        if (ePaginaDeProduto && proximoSegmentoEUmId) {
          const idDoProduto = segmentosDaUrl[i + 1];

          const nomeDoProduto = await buscarNomeProdutoPorId(idDoProduto);

          caminhoDefault.push({ path: caminhoAtual, label: 'Produtos' });

          caminhoAtual += `/${idDoProduto}`;
          caminhoDefault.push({ path: caminhoAtual, label: nomeDoProduto });


          i++;

          if (segmentosDaUrl[i + 1]) {
            i++;
          }
        } else {
      
          const rotulo = nomesEstaticos[segmento] || segmento;
          caminhoDefault.push({ path: caminhoAtual, label: rotulo });
        }
      }

      setCaminho(caminhoDefault);
    };

    gerarCaminho();
  }, [location.pathname]);

  return caminho;
};

export default useBreadcrumbs;


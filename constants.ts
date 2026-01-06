import { MindMapNode } from "./types";

export const INITIAL_DATA: MindMapNode = {
  id: "root",
  name: "Ferramentas",
  children: [
    {
      id: "1",
      name: "Disparo no WhatsApp",
      children: [
        {
          id: "1-1",
          name: "Tanto para a Lista de Clientes",
          children: [{ id: "1-1-1", name: "Atenção com o bloqueio do WhatsApp!!!!" }]
        },
        { id: "1-2", name: "Quanto para novos clientes através de Lista de Leads." },
      ],
    },
    {
      id: "2",
      name: "Criar Programa de Retenção",
      children: [
        { id: "2-1", name: "EX: Cartão Fidelidade" },
        { id: "2-2", name: "Bonificação para Indicações" },
        {
          id: "2-3",
          name: "Brindes para Aniversariantes",
          children: [
            { id: "2-3-1", name: "Pode ser algum drink, bebida" },
            { id: "2-3-2", name: "Desconto em %" },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "Criar Programa de Avaliação",
      children: [
        {
          id: "3-1",
          name: "Colocar plaquinha QR CODE no caixa ou quando o garçom for à mesa",
          children: [
            {
              id: "3-1-1",
              name: "Dar um brinde: uma coisa que funciona muito bem é: Que tal um docinho para viagem?",
              children: [{ id: "3-1-1-1", name: "Presente" }]
            }
          ]
        },
      ],
    },
    {
      id: "4",
      name: "Social Media",
      children: [
        {
          id: "4-1",
          name: "Alinhado com a Estratégia de Tráfego",
          children: [
            { id: "4-1-1", name: "Criar conteúdo FoodPorn" },
            { id: "4-1-2", name: "Postar Stories Diariamente" },
            { id: "4-1-3", name: "Conteúdos Humanizados muda o jogo." },
            {
              id: "4-1-4",
              name: "Conteúdos UGC",
              children: [
                { id: "4-1-4-1", name: "Conteúdos gerados pelo usuário (cliente) de forma que não pareça anúncio e nem forçado." }
              ]
            },
            {
              id: "4-1-5",
              name: "Incentivar as pessoas a publicarem nos stories, feed.",
              children: [
                { id: "4-1-5-1", name: "Assim criamos um ambiente onde as pessoas não apenas pela comida e sim pelos \"status\" de estar presente gerando efeito manada." }
              ]
            },
          ],
        },
      ],
    },
    {
      id: "5",
      name: "Fotografia e Video Profissional",
      children: [
        {
          id: "5-1",
          name: "Dependendo do Ticket Médio do restaurante as fotos e videos tem que ter alta qualidade.",
          children: [
            { id: "5-1-1", name: "EX: Restaurante que vende pratos à partir de R$150,00 a comunicação tem que condizer com a sofisticação do Restaurante." }
          ]
        },
        { id: "5-2", name: "Não necessariamente precisa ser um profissional pra fazer" },
        { id: "5-3", name: "DICA EXTRA: Vídeos que mostra queijo sendo puxado, suculência, foodporn, mexendo na comida, dá muito certo." },
        { id: "5-4", name: "Tenta humanizar sempre com pessoas." },
      ],
    },
    {
      id: "6",
      name: "Influenciadores",
      children: [
        {
          id: "6-1",
          name: "A utilização de influenciadores pode ser usado tanto na parte orgânica quanto nos anúncios",
          children: [
            { id: "6-1-1", name: "Procurar influenciadores e microinfluenciadores que faz video mostrando a casa, ambiente, estilo este:" }
          ]
        },
      ],
    },
    {
      id: "7",
      name: "Automação de respostas Instagram",
      children: [
        { id: "7-1", name: "Caso não tenha ninguém para responder" },
        { id: "7-2", name: "Muito bom para gerar engajamento nos posts." },
      ],
    },
    {
      id: "8",
      name: "Google Meu Negócio",
      children: [
        {
          id: "8-1",
          name: "Isso muda o jogo de Restaurantes",
          children: [
            { id: "8-1-1", name: "Otimização do nome do Restaurante" },
            { id: "8-1-2", name: "Adição de fotos com estratégia em SEO" },
            { id: "8-1-3", name: "Captação de Avaliações" },
            { id: "8-1-4", name: "Resposta de Avaliações com inserções de palavras-chaves" },
            { id: "8-1-5", name: "Postagem semanal dentro do Perfil" },
            { id: "8-1-6", name: "Adição de Perguntas Frequentes" },
          ]
        },
      ],
    },
    {
      id: "9",
      name: "Tripadvisor",
      children: [
        { id: "9-1", name: "Pessoas pesquisam sobre bons restaurantes e la tem classificação dos melhores para o cliente (ainda funciona muito bem)" },
      ],
    },
    {
      id: "10",
      name: "Mascotes",
      children: [
        { id: "10-1", name: "Definir o mascote principal" },
        {
          id: "10-2",
          name: "Combo Animal Kids",
          children: [
            { id: "10-2-1", name: "Brinquedos ou personalizados para aumentar o ticket e fidelidade" }
          ]
        },
      ],
    },
  ],
};

export const COLORS = [
  "#3b82f6", // blue-500
  "#ef4444", // red-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#06b6d4", // cyan-500
];
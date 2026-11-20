# SOLA — landing page de e-commerce fictício | Portfólio Opus Zero

**Projeto demonstrativo 01 — versão reimaginada.**

A **SOLA** é uma marca **fictícia** de floricultura. Foi criada para mostrar a versatilidade de design e frontend da Opus Zero em um segmento **completamente diferente** do site corporativo Opus Zero: linguagem editorial, composição orgânica, paleta pêssego/coral/vinho/lilás, tipografia serifada e ilustrações botânicas originais.

## Funcionalidades entregues

- Layout responsivo com identidade visual independente.
- Hero com ilustração original em SVG.
- Catálogo de quatro produtos fictícios com filtros `Todos / Coloridos / Delicados`.
- Adição de produtos à sacola demonstrativa, remoção, contador e cálculo de total.
- Montador de presente com escolha de ocasião, paleta e tamanho; prévia e preço atualizados em tempo real.
- Menu para celulares, acessibilidade básica, navegação por teclado no painel da sacola e suporte a preferência por movimento reduzido.
- Botões de compra apenas demonstrativos: **não existe checkout, banco de dados, pagamento, pedido real ou envio de informações pessoais.**

## Tecnologias

HTML5, CSS3 e JavaScript nativo. SVGs próprios e locais para flores e favicon. Sem framework, sem servidor e sem instalação de dependências. Fontes remotas opcionais com alternativas de sistema.

## Como executar

Abra `index.html` diretamente no navegador ou rode dentro desta pasta:

```bash
python -m http.server 8000
```

Em seguida acesse http://localhost:8000.

## Como testar

1. Abra a página no desktop e em um dispositivo móvel.
2. Filtre o catálogo e confirme se os produtos mudam.
3. Adicione um arranjo, abra a sacola e remova um item.
4. Em **Monte um presente**, altere ocasião, paleta e tamanho; observe imagem/valor e adicione à sacola.
5. Abra a sacola e confirme que os totais e a opção de esvaziar funcionam.
6. Navegue usando o teclado e verifique o botão de menu no celular.

## Publicação

Publique **este diretório isoladamente** em um novo projeto do Netlify ou outra hospedagem estática. Não substitua o projeto principal `opuszero.netlify.app`.

Depois de publicar, inclua o link da demonstração no card 01 da seção Laboratório da Opus Zero. Identifique sempre como projeto fictício.

## Estrutura

```text
OpusZero_Portfolio_Demo01_REFEITO/
├── index.html
├── styles.css
├── script.js
├── README.md
├── assets/
│   ├── favicon.svg
│   ├── flores-solar.svg
│   ├── flores-bruma.svg
│   ├── flores-aurora.svg
│   └── flores-jardim.svg
└── previews/
    ├── desktop.png
    └── mobile.png
```

**Autoria:** Opus Zero — laboratório de design e desenvolvimento. Projeto demonstrativo, não é um trabalho realizado para cliente real.

# Insights v2

Esta branch contém a versão revisada da página de Insights do aiB, separada da branch `development` para avaliação e integração pelo time de desenvolvimento.

## Escopo da versão

- hero compacta com identidade do aiBox e gradiente;
- header consistente com o restante do site;
- listagem vertical de publicações;
- paginação com cinco publicações por página;
- páginas individuais com contexto, abordagem, resultados, relevância, limitações e acesso à pesquisa original;
- nove publicações cadastradas.

## Estrutura principal

- `public/insights/index.html`: página de listagem;
- `public/insights/article.html`: template das páginas individuais;
- `public/insights/publications.js`: conteúdo estruturado das publicações;
- `public/insights/insights.css`: estilos da experiência;
- `public/insights/site-shell.css`: integração visual com o site;
- `scripts/build.mjs`: geração das rotas de Insights;
- `scripts/verify.mjs`: verificação das páginas geradas.

## Validação local

```bash
npm run build
npm test
```

Versão de referência publicada: https://aib-landing-page.otavioarcanjo.chatgpt.site/insights/

Esta branch não altera nem substitui a `development` até que o time decida realizar a integração.

# aiB

Site institucional do aiB, com produtos, serviços, pesquisas e contato.

## Desenvolvimento e build

Requer Node.js 24. Não há dependências externas para gerar o site.

```sh
npm run build
npm test
```

O build gera `dist/`. O arquivo `public/aib.html` contém a página inicial, estilos e interações. As páginas dedicadas são geradas pelos módulos em `worker/`. Os vídeos e demais recursos estão em `public/`.

## Vercel

Importe o repositório e publique a branch `development`. A configuração está em `vercel.json`. O endereço dos metadados e do sitemap usa `SITE_URL`, quando definido, ou o domínio de produção informado pela Vercel. Ao conectar um domínio próprio, configure `SITE_URL` com o endereço HTTPS definitivo e faça um novo deploy.

## Contato

O formulário abre o aplicativo de e-mail do visitante com uma mensagem para `contato@aibtech.io`. Não há envio de e-mail por servidor ou armazenamento das mensagens neste site.

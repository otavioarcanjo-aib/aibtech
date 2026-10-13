// Sections are taken from the homepage so both surfaces stay consistent.
function between(html:string, start:string, end:string) {
 const from=html.indexOf(start); const to=html.indexOf(end,from+start.length);
 if(from<0||to<0)throw new Error('Missing shared page section');
 return html.slice(from,to);
}
const papers = [
 {title:'SIMBA: agentes de IA para reflexão e pensamento crítico',authors:'André C. A. Nascimento e colaboradores',year:'2025 · EC-TEL',topic:'AGENTES & APRENDIZAGEM',url:'https://ea-tel.eu/ectel2025/accepted-papers',art:8,description:'Ferramenta para desenhar agentes de IA generativa voltados à aprendizagem reflexiva e ao pensamento crítico.'},
 {title:'Apoio com LLMs e desempenho acadêmico',authors:'André C. A. Nascimento, Rafael Ferreira Mello e colaboradores',year:'2025 · Publicação online',topic:'IA & APRENDIZAGEM',url:'https://link.springer.com/chapter/10.1007/978-3-032-03870-8_26',art:6,description:'Uma investigação sobre apoio à aprendizagem com modelos de linguagem, letramento em IA e conhecimento prévio.'},
 {title:'Escreva Mais: escrita em contextos com poucos recursos',authors:'Rafael Ferreira Mello e colaboradores',year:'2025 · EC-TEL',topic:'ESCRITA & FEEDBACK',url:'https://ea-tel.eu/ectel2025/accepted-papers',art:9,description:'Aplicativo móvel para apoiar o desenvolvimento da escrita em salas de aula com recursos limitados.'},
 {title:'Tutoria: feedback personalizado em escala',authors:'Rafael Ferreira Mello e colaboradores',year:'2025 · EC-TEL',topic:'FEEDBACK & EDUCAÇÃO',url:'https://ea-tel.eu/ectel2025/accepted-papers',art:10,description:'Pesquisa sobre o uso de inteligência artificial para oferecer feedback personalizado em contextos educacionais.'},
 {title:'Educação na era da IA generativa',authors:'Rafael Ferreira Mello e colaboradores',year:'2023 · White paper',topic:'IA GENERATIVA',url:'https://arxiv.org/abs/2309.12332',art:5,description:'Contexto, desenvolvimentos recentes e possibilidades da inteligência artificial generativa na educação.'},
 {title:'IA na avaliação de usabilidade: onde estão os limites?',authors:'Rafael Ferreira Mello e colaboradores',year:'2025 · Pesquisa',topic:'IA & EXPERIÊNCIA',url:'https://arxiv.org/abs/2506.16345',art:7,description:'Comparação entre a identificação de problemas de usabilidade por GPT-4o e por especialistas humanos.'}
];
const script = `(()=>{
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu?.setAttribute('aria-expanded','false');nav?.classList.remove('open')}});
const slides=[...document.querySelectorAll('.slide')],tabs=[...document.querySelectorAll('.product-tab')],hero=document.querySelector('.hero');
if(!slides.length)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),pause=document.querySelector('#carousel-pause');let current=0,paused=reduced.matches,timer,focused=false;
function sync(){clearTimeout(timer);pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'Retomar slides automáticos':'Pausar slides automáticos');pause.querySelector('span').textContent=paused?'▷':'Ⅱ';slides.forEach((s,i)=>{const v=s.querySelector('video');if(v){v.muted=true;if(i===current&&!paused&&!document.hidden&&!reduced.matches)v.play().catch(()=>{});else v.pause()}});if(!paused&&!focused&&!document.hidden)timer=setTimeout(()=>select(current+1),7000)}
function select(i){current=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.hidden=n!==current);tabs.forEach((t,n)=>{t.setAttribute('aria-selected',String(n===current));t.tabIndex=n===current?0:-1});hero.dataset.active=String(current);sync()}
tabs.forEach((t,i)=>{t.addEventListener('click',()=>select(i));t.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=current+1;if(e.key==='ArrowLeft')next=current-1;if(e.key==='Home')next=0;if(e.key==='End')next=slides.length-1;if(next!==undefined){e.preventDefault();select(next);tabs[current].focus()}})});
pause.addEventListener('click',()=>{paused=!paused;sync()});document.querySelector('.slide-prev').addEventListener('click',()=>select(current-1));document.querySelector('.slide-next').addEventListener('click',()=>select(current+1));
hero.addEventListener('focusin',()=>{focused=true;sync()});hero.addEventListener('focusout',()=>{setTimeout(()=>{focused=hero.contains(document.activeElement);sync()},0)});
let touch;hero.addEventListener('touchstart',e=>{touch=e.changedTouches[0]},{passive:true});hero.addEventListener('touchend',e=>{if(!touch)return;const dx=e.changedTouches[0].clientX-touch.clientX,dy=e.changedTouches[0].clientY-touch.clientY;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.5)select(current+(dx<0?1:-1));touch=null},{passive:true});
document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',()=>{paused=reduced.matches;sync()});sync();
})();`;
export function renderContentPage(path:string,home:string,origin:string):string|null {
 if(path!=='/solucoes'&&path!=='/insights')return null;
 const solutions=path==='/solucoes';
 const title=solutions?'Produtos e serviços':'Pesquisa que abre possibilidades';
 const description=solutions?'Da primeira pergunta à solução em operação, construímos com você.':'Conhecimento, métodos e tecnologias para ampliar o que podemos fazer com IA.';
 const css=between(home,'<style>','</style>')+'</style>';
 const header=between(home,'<header class="topbar">','<main id="inicio">').replaceAll('href="#','href="/#');
 const products=between(home,'<section class="product-showcase"','<section class="services section"');
 const services=between(home,'<section class="services section"','<section class="specialties section"');
 const specialties=between(home,'<section class="specialties section"','<section class="wrap section" id="insights">');
 const insightSection=between(home,'<section class="wrap section" id="insights">','<div class="contact-shell">');
 const extra=papers.map(p=>`<a class="insight" href="${p.url}" target="_blank" rel="noopener noreferrer"><div class="insight-art"><img src="/brand/module-${p.art}.png" width="180" height="180" alt="" loading="lazy"></div><div class="insight-meta"><span>${p.topic}</span><span>${p.year}</span></div><h3>${p.title}</h3><p class="paper-description">${p.description}</p><p class="paper-authors">${p.authors}</p><span class="text-link">${p.url.includes('accepted-papers')?'Ver pesquisa no evento':'Ler publicação'} <span aria-hidden="true">↗</span></span></a>`).join('');
 const insights=insightSection.replace('</div></section>',extra+'</div></section>');
 const content=(solutions?products+services+specialties:insights).replaceAll('href="#contato"','href="/#contato"');
 return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | aiB</title><meta name="description" content="${description}"><link rel="canonical" href="${origin}${path}"><meta property="og:title" content="${title} | aiB"><meta property="og:description" content="${description}"><meta property="og:url" content="${origin}${path}"><meta property="og:type" content="website"><link rel="icon" href="/brand/bee-night.png"><link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&display=swap" rel="stylesheet">${css}<style>.page-intro{padding-block:85px;background:#10245a;color:white}.page-intro .eyebrow{color:#8fdbf0;margin-bottom:26px}.page-intro h1{font-size:clamp(40px,5.5vw,76px);line-height:1.08;letter-spacing:-.055em;max-width:950px;font-weight:500}.page-intro p{max-width:600px;margin-top:24px;color:#d4ddf1}.paper-description{font-size:14px;line-height:1.7;color:var(--muted);margin-top:16px}.paper-authors{font-size:11px;line-height:1.6;color:var(--muted);margin-top:16px}.insight-grid{row-gap:56px}.insight-meta{flex-wrap:wrap;gap:8px}.page-contact{background:var(--mist);padding-block:64px}.page-contact h2{margin-bottom:28px}.page-footer{padding-block:32px;font-size:12px;display:flex;justify-content:space-between;gap:24px}@media(max-width:760px){.page-intro{padding-block:55px}.page-footer{flex-wrap:wrap}}</style></head><body>${header}<main id="inicio"><section class="page-intro"><div class="wrap"><div class="eyebrow">${solutions?'Soluções':'Insights'}</div><h1>${title}</h1><p>${description}</p></div></section>${content}<section class="page-contact"><div class="wrap"><h2>Vamos construir o futuro juntos?</h2><a class="button" href="/#contato">Vamos conversar <span aria-hidden="true">↗</span></a></div></section></main><footer class="wrap page-footer"><span>© 2026 AIB Technology Solutions.</span><a href="/">Conheça o aiB</a></footer><script>${script}</script></body></html>`;
}

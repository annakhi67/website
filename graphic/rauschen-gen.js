// Rauschen generative field: flow lines driven by value noise. Usable in browser and as poster generator.
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function noise2(seed){const r=mulberry(seed),P=new Uint8Array(512),G=[];for(let i=0;i<256;i++)P[i]=i;for(let i=255;i>0;i--){const j=Math.floor(r()*(i+1));[P[i],P[j]]=[P[j],P[i]]}for(let i=0;i<256;i++){P[i+256]=P[i];const a=r()*Math.PI*2;G.push([Math.cos(a),Math.sin(a)])}
 const f=t=>t*t*t*(t*(t*6-15)+10);return(x,y)=>{const X=Math.floor(x)&255,Y=Math.floor(y)&255;x-=Math.floor(x);y-=Math.floor(y);const g=(i,j,dx,dy)=>{const v=G[P[P[i]+j]%256];return v[0]*dx+v[1]*dy};
 const u=f(x),v=f(y);const a=g(X,Y,x,y),b=g(X+1,Y,x-1,y),c=g(X,Y+1,x,y-1),d=g(X+1,Y+1,x-1,y-1);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v}}
function rauschen(ctx,W,H,o){const n=noise2(o.seed),r=mulberry(o.seed+7);ctx.fillStyle=o.bg;ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation='lighter';
 const sc=o.scale||0.0018,N=o.lines||2600,steps=o.steps||90,sl=o.step||4;
 for(let i=0;i<N;i++){let x=r()*W,y=r()*H;const t=r();const col=o.cols[Math.floor(t*o.cols.length)];ctx.strokeStyle=col;ctx.globalAlpha=o.alpha||0.10;ctx.lineWidth=o.lw||1.4;ctx.beginPath();ctx.moveTo(x,y);
  for(let s=0;s<steps;s++){const a=n(x*sc,y*sc)*Math.PI*(o.turn||3)+(o.bias||0);x+=Math.cos(a)*sl;y+=Math.sin(a)*sl;ctx.lineTo(x,y)}ctx.stroke()}
 ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1}
if(typeof module!=='undefined')module.exports={rauschen};

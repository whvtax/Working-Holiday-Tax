/* eslint-disable */
// @ts-nocheck
// src/lib/useFireworks.ts
// ──────────────────────────────────────────────────────────────────────────
// Form-success celebration fireworks. Extracted verbatim from the previous
// inline <script> in the *-form FormClients so it now runs as bundled JS inside
// a useEffect. Two wins:
//   1. CSP-safe: no inline executable <script>, so a nonce/strict-dynamic CSP
//      (CSP_NONCE_ENABLED) does not block it.
//   2. No leak: the window 'resize' listener + animation frame + timers are
//      cleaned up on unmount (the old inline version never removed them).
// Render a <canvas id="fw-canvas" className="fireworks-canvas" /> and call
// useFireworks(submitted) from the component.
// ──────────────────────────────────────────────────────────────────────────
import { useEffect } from 'react'

export function useFireworks(active: boolean): void {
  useEffect(() => {
    if (!active) return
    if (typeof window === 'undefined') return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let _raf = 0
    const _timers = []
    let onResize = null

      var c=document.getElementById('fw-canvas');
      if(!c)return;
      var ctx=c.getContext('2d');
      var W=c.width=window.innerWidth,H=c.height=window.innerHeight;
      onResize=function(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;};
        window.addEventListener('resize',onResize);
      var particles=[];
      var trails=[];
      var colors=['#FFD700','#FF6B35','#FF6B6B','#E91E8C','#4ECDC4','#45B7D1','#7C4DFF','#00E676','#FFEA00','#FF1744','#00BCD4','#76FF03','#FF9800','#E040FB','#00BFA5'];
      function Particle(x,y,color,type){
        this.x=x; this.y=y; this.color=color; this.type=type||'circle';
        this.r=Math.random()*5+2;
        var angle=Math.random()*Math.PI*2;
        var speed=Math.random()*13+4;
        this.vx=Math.cos(angle)*speed;
        this.vy=Math.sin(angle)*speed-5;
        this.alpha=1;
        this.gravity=0.2;
        this.spin=Math.random()*0.4-0.2;
        this.rot=Math.random()*Math.PI*2;
        this.trail=[];
      }
      Particle.prototype.update=function(){
        this.trail.push({x:this.x,y:this.y,a:this.alpha});
        if(this.trail.length>6)this.trail.shift();
        this.x+=this.vx; this.y+=this.vy;
        this.vy+=this.gravity;
        this.vx*=0.97;
        this.alpha-=0.012;
        this.rot+=this.spin;
      };
      Particle.prototype.draw=function(){
        for(var t=0;t<this.trail.length;t++){
          var tr=this.trail[t];
          ctx.save();ctx.globalAlpha=tr.a*0.3*(t/this.trail.length);
          ctx.fillStyle=this.color;
          ctx.beginPath();ctx.arc(tr.x,tr.y,this.r*0.5,0,Math.PI*2);ctx.fill();
          ctx.restore();
        }
        ctx.save(); ctx.globalAlpha=Math.max(0,this.alpha);
        ctx.fillStyle=this.color;
        ctx.translate(this.x,this.y); ctx.rotate(this.rot);
        if(this.type==='star'){
          ctx.beginPath();
          for(var i=0;i<5;i++){
            ctx.lineTo(Math.cos((18+i*72)*Math.PI/180)*this.r, -Math.sin((18+i*72)*Math.PI/180)*this.r);
            ctx.lineTo(Math.cos((54+i*72)*Math.PI/180)*this.r*0.4, -Math.sin((54+i*72)*Math.PI/180)*this.r*0.4);
          }
          ctx.closePath(); ctx.fill();
        } else if(this.type==='spark'){
          ctx.fillRect(-this.r*2.5,-this.r*0.4,this.r*5,this.r*0.8);
        } else if(this.type==='ring'){
          ctx.strokeStyle=this.color;ctx.lineWidth=2;
          ctx.beginPath();ctx.arc(0,0,this.r,0,Math.PI*2);ctx.stroke();
        } else {
          ctx.beginPath(); ctx.arc(0,0,this.r,0,Math.PI*2); ctx.fill();
        }
        ctx.restore();
      };
      function Trail(x,y,tx,ty,color){
        this.x=x;this.y=y;this.tx=tx;this.ty=ty;this.color=color;
        this.progress=0;this.speed=0.06;
      }
      Trail.prototype.update=function(){this.progress=Math.min(1,this.progress+this.speed);};
      Trail.prototype.draw=function(){
        var cx=this.x+(this.tx-this.x)*this.progress;
        var cy=this.y+(this.ty-this.y)*this.progress;
        ctx.save();ctx.strokeStyle=this.color;ctx.lineWidth=2;
        ctx.globalAlpha=1-this.progress;
        ctx.beginPath();ctx.moveTo(this.x,this.y);ctx.lineTo(cx,cy);ctx.stroke();
        ctx.restore();
        if(this.progress>=1){
          burst(this.tx,this.ty);return true;
        }
        return false;
      };
      function burst(x,y){
        var count=110;
        var types=['circle','circle','circle','star','star','spark','ring'];
        for(var i=0;i<count;i++){
          var type=types[Math.floor(Math.random()*types.length)];
          particles.push(new Particle(x,y,colors[Math.floor(Math.random()*colors.length)],type));
        }
      }
      var shots=0; var maxShots=16; var shotInterval=280;
      function fireRandom(){
        if(shots>=maxShots)return;
        var tx=Math.random()*W*0.8+W*0.1;
        var ty=Math.random()*H*0.5+H*0.05;
        if(shots<3){
          burst(tx,ty);
        } else {
          trails.push(new Trail(tx,H,tx,ty,colors[Math.floor(Math.random()*colors.length)]));
        }
        shots++;
        if(shots<maxShots) _timers.push(setTimeout(fireRandom, shotInterval));
      }
      _timers.push(setTimeout(fireRandom, 60));
      function loop(){
        ctx.clearRect(0,0,W,H);
        trails=trails.filter(function(tr){return !tr.update()&&(tr.draw(),true)||(tr.draw(),false);});
        particles=particles.filter(function(p){return p.alpha>0;});
        particles.forEach(function(p){p.update();p.draw();});
        if(particles.length>0||shots<maxShots||trails.length>0) _raf=requestAnimationFrame(loop);
      }
      loop();

    return () => {
      if (_raf) cancelAnimationFrame(_raf)
      _timers.forEach(function(t){ clearTimeout(t) })
      if (onResize) window.removeEventListener('resize', onResize)
    }
  }, [active])
}

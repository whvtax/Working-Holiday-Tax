'use client';
// The Atlas globe: a slowly turning sphere drawn per pixel on a canvas from a
// painted equirectangular texture. Decorative. Pauses off screen and stops
// under reduced motion. Source: the approved Atlas dashboard (decision 014).
import { useEffect, useRef } from 'react';
import { LAND } from './land';

const TILT = 0.35;
const CAN = 520; // canvas pixels
const R = 252; // sphere radius in canvas pixels
const C = 260; // sphere centre in canvas pixels
const TW = 1440; // texture width
const TH = 720; // texture height
const PERIOD_MS = 14000;

function paintTexture(): Uint8ClampedArray | null {
  const tex = document.createElement('canvas');
  tex.width = TW;
  tex.height = TH;
  const t = tex.getContext('2d');
  if (!t) return null;
  const tx = (lo: number) => ((lo + 180) / 360) * TW;
  const ty = (la: number) => ((90 - la) / 180) * TH;
  t.fillStyle = '#EEF2F6';
  t.fillRect(0, 0, TW, TH);
  t.fillStyle = '#A9C8EE';
  for (const poly of LAND) {
    t.beginPath();
    poly.forEach(([lo, la], i) => {
      if (i) t.lineTo(tx(lo), ty(la));
      else t.moveTo(tx(lo), ty(la));
    });
    t.closePath();
    t.fill();
  }
  t.strokeStyle = 'rgba(18,22,31,0.14)';
  t.lineWidth = 3;
  for (let lo = -180; lo <= 180; lo += 30) {
    t.beginPath();
    t.moveTo(tx(lo), 0);
    t.lineTo(tx(lo), TH);
    t.stroke();
  }
  for (let la = -60; la <= 60; la += 30) {
    t.beginPath();
    t.moveTo(0, ty(la));
    t.lineTo(TW, ty(la));
    t.stroke();
  }
  return t.getImageData(0, 0, TW, TH).data;
}

export default function Globe() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = ref.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    const tex = paintTexture();
    if (!ctx || !tex) return;

    const ct = Math.cos(TILT);
    const st = Math.sin(TILT);
    const N = CAN * CAN;
    const inside = new Uint8Array(N);
    const uBase = new Int32Array(N);
    const vRow = new Int32Array(N);
    const shade = new Float32Array(N);
    const img = ctx.createImageData(CAN, CAN);
    const out = img.data;

    for (let py = 0; py < CAN; py++) {
      const Y2 = (C - py) / R;
      for (let px = 0; px < CAN; px++) {
        const i = py * CAN + px;
        const X = (px - C) / R;
        const r2 = X * X + Y2 * Y2;
        if (r2 >= 1) {
          out[i * 4 + 3] = 0;
          continue;
        }
        inside[i] = 1;
        const Z2 = Math.sqrt(1 - r2);
        const Y = Y2 * ct + Z2 * st;
        const Zc = -Y2 * st + Z2 * ct;
        const lat = Math.asin(Math.max(-1, Math.min(1, Y)));
        const lon0 = Math.atan2(X, Zc);
        let u0 = Math.floor(((lon0 + Math.PI) / (2 * Math.PI)) * TW);
        u0 = ((u0 % TW) + TW) % TW;
        let v = Math.floor(((Math.PI / 2 - lat) / Math.PI) * TH);
        if (v >= TH) v = TH - 1;
        if (v < 0) v = 0;
        uBase[i] = u0;
        vRow[i] = v * TW;
        shade[i] = 0.78 + 0.22 * Z2;
      }
    }

    const draw = (rot: number) => {
      const shift = Math.round((rot / (2 * Math.PI)) * TW);
      for (let i = 0; i < N; i++) {
        if (!inside[i]) continue;
        const u = (((uBase[i] - shift) % TW) + TW) % TW;
        const tt = (vRow[i] + u) * 4;
        const s = shade[i];
        const o = i * 4;
        out[o] = tex[tt] * s;
        out[o + 1] = tex[tt + 1] * s;
        out[o + 2] = tex[tt + 2] * s;
        out[o + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    };

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduce = mq.matches;
    let running = true;
    let last = 0;
    let raf = 0;
    const start = performance.now();

    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver((entries) => {
            running = entries[0].isIntersecting;
          })
        : null;
    io?.observe(cvs);

    const onMotionChange = (e: MediaQueryListEvent) => {
      reduce = e.matches;
      if (reduce) draw(0);
    };
    mq.addEventListener('change', onMotionChange);

    draw(0);
    const frame = (now: number) => {
      if (!reduce && running && now - last >= 33) {
        last = now;
        draw(((now - start) / PERIOD_MS) * 2 * Math.PI);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      mq.removeEventListener('change', onMotionChange);
    };
  }, []);

  return <canvas ref={ref} width={CAN} height={CAN} aria-hidden="true" />;
}

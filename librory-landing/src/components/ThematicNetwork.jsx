import React, { useRef, useEffect } from 'react';

export default function ThematicNetwork() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, active: false, draggedNode: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height, frameId;

    const colors = { book: '#A87658', theme: '#6E8A7F', note: '#C9B07F' };
    const nodes = [
      { label: 'Grief & Mourning', type: 'theme', x: 0.28, y: 0.34, r: 24 },
      { label: 'Radical Hope', type: 'theme', x: 0.64, y: 0.28, r: 22 },
      { label: 'Productive Solitude', type: 'theme', x: 0.58, y: 0.68, r: 22 },
      { label: 'The Bell Jar', type: 'book', x: 0.18, y: 0.53, r: 15 },
      { label: 'Circe', type: 'book', x: 0.39, y: 0.18, r: 15 },
      { label: 'Briefly Gorgeous', type: 'book', x: 0.42, y: 0.48, r: 15 },
      { label: 'Piranesi', type: 'book', x: 0.77, y: 0.52, r: 15 },
      { label: 'Quiet Atrium', type: 'note', x: 0.77, y: 0.22, r: 11 },
      { label: 'Return to Dust', type: 'note', x: 0.28, y: 0.76, r: 11 },
      { label: 'Warm Light', type: 'note', x: 0.47, y: 0.82, r: 11 }
    ].map(n => ({ ...n, vx: 0, vy: 0, _init: false }));

    const links = [
      [0, 3], [0, 5], [0, 8], [1, 2], [1, 4], [1, 6], [1, 7],
      [2, 5], [2, 6], [2, 9], [3, 5], [4, 7], [5, 8], [6, 7]
    ];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width; height = rect.height;
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes.forEach(n => {
        if (!n._init) {
          n.x *= width; n.y *= height; n._init = true;
        }
      });
    }

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      links.forEach(([a, b]) => {
        const na = nodes[a], nb = nodes[b];
        const dx = nb.x - na.x; const dy = nb.y - na.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (dist - 120) * 0.0003;
        if (na !== mouse.draggedNode) { na.vx += dx * force; na.vy += dy * force; }
        if (nb !== mouse.draggedNode) { nb.vx -= dx * force; nb.vy -= dy * force; }

        ctx.beginPath(); ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = 'rgba(128,103,82,0.15)'; ctx.lineWidth = 1.2; ctx.stroke();
      });

      nodes.forEach((n, i) => {
        if (n !== mouse.draggedNode) {
          n.vx += Math.sin(Date.now() / 1500 + i) * 0.01;
          n.vy += Math.cos(Date.now() / 1600 + i) * 0.01;
          n.vx += (width / 2 - n.x) * 0.00005;
          n.vy += (height / 2 - n.y) * 0.00005;

          if (mouse.x !== null) {
            const dx = mouse.x - n.x, dy = mouse.y - n.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) { n.vx += dx * 0.00045; n.vy += dy * 0.00045; }
          }

          n.x += n.vx; n.y += n.vy;
          n.vx *= 0.94; n.vy *= 0.94;

          if (n.x < n.r) { n.x = n.r; n.vx *= -0.5; }
          if (n.x > width - n.r) { n.x = width - n.r; n.vx *= -0.5; }
          if (n.y < n.r) { n.y = n.r; n.vy *= -0.5; }
          if (n.y > height - n.r) { n.y = height - n.r; n.vy *= -0.5; }
        }

        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fill();

        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = colors[n.type]; ctx.globalAlpha = n.type === 'theme' ? 0.9 : 0.8; ctx.fill();
        ctx.globalAlpha = 1;

        ctx.fillStyle = '#221A12'; // Keep a consistent dark ink for canvas text
        ctx.font = n.type === 'theme' ? '600 11px "Libre Franklin"' : '500 10px "Libre Franklin"';
        ctx.textAlign = 'center'; ctx.fillText(n.label, n.x, n.y + 4);
      });

      frameId = requestAnimationFrame(animate);
    };

    animate();

    const getCoords = e => {
      const r = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - r.left, y: clientY - r.top };
    };

    const onMove = e => {
      const m = mouseRef.current; const coords = getCoords(e);
      m.x = coords.x; m.y = coords.y;
      if (m.active && m.draggedNode) {
        m.draggedNode.x = m.x; m.draggedNode.y = m.y;
      }
    };

    const onStart = e => {
      const m = mouseRef.current; m.active = true; const coords = getCoords(e);
      m.x = coords.x; m.y = coords.y;
      for (let n of nodes) {
        if (Math.sqrt((m.x - n.x) ** 2 + (m.y - n.y) ** 2) < n.r + 10) {
          m.draggedNode = n; break;
        }
      }
    };

    const onEnd = () => { const m = mouseRef.current; m.active = false; m.draggedNode = null; };

    canvas.addEventListener('mousemove', onMove); canvas.addEventListener('mousedown', onStart);
    window.addEventListener('mouseup', onEnd);
    canvas.addEventListener('touchmove', onMove, { passive: true }); canvas.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd);

    return () => {
      cancelAnimationFrame(frameId); window.removeEventListener('resize', resize);
      window.removeEventListener('mouseup', onEnd); window.removeEventListener('touchend', onEnd);
    };
  }, []);

  return (
    <section className="max-w-page mx-auto px-5 md:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
        
        {/* Text Column */}
        <div className="col-span-1 md:col-span-5 relative">
          <div className="eyebrow mb-6">
            <span className="n-no">N° 04</span> — THEMATIC SYNTHESIS
          </div>
          
          <div className="relative">
            <h2 className="font-display text-h3 md:text-h2 leading-[1.08] tracking-tight mb-5 text-ink">
              Map the unseen threads across your reading life.
            </h2>
            <div className="marginalia absolute -right-8 md:-right-16 -top-4 rotate-[4deg] hidden lg:block text-muted max-w-[8rem]">
              drag the threads.
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-rule my-6">
            <span className="w-12 h-px bg-rule block" />
            <span className="text-accent text-sm">✦</span>
            <span className="w-12 h-px bg-rule block" />
          </div>
          
          <p className="font-serif text-body italic leading-[1.75] mb-8 text-ink-soft">
            Ideas do not exist in separate vacuum chambers. The deep sorrow in a memoir you read last autumn links naturally with the philosophical loneliness in a sci-fi novel you picked up this afternoon. Librory automatically traces core themes and marginal notes, constructing an interactive tapestry of your intellectual journey.
          </p>

          <div className="flex flex-wrap gap-6 font-serif text-caption italic text-ink-soft">
            <div className="flex items-center gap-2"><span>·</span><span>books</span></div>
            <div className="flex items-center gap-2"><span>·</span><span>themes</span></div>
            <div className="flex items-center gap-2"><span>·</span><span>marginalia</span></div>
          </div>
        </div>

        {/* Canvas Frame Column */}
        <div className="col-span-1 md:col-start-7 md:col-span-6">
          <div className="relative border border-rule rounded-[0.3rem] p-[4px] bg-paper shadow-sm transition-colors duration-500">
            <div className="border-t border-b border-rule">
              <div className="relative h-[500px] cursor-grab active:cursor-grabbing bg-[color-mix(in_srgb,var(--paper)_92%,transparent)] overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full block opacity-90 mix-blend-multiply" />
                
                {/* Compass Mark */}
                <svg width="40" height="40" viewBox="0 0 100 100" className="absolute top-4 right-4 text-rule opacity-60 pointer-events-none">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                  <path d="M50 10 L55 45 L90 50 L55 55 L50 90 L45 55 L10 50 L45 45 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                  <text x="50" y="24" fontFamily="Lora, serif" fontSize="10" textAnchor="middle" fill="currentColor">N</text>
                  <text x="50" y="84" fontFamily="Lora, serif" fontSize="10" textAnchor="middle" fill="currentColor">S</text>
                  <text x="76" y="53" fontFamily="Lora, serif" fontSize="10" textAnchor="middle" fill="currentColor">E</text>
                  <text x="24" y="53" fontFamily="Lora, serif" fontSize="10" textAnchor="middle" fill="currentColor">W</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

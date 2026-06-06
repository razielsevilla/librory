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

        ctx.fillStyle = 'var(--ink)';
        ctx.font = n.type === 'theme' ? '600 11px Libre Franklin' : '500 10px Libre Franklin';
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
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-12">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-center">
        <div>
          <div className="font-sans text-[0.7rem] tracking-[0.16em] uppercase font-bold mb-4 text-accent">Thematic Synthesis</div>
          <h2 className="font-display text-3xl md:text-5xl leading-[1.08] tracking-tight mb-5 font-bold text-ink">Map the unseen threads across your reading life.</h2>
          <p className="leading-[1.75] mb-8 text-muted">Ideas do not exist in separate vacuum chambers. The deep sorrow in a memoir you read last autumn links naturally with the philosophical loneliness in a sci-fi novel you picked up this afternoon. Librory automatically traces core themes and marginal notes, constructing an interactive tapestry of your intellectual journey.</p>
          <div className="flex flex-wrap gap-4 font-sans text-[0.74rem] uppercase font-bold tracking-wider">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#A87658]"></span><span>Literature</span></div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#6E8A7F]"></span><span>Central Themes</span></div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#C9B07F]"></span><span>Marginalia Notes</span></div>
          </div>
        </div>
        <div className="border border-line bg-[color-mix(in_srgb,var(--paper)_45%,transparent)] p-3 rounded-[1.3rem] shadow-sm transition-colors">
          <div className="h-[500px] rounded-[1rem] overflow-hidden cursor-grab active:cursor-grabbing border border-line bg-stone-900/[0.02]">
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>
        </div>
      </div>
    </section>
  );
}

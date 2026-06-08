import React, { useEffect, useRef } from 'react';
import type { ThemeId } from '../design/ambient';

interface Node {
  id: string;
  label: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  radius?: number;
}

interface Link {
  source: string | Node;
  target: string | Node;
}

interface CanvasForceGraphProps {
  nodes: Node[];
  links: Link[];
  theme: ThemeId;
  interactive?: boolean;
}

export const CanvasForceGraph: React.FC<CanvasForceGraphProps> = ({ nodes, links, theme, interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const localNodes = nodes.map(n => ({
      ...n, 
      x: n.x ?? Math.random() * width, 
      y: n.y ?? Math.random() * height,
      vx: 0, vy: 0,
      radius: n.radius ?? 5
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const isDark = theme === 'candle' || theme === 'dusk';
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
      
      ctx.beginPath();
      links.forEach(link => {
        const source = localNodes.find(n => n.id === (typeof link.source === 'string' ? link.source : link.source.id));
        const target = localNodes.find(n => n.id === (typeof link.target === 'string' ? link.target : link.target.id));
        if (source && target) {
          ctx.moveTo(source.x!, source.y!);
          ctx.lineTo(target.x!, target.y!);
        }
      });
      ctx.stroke();

      localNodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, node.radius!, 0, 2 * Math.PI);
        ctx.fill();
        
        if (node.radius! > 4) {
          ctx.font = '10px sans-serif';
          ctx.fillText(node.label, node.x! + 10, node.y! + 3);
        }
      });

      if (interactive) {
        localNodes.forEach(node => {
          node.x! += (Math.random() - 0.5) * 0.5;
          node.y! += (Math.random() - 0.5) * 0.5;
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [nodes, links, theme, interactive]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full cursor-crosshair"
    />
  );
};

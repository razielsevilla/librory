import { useMemo } from 'react';
import { useLibraryStore } from '../store/library';
import { PersonaChip } from '../components/PersonaChip';
import { CanvasForceGraph } from '../components/CanvasForceGraph';
import type { PersonaId } from '../domain/types';

export default function InsightsScreen() {
  const settings = useLibraryStore(state => state.settings);
  const updateSettings = useLibraryStore(state => state.updateSettings);

  const personaOrder: PersonaId[] = ['deep-diver', 'cross-pollinator', 'aesthetic-wanderer'];

  const cyclePersona = () => {
    if (!settings) return;
    const currentIndex = personaOrder.indexOf(settings.persona);
    const nextIndex = (currentIndex + 1) % personaOrder.length;
    updateSettings({ persona: personaOrder[nextIndex] });
  };

  const { nodes, links } = useMemo(() => {
    const p = settings?.persona || 'deep-diver';
    const numNodes = p === 'cross-pollinator' ? 40 : p === 'deep-diver' ? 15 : 25;
    const baseNodes = Array.from({ length: numNodes }).map((_, i) => ({
      id: `n${i}`,
      label: i < 5 ? ['Nature', 'Time', 'Memory', 'Light', 'Silence'][i] : '',
      radius: i < 5 ? 12 : Math.random() * 5 + 3
    }));

    const baseLinks = [];
    for (let i = 0; i < numNodes; i++) {
      if (i > 0) {
        baseLinks.push({
          source: `n${i}`,
          target: `n${Math.floor(Math.random() * i)}`
        });
      }
      if (p === 'cross-pollinator' && Math.random() > 0.8) {
        baseLinks.push({
          source: `n${i}`,
          target: `n${Math.floor(Math.random() * numNodes)}`
        });
      }
    }

    return { nodes: baseNodes, links: baseLinks };
  }, [settings?.persona]);

  return (
    <div className="flex flex-col h-full pt-safe animate-in fade-in duration-500 relative">
      <div className="absolute inset-0 z-0 opacity-50">
        <CanvasForceGraph 
          nodes={nodes} 
          links={links} 
          theme={settings?.theme as any || 'paper'} 
          interactive={true} 
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between h-full p-6 pb-24 pointer-events-none">
        <div className="w-full pointer-events-auto">
          <div className="flex justify-between items-start">
            <div>
              <span className="eyebrow mb-2">Semantic Threads</span>
              <h1 className="font-display text-4xl text-[var(--ink)] drop-shadow-md">
                Insights
              </h1>
            </div>
            
            <PersonaChip 
              persona={settings?.persona || 'deep-diver'} 
              onClick={cyclePersona} 
            />
          </div>
        </div>

        <div className="bg-[var(--paper)]/90 backdrop-blur-md p-6 rounded-xl border border-[var(--border)] max-w-sm pointer-events-auto shadow-lg">
          <p className="font-serif italic text-[var(--ink)] leading-relaxed">
            {settings?.persona === 'deep-diver' 
              ? "You linger in worlds, savoring their depths before moving on."
              : settings?.persona === 'cross-pollinator'
                ? "Your reading bounces between genres, weaving unexpected connections."
                : "You seek beauty and prose, following the aesthetic resonance."}
          </p>
        </div>
      </div>
    </div>
  );
}

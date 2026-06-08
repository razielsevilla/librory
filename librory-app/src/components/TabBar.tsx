import React from 'react';
import { NavLink } from 'react-router-dom';
import { Flame, BookOpen, Camera, Sparkles, Settings2 } from 'lucide-react';
import { clsx } from 'clsx';

export const TabBar: React.FC = () => {
  const tabs = [
    { to: '/', label: 'Hearth', icon: Flame },
    { to: '/shelf', label: 'Shelf', icon: BookOpen },
    { to: '/scanner', label: 'Scan', icon: Camera },
    { to: '/insights', label: 'Insights', icon: Sparkles },
    { to: '/settings', label: 'Settings', icon: Settings2 },
  ];

  return (
    <nav className="absolute bottom-0 w-full h-20 bg-[var(--paper-deep)] border-t border-[var(--rule)] flex justify-around items-center px-6 pb-4 pt-2 z-40 transition-colors duration-700 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] pb-safe">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              clsx(
                "flex flex-col items-center gap-1 transition-all duration-300",
                isActive ? "text-[var(--accent)] transform scale-110" : "text-[var(--muted)] hover:text-[var(--accent)]"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={clsx("w-6 h-6", !isActive && "opacity-80")} strokeWidth={isActive ? 2.5 : 2} />
                <span className={clsx("text-[8px] font-sans tracking-widest uppercase transition-opacity", isActive ? "opacity-100 font-bold" : "opacity-0")}>
                  {tab.label}
                </span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

export const TabBar: React.FC = () => {
  const tabs = [
    { to: '/', label: 'Hearth', icon: 'fa-solid fa-fire-flame-curved' },
    { to: '/shelf', label: 'Shelf', icon: 'fa-solid fa-book-bookmark' },
    { to: '/scanner', label: 'Sync Spines', icon: 'fa-solid fa-qrcode' },
    { to: '/insights', label: 'Threads', icon: 'fa-solid fa-circle-nodes' },
    { to: '/settings', label: 'Settings', icon: 'fa-solid fa-sliders' },
  ];

  return (
    <nav className="absolute bottom-0 inset-x-0 h-20 bg-[var(--paper-deep)] border-t border-[var(--rule)] flex items-center justify-around px-2 z-40 select-none pb-safe">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            clsx(
              "flex flex-col items-center justify-center gap-1 flex-1 h-full font-sans text-[9px] font-semibold transition-all duration-300",
              isActive 
                ? "text-[var(--accent)] opacity-100" 
                : "text-[var(--muted)] opacity-75 hover:opacity-100"
            )
          }
        >
          <i className={clsx(tab.icon, "text-base")}></i>
          <span className="tracking-wider mt-0.5">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

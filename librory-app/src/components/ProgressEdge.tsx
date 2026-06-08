import React from 'react';

interface ProgressEdgeProps {
  page: number;
  totalPages: number;
  editable: boolean;
  onChange?: (page: number) => void;
}

export const ProgressEdge: React.FC<ProgressEdgeProps> = ({ page, totalPages, editable, onChange }) => {
  const percent = Math.min(100, Math.max(0, (page / totalPages) * 100)) || 0;

  return (
    <div className="relative w-full h-10 flex items-center group">
      <div 
        className="absolute inset-0 rounded-sm opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, var(--ink) 2px, var(--ink) 4px)'
        }}
      />
      
      <div className="relative w-full h-full">
        <div 
          className="absolute top-0 bottom-0 w-4 shadow-md transition-all pointer-events-none z-10"
          style={{ 
            left: `calc(${percent}% - 8px)`,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 90%, 0 100%)',
            backgroundColor: 'var(--ember)'
          }}
        />

        {editable && onChange && (
          <input
            type="range"
            min={0}
            max={totalPages}
            value={page}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          />
        )}
      </div>
    </div>
  );
};

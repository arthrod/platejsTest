'use client';

import React from 'react';

import { cn } from '@udecode/cn';

interface RulerProps {
  className?: string;
  marginLeft?: number;
  marginRight?: number;
  showMargins?: boolean;
  unit?: 'cm' | 'in' | 'px';
  width?: number;
}

export function Ruler({
  className,
  marginLeft = 64,
  marginRight = 64,
  showMargins = true,
  unit = 'px',
  width = 800,
}: RulerProps) {
  // Adjust scale for better visibility
  const rulerScale = unit === 'px' ? 100 : unit === 'in' ? 96 : 37.8; // pixels per unit
  const minorScale = rulerScale / 10; // For minor tick marks
  const totalMarks = Math.ceil(width / rulerScale);
  const totalMinorMarks = Math.ceil(width / minorScale);

  const formatLabel = (index: number) => {
    if (unit === 'px') return (index * rulerScale).toString();
    if (unit === 'in') return index.toString();
    if (unit === 'cm') return index.toString();
    return index.toString();
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden border-b border-gray-300 bg-gray-100 select-none',
        className
      )}
    >
      <div
        className="relative h-8 bg-gradient-to-b from-gray-50 to-gray-100"
        style={{ width: Math.max(width, 400) }}
      >
        {/* Margin indicators */}
        {showMargins && (
          <>
            <div
              className="absolute top-0 bottom-0 bg-blue-200 opacity-30"
              style={{ left: 0, width: marginLeft }}
            />
            <div
              className="absolute top-0 bottom-0 bg-blue-200 opacity-30"
              style={{ right: 0, width: marginRight }}
            />
          </>
        )}

        {/* Minor tick marks */}
        {Array.from({ length: totalMinorMarks + 1 }, (_, index) => (
          <div
            key={`minor-${index}`}
            className="absolute top-4 w-px bg-gray-400"
            style={{
              height: '8px',
              left: index * minorScale,
            }}
          />
        ))}

        {/* Major ruler marks */}
        {Array.from({ length: totalMarks + 1 }, (_, index) => (
          <div key={`major-${index}`} className="absolute top-0 bottom-0">
            <div
              className="absolute top-0 w-px bg-gray-700"
              style={{
                height: '100%',
                left: index * rulerScale,
              }}
            />
            <span
              className="absolute top-1 -translate-x-1/2 transform font-mono text-xs text-gray-800"
              style={{ left: index * rulerScale }}
            >
              {formatLabel(index)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

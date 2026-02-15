'use client';

import React, { useState } from 'react';

import { FileText, Settings } from 'lucide-react';

import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
// Using simpler HTML elements instead of complex UI components

export interface PageSetupConfig {
  margins: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  orientation: 'landscape' | 'portrait';
  paperSize: 'a4' | 'custom' | 'legal' | 'letter';
  unit: 'cm' | 'in' | 'px';
  height?: number;
  width?: number;
}

interface PageSetupProps {
  config: PageSetupConfig;
  onChange: (config: PageSetupConfig) => void;
  className?: string;
}

const PAPER_SIZES = {
  a4: { height: 29.7, unit: 'cm' as const, width: 21 },
  custom: { height: 11, unit: 'in' as const, width: 8.5 },
  legal: { height: 14, unit: 'in' as const, width: 8.5 },
  letter: { height: 11, unit: 'in' as const, width: 8.5 },
};

export function PageSetup({ className, config, onChange }: PageSetupProps) {
  const [open, setOpen] = useState(false);

  const handlePaperSizeChange = (paperSize: keyof typeof PAPER_SIZES) => {
    const size = PAPER_SIZES[paperSize];
    const newConfig = {
      ...config,
      height: config.orientation === 'landscape' ? size.width : size.height,
      paperSize,
      unit: size.unit,
      width: config.orientation === 'landscape' ? size.height : size.width,
    };
    onChange(newConfig);
  };

  const handleOrientationChange = (orientation: 'landscape' | 'portrait') => {
    const newConfig = {
      ...config,
      height: orientation === 'landscape' ? config.width : config.height,
      orientation,
      width: orientation === 'landscape' ? config.height : config.width,
    };
    onChange(newConfig);
  };

  const handleMarginChange = (
    side: keyof PageSetupConfig['margins'],
    value: number
  ) => {
    onChange({
      ...config,
      margins: {
        ...config.margins,
        [side]: value,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className={className}>
          <Settings className="mr-2 h-4 w-4" />
          Page Setup
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Page Setup
          </DialogTitle>
          <DialogDescription>
            Configure page size, orientation, and margins for your document.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="paper-size">
              Paper Size
            </label>
            <select
              id="paper-size"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              value={config.paperSize}
              onChange={(e) =>
                handlePaperSizeChange(
                  e.target.value as keyof typeof PAPER_SIZES
                )
              }
            >
              <option value="letter">Letter (8.5" × 11")</option>
              <option value="a4">A4 (21cm × 29.7cm)</option>
              <option value="legal">Legal (8.5" × 14")</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="orientation">
              Orientation
            </label>
            <select
              id="orientation"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              value={config.orientation}
              onChange={(e) =>
                handleOrientationChange(
                  e.target.value as 'landscape' | 'portrait'
                )
              }
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>

          {config.paperSize === 'custom' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="width">
                  Width
                </label>
                <input
                  id="width"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  value={config.width || 8.5}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      width: parseFloat(e.target.value),
                    })
                  }
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="height">
                  Height
                </label>
                <input
                  id="height"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  value={config.height || 11}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      height: parseFloat(e.target.value),
                    })
                  }
                  type="number"
                />
              </div>
            </div>
          )}

          <div className="mt-6">
            <h4 className="mb-4 text-sm font-medium">
              Margins ({config.unit})
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="margin-top">
                  Top
                </label>
                <input
                  id="margin-top"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  value={config.margins.top}
                  onChange={(e) =>
                    handleMarginChange('top', parseFloat(e.target.value))
                  }
                  step="0.1"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="margin-bottom">
                  Bottom
                </label>
                <input
                  id="margin-bottom"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  value={config.margins.bottom}
                  onChange={(e) =>
                    handleMarginChange('bottom', parseFloat(e.target.value))
                  }
                  step="0.1"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="margin-left">
                  Left
                </label>
                <input
                  id="margin-left"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  value={config.margins.left}
                  onChange={(e) =>
                    handleMarginChange('left', parseFloat(e.target.value))
                  }
                  step="0.1"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="margin-right">
                  Right
                </label>
                <input
                  id="margin-right"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  value={config.margins.right}
                  onChange={(e) =>
                    handleMarginChange('right', parseFloat(e.target.value))
                  }
                  step="0.1"
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

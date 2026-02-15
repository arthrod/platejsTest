'use client';

import React from 'react';

import { cn } from '@udecode/cn';

import { type PageSetupConfig, PageSetup } from './page-setup';
import { Ruler } from './ruler';

interface LayoutWrapperProps {
  children: React.ReactNode;
  config: PageSetupConfig;
  onConfigChange: (config: PageSetupConfig) => void;
  className?: string;
  showPageSetup?: boolean;
  showRuler?: boolean;
}

export function LayoutWrapper({
  children,
  className,
  config,
  showPageSetup = true,
  showRuler = true,
  onConfigChange,
}: LayoutWrapperProps) {
  // Convert margins based on unit and DPI
  const getDPI = () =>
    config.unit === 'in' ? 96 : config.unit === 'cm' ? 37.8 : 1;
  const dpi = getDPI();

  const marginTopPx = config.margins.top * dpi;
  const marginBottomPx = config.margins.bottom * dpi;
  const marginLeftPx = config.margins.left * dpi;
  const marginRightPx = config.margins.right * dpi;

  const pageWidthPx = (config.width || 8.5) * dpi;
  const pageHeightPx = (config.height || 11) * dpi;

  // Calculate content area dimensions
  const contentWidthPx = pageWidthPx - marginLeftPx - marginRightPx;
  const contentHeightPx = pageHeightPx - marginTopPx - marginBottomPx;

  return (
    <div className={cn('flex h-full flex-col bg-gray-100', className)}>
      {/* Toolbar with Page Setup */}
      {showPageSetup && (
        <div className="relative z-40 flex flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white p-4">
          <div className="flex items-center gap-4">
            <PageSetup onChange={onConfigChange} config={config} />
            <div className="text-sm text-gray-600">
              {config.paperSize.toUpperCase()} • {config.orientation} •{' '}
              {config.unit}
            </div>
          </div>
        </div>
      )}

      {/* Ruler */}
      {showRuler && (
        <div className="z-10 flex flex-shrink-0 justify-center bg-gray-100">
          <Ruler
            marginLeft={marginLeftPx}
            marginRight={marginRightPx}
            showMargins={true}
            unit={config.unit}
            width={pageWidthPx}
          />
        </div>
      )}

      {/* Page Container with proper content containment */}
      <div className="flex-1 overflow-auto bg-gray-100 py-8">
        <div className="flex justify-center">
          <div className="flex flex-col gap-8">
            {/* Single page that contains all content */}
            <div
              className="relative bg-white shadow-lg print:shadow-none"
              style={{
                height: pageHeightPx,
                padding: `${marginTopPx}px ${marginRightPx}px ${marginBottomPx}px ${marginLeftPx}px`,
                width: pageWidthPx,
              }}
            >
              {/* Content area with proper constraints */}
              <div
                className="relative overflow-hidden"
                style={{
                  height: contentHeightPx,
                  overflowWrap: 'break-word',
                  width: contentWidthPx,
                  wordWrap: 'break-word',
                }}
              >
                <div className="h-full w-full [&_.slate-editor]:h-full [&_.slate-editor]:w-full [&_.slate-editor]:max-w-none [&_.slate-editor]:p-0">
                  {children}
                </div>
              </div>

              {/* Page number */}
              <div className="absolute right-4 bottom-2 text-xs text-gray-400 print:text-black">
                Page 1
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Info Footer */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white p-2 text-center text-xs text-gray-500 print:hidden">
        Page Size: {pageWidthPx.toFixed(0)}×{pageHeightPx.toFixed(0)}px |
        Content Area: {contentWidthPx.toFixed(0)}×{contentHeightPx.toFixed(0)}px
        | Margins: {config.margins.top}
        {config.unit} {config.margins.right}
        {config.unit} {config.margins.bottom}
        {config.unit} {config.margins.left}
        {config.unit}
      </div>
    </div>
  );
}

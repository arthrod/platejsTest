'use client';

import React from 'react';

import { FileText, Layout, Ruler, Settings } from 'lucide-react';

import { ToolbarButton } from '@/components/plate-ui/toolbar';
import { useLayoutStore } from '@/lib/layout-store';

export function RulerToggleButton() {
  const { showRuler, toggleRuler } = useLayoutStore();

  return (
    <ToolbarButton
      onClick={toggleRuler}
      pressed={showRuler}
      tooltip="Toggle Ruler"
    >
      <Ruler className="h-4 w-4" />
    </ToolbarButton>
  );
}

export function PageSetupButton() {
  const { showPageSetup, togglePageSetup } = useLayoutStore();

  return (
    <ToolbarButton
      onClick={togglePageSetup}
      pressed={showPageSetup}
      tooltip="Page Setup"
    >
      <Settings className="h-4 w-4" />
    </ToolbarButton>
  );
}

export function LayoutToggleButton() {
  const { layoutMode, toggleLayoutMode } = useLayoutStore();

  return (
    <ToolbarButton
      onClick={toggleLayoutMode}
      pressed={layoutMode === 'page'}
      tooltip={
        layoutMode === 'page' ? 'Switch to Web Layout' : 'Switch to Page Layout'
      }
    >
      <Layout className="h-4 w-4" />
    </ToolbarButton>
  );
}

export function MultiPageToggleButton() {
  const { layoutMode, multiPageMode, toggleMultiPageMode } = useLayoutStore();

  // Only show when in page layout mode
  if (layoutMode !== 'page') {
    return null;
  }

  return (
    <ToolbarButton
      onClick={toggleMultiPageMode}
      pressed={multiPageMode}
      tooltip={multiPageMode ? 'Switch to Single Page' : 'Switch to Multi-Page'}
    >
      <FileText className="h-4 w-4" />
    </ToolbarButton>
  );
}

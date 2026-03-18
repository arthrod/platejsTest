'use client';

import React from 'react';

import { FileText, Layout, Ruler, Settings } from 'lucide-react';

import { ToolbarButton } from '@/components/plate-ui/toolbar';
import { useLayoutStore } from '@/lib/layout-store';

export function RulerToggleButton() {
  // Use individual selectors to prevent unnecessary component re-renders
  // Performance impact: Avoids re-rendering when unrelated layout state changes
  const showRuler = useLayoutStore((state) => state.showRuler);
  const toggleRuler = useLayoutStore((state) => state.toggleRuler);

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
  // Use individual selectors to prevent unnecessary component re-renders
  // Performance impact: Avoids re-rendering when unrelated layout state changes
  const showPageSetup = useLayoutStore((state) => state.showPageSetup);
  const togglePageSetup = useLayoutStore((state) => state.togglePageSetup);

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
  // Use individual selectors to prevent unnecessary component re-renders
  // Performance impact: Avoids re-rendering when unrelated layout state changes
  const layoutMode = useLayoutStore((state) => state.layoutMode);
  const toggleLayoutMode = useLayoutStore((state) => state.toggleLayoutMode);

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
  // Use individual selectors to prevent unnecessary component re-renders
  // Performance impact: Avoids re-rendering when unrelated layout state changes
  const layoutMode = useLayoutStore((state) => state.layoutMode);
  const multiPageMode = useLayoutStore((state) => state.multiPageMode);
  const toggleMultiPageMode = useLayoutStore((state) => state.toggleMultiPageMode);

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

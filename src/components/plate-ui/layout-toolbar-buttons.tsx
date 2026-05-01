'use client';

import React from 'react';

import { FileText, Layout, Ruler, Settings } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { ToolbarButton } from '@/components/plate-ui/toolbar';
import { useLayoutStore } from '@/lib/layout-store';

export function RulerToggleButton() {
  // Optimization: useShallow prevents unnecessary re-renders by only updating when selected state changes
  const { showRuler, toggleRuler } = useLayoutStore(
    useShallow((state) => ({
      showRuler: state.showRuler,
      toggleRuler: state.toggleRuler,
    }))
  );

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
  // Optimization: useShallow prevents unnecessary re-renders by only updating when selected state changes
  const { showPageSetup, togglePageSetup } = useLayoutStore(
    useShallow((state) => ({
      showPageSetup: state.showPageSetup,
      togglePageSetup: state.togglePageSetup,
    }))
  );

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
  // Optimization: useShallow prevents unnecessary re-renders by only updating when selected state changes
  const { layoutMode, toggleLayoutMode } = useLayoutStore(
    useShallow((state) => ({
      layoutMode: state.layoutMode,
      toggleLayoutMode: state.toggleLayoutMode,
    }))
  );

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
  // Optimization: useShallow prevents unnecessary re-renders by only updating when selected state changes
  const { layoutMode, multiPageMode, toggleMultiPageMode } = useLayoutStore(
    useShallow((state) => ({
      layoutMode: state.layoutMode,
      multiPageMode: state.multiPageMode,
      toggleMultiPageMode: state.toggleMultiPageMode,
    }))
  );

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

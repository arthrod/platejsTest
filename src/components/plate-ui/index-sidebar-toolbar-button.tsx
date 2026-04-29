'use client';

import React from 'react';

import { List } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { ToolbarButton } from '@/components/plate-ui/toolbar';
import { useLayoutStore } from '@/lib/layout-store';

export function IndexSidebarToolbarButton() {
  // Optimization: Use useShallow to prevent unnecessary re-renders when unrelated store properties change.
  const { setShowIndexSidebar, showIndexSidebar } = useLayoutStore(
    useShallow((state) => ({
      setShowIndexSidebar: state.setShowIndexSidebar,
      showIndexSidebar: state.showIndexSidebar,
    }))
  );

  return (
    <ToolbarButton
      onClick={() => setShowIndexSidebar(!showIndexSidebar)}
      pressed={showIndexSidebar}
      tooltip="Toggle Table of Contents"
    >
      <List className="h-4 w-4" />
    </ToolbarButton>
  );
}

'use client';

import React from 'react';

import { List } from 'lucide-react';

import { ToolbarButton } from '@/components/plate-ui/toolbar';
import { useLayoutStore } from '@/lib/layout-store';

export function IndexSidebarToolbarButton() {
  // Use individual selectors to prevent unnecessary re-renders when unrelated store state changes
  const showIndexSidebar = useLayoutStore((state) => state.showIndexSidebar);
  const setShowIndexSidebar = useLayoutStore(
    (state) => state.setShowIndexSidebar
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

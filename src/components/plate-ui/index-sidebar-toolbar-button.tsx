'use client';

import React from 'react';

import { List } from 'lucide-react';

import { ToolbarButton } from '@/components/plate-ui/toolbar';
import { useLayoutStore } from '@/lib/layout-store';

export function IndexSidebarToolbarButton() {
  // ⚡ Bolt: Using individual selectors instead of whole-state destructuring to prevent unnecessary re-renders
  const setShowIndexSidebar = useLayoutStore(
    (state) => state.setShowIndexSidebar
  );
  const showIndexSidebar = useLayoutStore((state) => state.showIndexSidebar);

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

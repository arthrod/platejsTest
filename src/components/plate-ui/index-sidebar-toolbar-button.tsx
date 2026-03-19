'use client';

import React from 'react';

import { List } from 'lucide-react';

import { ToolbarButton } from '@/components/plate-ui/toolbar';
import { useLayoutStore } from '@/lib/layout-store';

export function IndexSidebarToolbarButton() {
  // ⚡ Bolt: Destructuring zustand store state causes the component to re-render
  // whenever ANY state in the store changes. Using individual selectors ensures
  // this component only re-renders when these specific properties change.
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

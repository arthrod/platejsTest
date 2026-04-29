'use client';

import React from 'react';

import { createPlatePlugin } from '@udecode/plate/react';
import { useShallow } from 'zustand/react/shallow';

import { LayoutWrapper } from '@/components/plate-ui/layout-wrapper';
import { MultiPageLayout } from '@/components/plate-ui/multi-page-layout';
import { useLayoutStore } from '@/lib/layout-store';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  // Optimization: Use useShallow to prevent unnecessary re-renders when unrelated store properties change.
  const {
    layoutMode,
    multiPageMode,
    pageConfig,
    setPageConfig,
    showPageSetup,
    showRuler,
  } = useLayoutStore(
    useShallow((state) => ({
      layoutMode: state.layoutMode,
      multiPageMode: state.multiPageMode,
      pageConfig: state.pageConfig,
      setPageConfig: state.setPageConfig,
      showPageSetup: state.showPageSetup,
      showRuler: state.showRuler,
    }))
  );

  // If in web layout mode, just render children without wrapper
  if (layoutMode === 'web') {
    return <>{children}</>;
  }

  // In page layout mode, choose between single and multi-page layout
  const LayoutComponent = multiPageMode ? MultiPageLayout : LayoutWrapper;

  return (
    <LayoutComponent
      onConfigChange={setPageConfig}
      config={pageConfig}
      showPageSetup={showPageSetup}
      showRuler={showRuler}
    >
      {children}
    </LayoutComponent>
  );
}

export const LayoutPlugin = createPlatePlugin({
  key: 'layout',
  render: {
    beforeEditable: ({ children }) => (
      <LayoutProvider>{children}</LayoutProvider>
    ),
  },
});

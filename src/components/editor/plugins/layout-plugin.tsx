'use client';

import React from 'react';

import { createPlatePlugin } from '@udecode/plate/react';

import { LayoutWrapper } from '@/components/plate-ui/layout-wrapper';
import { MultiPageLayout } from '@/components/plate-ui/multi-page-layout';
import { useLayoutStore } from '@/lib/layout-store';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  // ⚡ Bolt: Destructuring zustand store state causes the component to re-render
  // whenever ANY state in the store changes. Using individual selectors ensures
  // this component only re-renders when these specific properties change.
  const layoutMode = useLayoutStore((state) => state.layoutMode);
  const multiPageMode = useLayoutStore((state) => state.multiPageMode);
  const pageConfig = useLayoutStore((state) => state.pageConfig);
  const setPageConfig = useLayoutStore((state) => state.setPageConfig);
  const showPageSetup = useLayoutStore((state) => state.showPageSetup);
  const showRuler = useLayoutStore((state) => state.showRuler);

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

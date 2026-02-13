'use client';

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate } from '@udecode/plate/react';

import { SettingsDialog } from '@/components/editor/settings';
import { useCreateEditor } from '@/components/editor/use-create-editor';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import { EnhancedMultiPageLayout } from '@/components/plate-ui/enhanced-multi-page-layout';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { IndexSidebar } from '@/components/plate-ui/index-sidebar';
import { LayoutWrapper } from '@/components/plate-ui/layout-wrapper';
import { Toolbar } from '@/components/plate-ui/toolbar';
import { useLayoutStore } from '@/lib/layout-store';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const showRuler = useLayoutStore((state) => state.showRuler);
  const showPageSetup = useLayoutStore((state) => state.showPageSetup);
  const layoutMode = useLayoutStore((state) => state.layoutMode);
  const multiPageMode = useLayoutStore((state) => state.multiPageMode);
  const pageConfig = useLayoutStore((state) => state.pageConfig);
  const setPageConfig = useLayoutStore((state) => state.setPageConfig);

  // If in web layout mode, just render children without wrapper
  if (layoutMode === 'web') {
    return <div className="h-full flex-1 overflow-auto">{children}</div>;
  }

  // In page layout mode, choose between single and multi-page layout
  const LayoutComponent = multiPageMode
    ? EnhancedMultiPageLayout
    : LayoutWrapper;

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

function EditorWithLayout() {
  const layoutMode = useLayoutStore((state) => state.layoutMode);

  return (
    <EditorContainer variant={layoutMode === 'page' ? 'default' : 'demo'}>
      <Editor
        variant={layoutMode === 'page' ? 'none' : 'demo'}
        className={
          layoutMode === 'page' ? 'h-full w-full max-w-none p-4' : undefined
        }
      />
    </EditorContainer>
  );
}

export function PlateEditor() {
  const editor = useCreateEditor();
  const showIndexSidebar = useLayoutStore((state) => state.showIndexSidebar);
  const setShowIndexSidebar = useLayoutStore(
    (state) => state.setShowIndexSidebar
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <div className="flex h-full flex-col">
          {/* Fixed Toolbar - always at the top with proper z-index */}
          <div className="relative z-50 flex-shrink-0 border-b border-border bg-background">
            <Toolbar className="w-full justify-between overflow-x-auto bg-background/95 p-1 backdrop-blur-sm supports-backdrop-blur:bg-background/60">
              <FixedToolbarButtons />
            </Toolbar>
          </div>

          {/* Main Content Area with Sidebar */}
          <div className="relative flex flex-1 overflow-hidden">
            {/* Layout Provider - contains ruler and page layout */}
            <div
              className={`flex flex-1 flex-col overflow-hidden transition-all duration-300 ${showIndexSidebar ? 'mr-80' : ''}`}
            >
              <LayoutProvider>
                <EditorWithLayout />
              </LayoutProvider>
            </div>

            {/* Index Sidebar */}
            <IndexSidebar
              onClose={() => setShowIndexSidebar(false)}
              isOpen={showIndexSidebar}
            />
          </div>
        </div>

        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}

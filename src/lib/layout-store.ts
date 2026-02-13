import { create } from 'zustand';

import { PageSetupConfig } from '@/components/plate-ui/page-setup';

interface LayoutState {
  layoutMode: 'page' | 'web';
  multiPageMode: boolean;
  pageConfig: PageSetupConfig;
  showIndexSidebar: boolean;
  showPageSetup: boolean;
  showRuler: boolean;
  setPageConfig: (config: PageSetupConfig) => void;
  setShowIndexSidebar: (show: boolean) => void;
  toggleLayoutMode: () => void;
  toggleMultiPageMode: () => void;
  togglePageSetup: () => void;
  toggleRuler: () => void;
}

const defaultPageConfig: PageSetupConfig = {
  height: 11,
  margins: {
    bottom: 1,
    left: 1,
    right: 1,
    top: 1,
  },
  orientation: 'portrait',
  paperSize: 'letter',
  unit: 'in',
  width: 8.5,
};

export const useLayoutStore = create<LayoutState>((set) => ({
  layoutMode: 'page',
  multiPageMode: false,
  pageConfig: defaultPageConfig,
  showIndexSidebar: false,
  showPageSetup: false,
  showRuler: true,
  setPageConfig: (config) => set({ pageConfig: config }),
  setShowIndexSidebar: (show) => set({ showIndexSidebar: show }),
  toggleLayoutMode: () =>
    set((state) => ({
      layoutMode: state.layoutMode === 'page' ? 'web' : 'page',
    })),
  toggleMultiPageMode: () =>
    set((state) => ({ multiPageMode: !state.multiPageMode })),
  togglePageSetup: () =>
    set((state) => ({ showPageSetup: !state.showPageSetup })),
  toggleRuler: () => set((state) => ({ showRuler: !state.showRuler })),
}));

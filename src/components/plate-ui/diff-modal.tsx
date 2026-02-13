'use client';

import * as React from 'react';

import { GitCompare } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/plate-ui/dialog';
import { DiffView } from '@/components/plate-ui/diff-view';
import { DiffResult } from '@/lib/diff-utils';

interface DiffModalProps {
  diffResult: DiffResult | null;
  isOpen: boolean;
  newLabel: string;
  oldLabel: string;
  onClose: () => void;
}

export function DiffModal({
  diffResult,
  isOpen,
  newLabel,
  oldLabel,
  onClose,
}: DiffModalProps) {
  if (!diffResult) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] max-w-4xl p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5" />
            Version Comparison
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6">
          <DiffView
            onClose={onClose}
            diffResult={diffResult}
            newLabel={newLabel}
            oldLabel={oldLabel}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

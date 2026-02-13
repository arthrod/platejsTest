'use client';

import * as React from 'react';

import { cn } from '@udecode/cn';
import { Change } from 'diff';
import { Eye, EyeOff, GitCompare, X } from 'lucide-react';

import { Button } from '@/components/plate-ui/button';
import { DiffResult } from '@/lib/diff-utils';

interface DiffLineProps {
  change: Change;
  index: number;
}

interface DiffViewProps {
  diffResult: DiffResult;
  newLabel: string;
  oldLabel: string;
  className?: string;
  onClose?: () => void;
}

function DiffLine({ change, index }: DiffLineProps) {
  const getLineClass = () => {
    if (change.added)
      return 'bg-green-50 border-l-4 border-green-400 text-green-800';
    if (change.removed)
      return 'bg-red-50 border-l-4 border-red-400 text-red-800';
    return 'bg-gray-50';
  };

  const getPrefix = () => {
    if (change.added) return '+ ';
    if (change.removed) return '- ';
    return '  ';
  };

  return (
    <div
      key={index}
      className={cn(
        'px-4 py-2 font-mono text-sm whitespace-pre-wrap',
        getLineClass()
      )}
    >
      <span className="mr-2 text-gray-400 select-none">{getPrefix()}</span>
      {change.value}
    </div>
  );
}

export function DiffView({
  className,
  diffResult,
  newLabel,
  oldLabel,
  onClose,
}: DiffViewProps) {
  const [showUnchanged, setShowUnchanged] = React.useState(false);

  const filteredChanges = React.useMemo(() => {
    if (showUnchanged) {
      return diffResult.changes;
    }
    return diffResult.changes.filter(
      (change) => change.added || change.removed
    );
  }, [diffResult.changes, showUnchanged]);

  if (!diffResult.hasChanges) {
    return (
      <div className={cn('rounded-lg border bg-white p-6', className)}>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Comparison</h3>
          </div>
          {onClose && (
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="py-8 text-center">
          <div className="mb-2 text-gray-500">No differences found</div>
          <div className="text-sm text-gray-400">
            The content in both revisions is identical
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('rounded-lg border bg-white', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Comparison</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowUnchanged(!showUnchanged)}
          >
            {showUnchanged ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            {showUnchanged ? 'Hide unchanged' : 'Show unchanged'}
          </Button>
          {onClose && (
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Comparison Info */}
      <div className="border-b bg-gray-50 p-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Comparing:</span>
            <span className="font-medium text-red-600">{oldLabel}</span>
            <span className="text-gray-400">→</span>
            <span className="font-medium text-green-600">{newLabel}</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            {diffResult.addedCount > 0 && (
              <span className="text-green-600">
                +{diffResult.addedCount} added
              </span>
            )}
            {diffResult.removedCount > 0 && (
              <span className="text-red-600">
                -{diffResult.removedCount} removed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Diff Content */}
      <div className="max-h-96 overflow-y-auto">
        {filteredChanges.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No {showUnchanged ? '' : 'changed '}content to display
          </div>
        ) : (
          <div className="divide-y">
            {filteredChanges.map((change, index) => (
              <DiffLine key={index} change={change} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="border-t bg-gray-50 p-4">
        <div className="flex items-center gap-6 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm border-l-2 border-green-400 bg-green-100"></div>
            <span>Added</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm border-l-2 border-red-400 bg-red-100"></div>
            <span>Removed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-gray-100"></div>
            <span>Unchanged</span>
          </div>
        </div>
      </div>
    </div>
  );
}

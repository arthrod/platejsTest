'use client';

import * as React from 'react';

import { cn } from '@udecode/cn';
import { useEditorRef, useEditorValue } from '@udecode/plate/react';
import { cloneDeep } from 'lodash';
import {
  ChevronDown,
  Clock,
  GitBranch,
  GitCompare,
  History,
  Save,
  Trash2,
} from 'lucide-react';

import { Button } from '@/components/plate-ui/button';
import { DiffModal } from '@/components/plate-ui/diff-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/plate-ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/plate-ui/popover';
import { ToolbarButton } from '@/components/plate-ui/toolbar';
import { compareEditorValues, DiffResult } from '@/lib/diff-utils';

interface Revision {
  id: string;
  timestamp: Date;
  value: any;
  label?: string;
}

export function VersionHistoryToolbarButton() {
  const editor = useEditorRef();
  const currentValue = useEditorValue();

  const [revisions, setRevisions] = React.useState<Revision[]>([
    {
      id: '1',
      label: 'Initial version',
      timestamp: new Date(),
      value: [
        {
          children: [{ text: 'Welcome to your editor with version history!' }],
          type: 'p',
        },
      ],
    },
  ]);
  const [selectedRevisionIndex, setSelectedRevisionIndex] =
    React.useState<number>(0);
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);
  const [isDiffModalOpen, setIsDiffModalOpen] = React.useState(false);
  const [currentDiff, setCurrentDiff] = React.useState<{
    diffResult: DiffResult;
    newLabel: string;
    oldLabel: string;
  } | null>(null);

  const selectedRevision = React.useMemo(
    () => revisions[selectedRevisionIndex],
    [revisions, selectedRevisionIndex]
  );

  const saveRevision = () => {
    const newRevision: Revision = {
      id: Date.now().toString(),
      label: `Revision ${revisions.length + 1}`,
      timestamp: new Date(),
      value: cloneDeep(currentValue),
    };
    setRevisions([...revisions, newRevision]);
  };

  const restoreRevision = (revision: Revision) => {
    editor.tf.setValue(cloneDeep(revision.value));
    setIsHistoryOpen(false);
  };

  const deleteRevision = (index: number) => {
    if (revisions.length <= 1) return;

    const newRevisions = revisions.filter((_, i) => i !== index);
    setRevisions(newRevisions);

    if (selectedRevisionIndex >= newRevisions.length) {
      setSelectedRevisionIndex(newRevisions.length - 1);
    } else if (selectedRevisionIndex > index) {
      setSelectedRevisionIndex(selectedRevisionIndex - 1);
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(timestamp);
  };

  const getTextPreview = (value: any) => {
    try {
      if (!value || !Array.isArray(value)) return 'Empty content';

      const extractText = (node: any): string => {
        if (typeof node === 'string') return node;
        if (node.text) return node.text;
        if (node.children && Array.isArray(node.children)) {
          return node.children.map(extractText).join('');
        }
        return '';
      };

      const text = value.map(extractText).join(' ').trim();
      return text.length > 100
        ? text.substring(0, 100) + '...'
        : text || 'Empty content';
    } catch (error) {
      return 'Error reading content';
    }
  };

  const showDiffWithCurrent = (revision: Revision) => {
    const diffResult = compareEditorValues(revision.value, currentValue);
    setCurrentDiff({
      diffResult,
      newLabel: 'Current Version',
      oldLabel:
        revision.label ||
        `Revision ${revisions.findIndex((r) => r.id === revision.id) + 1}`,
    });
    setIsDiffModalOpen(true);
    setIsHistoryOpen(false);
  };

  const showDiffBetweenRevisions = (
    oldRevision: Revision,
    newRevision: Revision
  ) => {
    const diffResult = compareEditorValues(
      oldRevision.value,
      newRevision.value
    );
    const oldIndex = revisions.findIndex((r) => r.id === oldRevision.id);
    const newIndex = revisions.findIndex((r) => r.id === newRevision.id);

    setCurrentDiff({
      diffResult,
      newLabel: newRevision.label || `Revision ${newIndex + 1}`,
      oldLabel: oldRevision.label || `Revision ${oldIndex + 1}`,
    });
    setIsDiffModalOpen(true);
    setIsHistoryOpen(false);
  };

  return (
    <div className="flex items-center gap-1">
      {/* Save Revision Button */}
      <ToolbarButton onClick={saveRevision} tooltip="Save Revision">
        <Save className="h-4 w-4" />
      </ToolbarButton>

      {/* Version History Popover */}
      <Popover open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <PopoverTrigger asChild>
          <ToolbarButton
            pressed={isHistoryOpen}
            tooltip="Version History"
            isDropdown
          >
            <History className="h-4 w-4" />
          </ToolbarButton>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0" align="end">
          <div className="p-4">
            {/* Header */}
            <div className="mb-4 flex items-center gap-2">
              <History className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Version History</h3>
            </div>

            {/* Quick Restore Dropdown */}
            <div className="mb-4 flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <GitBranch className="h-4 w-4" />
                    Quick Restore
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {revisions.map((revision, index) => (
                    <DropdownMenuItem
                      key={revision.id}
                      onClick={() => restoreRevision(revision)}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{revision.label}</span>
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(revision.timestamp)}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Revisions List */}
            <div className="rounded-lg border bg-gray-50">
              <div className="border-b bg-white p-3">
                <h4 className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4" />
                  Saved Revisions ({revisions.length})
                </h4>
              </div>
              <div className="max-h-60 space-y-1 overflow-y-auto p-2">
                {revisions.map((revision, index) => (
                  <div
                    key={revision.id}
                    className={cn(
                      'flex cursor-pointer items-start justify-between rounded border p-3 transition-colors',
                      selectedRevisionIndex === index
                        ? 'border-blue-200 bg-blue-50'
                        : 'bg-white hover:bg-gray-50'
                    )}
                    onClick={() => setSelectedRevisionIndex(index)}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium">
                        {revision.label}
                      </div>
                      <div className="mb-1 text-xs text-gray-500">
                        {formatTimestamp(revision.timestamp)}
                      </div>
                      <div className="truncate text-xs text-gray-600">
                        {getTextPreview(revision.value)}
                      </div>
                    </div>
                    <div className="ml-3 flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs text-purple-600 hover:text-purple-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          showDiffWithCurrent(revision);
                        }}
                        title="Compare with current"
                      >
                        <GitCompare className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs text-blue-600 hover:text-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          restoreRevision(revision);
                        }}
                        title="Restore this version"
                      >
                        <GitBranch className="h-3 w-3" />
                      </Button>
                      {revisions.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-xs text-red-600 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteRevision(index);
                          }}
                          title="Delete this revision"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Revision Preview */}
            {selectedRevision && (
              <div className="mt-4 rounded-lg border">
                <div className="flex items-center gap-2 border-b bg-gray-50 px-3 py-2 text-sm font-medium">
                  <GitBranch className="h-4 w-4" />
                  {selectedRevision.label} (
                  {formatTimestamp(selectedRevision.timestamp)})
                </div>
                <div className="p-3">
                  <div className="max-h-32 min-h-[60px] overflow-y-auto rounded border bg-gray-50 p-3">
                    <div className="text-sm text-gray-700">
                      {getTextPreview(selectedRevision.value)}
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex h-7 items-center gap-1 px-2 text-xs"
                      onClick={() => showDiffWithCurrent(selectedRevision)}
                    >
                      <GitCompare className="h-3 w-3" />
                      Compare
                    </Button>
                    <Button
                      size="sm"
                      className="flex h-7 items-center gap-1 px-2 text-xs"
                      onClick={() => restoreRevision(selectedRevision)}
                    >
                      <GitBranch className="h-3 w-3" />
                      Restore
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Usage Instructions */}
            <div className="mt-4 rounded border bg-blue-50 p-3 text-xs text-gray-600">
              <strong>How to use:</strong> Save revisions as you work to create
              restore points. Use Quick Restore for fast access or browse the
              list to preview and restore any version.
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Diff Modal */}
      <DiffModal
        onClose={() => setIsDiffModalOpen(false)}
        diffResult={currentDiff?.diffResult || null}
        isOpen={isDiffModalOpen}
        newLabel={currentDiff?.newLabel || ''}
        oldLabel={currentDiff?.oldLabel || ''}
      />
    </div>
  );
}

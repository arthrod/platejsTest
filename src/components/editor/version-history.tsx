'use client';

import * as React from 'react';

import { cloneDeep } from 'lodash';
import { Clock, GitBranch, History, Save, Trash2 } from 'lucide-react';

import { Button } from '@/components/plate-ui/button';
import { cn } from '@/lib/utils';

interface Revision {
  id: string;
  timestamp: Date;
  value: any;
  label?: string;
}

interface VersionHistoryProps {
  value: any;
  onChange: (value: any) => void;
  className?: string;
}

export default function VersionHistory({
  className,
  value,
  onChange,
}: VersionHistoryProps) {
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

  const selectedRevision = React.useMemo(
    () => revisions[selectedRevisionIndex],
    [revisions, selectedRevisionIndex]
  );

  const saveRevision = () => {
    const newRevision: Revision = {
      id: Date.now().toString(),
      label: `Revision ${revisions.length + 1}`,
      timestamp: new Date(),
      value: cloneDeep(value),
    };
    setRevisions([...revisions, newRevision]);
  };

  const restoreRevision = (revision: Revision) => {
    onChange(cloneDeep(revision.value));
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

  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-lg border bg-white p-4',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Version History</h2>
        </div>
        <Button
          size="sm"
          className="flex items-center gap-2"
          onClick={saveRevision}
        >
          <Save className="h-4 w-4" />
          Save Revision
        </Button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium" htmlFor="revision-select">
          Compare revision:
        </label>
        <select
          id="revision-select"
          className="rounded border px-3 py-1 text-sm"
          value={selectedRevisionIndex}
          onChange={(e) => setSelectedRevisionIndex(Number(e.target.value))}
        >
          {revisions.map((_, i) => (
            <option key={i} value={i}>
              Revision {i + 1}
            </option>
          ))}
        </select>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => restoreRevision(selectedRevision)}
        >
          <GitBranch className="h-4 w-4" />
          Restore This Version
        </Button>
      </div>

      {/* Revisions List */}
      <div className="rounded-lg border bg-gray-50 p-3">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-medium">
          <Clock className="h-4 w-4" />
          Saved Revisions ({revisions.length})
        </h3>
        <div className="max-h-40 space-y-2 overflow-y-auto">
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
                <div className="text-sm font-medium">{revision.label}</div>
                <div className="mb-1 text-xs text-gray-500">
                  {formatTimestamp(revision.timestamp)}
                </div>
                <div className="truncate text-xs text-gray-600">
                  {getTextPreview(revision.value)}
                </div>
              </div>
              <div className="ml-3 flex gap-1">
                {revisions.length > 1 && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-xs text-red-600 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRevision(index);
                    }}
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
      <div className="rounded-lg border">
        <div className="flex items-center gap-2 border-b bg-gray-50 px-3 py-2 text-sm font-medium">
          <GitBranch className="h-4 w-4" />
          {selectedRevision?.label} (
          {formatTimestamp(selectedRevision?.timestamp || new Date())})
        </div>
        <div className="p-3">
          <div className="min-h-[100px] rounded border bg-gray-50 p-3">
            <div className="text-sm text-gray-700">
              {getTextPreview(selectedRevision?.value)}
            </div>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="rounded border bg-blue-50 p-3 text-xs text-gray-600">
        <strong>How to use:</strong> Save revisions as you work to create
        restore points. Select any revision to preview it. Click "Restore This
        Version" to apply it to your editor.
      </div>
    </div>
  );
}

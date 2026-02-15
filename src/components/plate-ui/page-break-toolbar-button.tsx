'use client';

import React from 'react';

import { useEditorRef } from '@udecode/plate/react';
import { FileText } from 'lucide-react';

import { PAGE_BREAK_KEY } from '@/components/editor/plugins/page-break-plugin';
import { ToolbarButton } from '@/components/plate-ui/toolbar';

export function PageBreakToolbarButton() {
  const editor = useEditorRef();

  const insertPageBreak = () => {
    editor.tf.insertNodes({
      children: [{ text: '' }],
      type: PAGE_BREAK_KEY,
    });
  };

  return (
    <ToolbarButton onClick={insertPageBreak} tooltip="Insert Page Break">
      <FileText className="h-4 w-4" />
    </ToolbarButton>
  );
}

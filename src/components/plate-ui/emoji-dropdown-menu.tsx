'use client';

import React from 'react';

import {
  type EmojiDropdownMenuOptions,
  useEmojiDropdownMenuState,
} from '@udecode/plate-emoji/react';
import { Smile } from 'lucide-react';
import dynamic from 'next/dynamic';

import { emojiCategoryIcons, emojiSearchIcons } from './emoji-icons';
import { EmojiToolbarDropdown } from './emoji-toolbar-dropdown';

// ⚡ Bolt: Lazy load EmojiPicker to reduce initial bundle size
// What: Replaced static import of EmojiPicker with next/dynamic lazy loading
// Why: The EmojiPicker includes heavy dependencies (@emoji-mart/data) that shouldn't block initial page load
// Impact: Reduces initial JS payload by deferring parsing/execution of emoji data until the dropdown is opened
// Measurement: Verify initial bundle size reduction using `pnpm build` and checking the chunks
const EmojiPicker = dynamic(
  () => import('./emoji-picker').then((mod) => mod.EmojiPicker),
  {
    loading: () => (
      <div className="h-[23rem] w-80 rounded-xl border bg-popover shadow-md" />
    ),
  }
);
import { ToolbarButton } from './toolbar';
type EmojiDropdownMenuProps = {
  options?: EmojiDropdownMenuOptions;
} & React.ComponentPropsWithoutRef<typeof ToolbarButton>;

export function EmojiDropdownMenu({
  options,
  ...props
}: EmojiDropdownMenuProps) {
  const { emojiPickerState, isOpen, setIsOpen } =
    useEmojiDropdownMenuState(options);

  return (
    <EmojiToolbarDropdown
      control={
        <ToolbarButton pressed={isOpen} tooltip="Emoji" isDropdown {...props}>
          <Smile />
        </ToolbarButton>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <EmojiPicker
        {...emojiPickerState}
        icons={{
          categories: emojiCategoryIcons,
          search: emojiSearchIcons,
        }}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        settings={options?.settings}
      />
    </EmojiToolbarDropdown>
  );
}

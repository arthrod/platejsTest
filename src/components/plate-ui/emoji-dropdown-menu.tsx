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
import { ToolbarButton } from './toolbar';

// ⚡ Bolt Optimization: Lazy-load the heavy EmojiPicker component to reduce initial bundle size.
// The emoji data and picker UI are only loaded when the user actually opens the dropdown.
// A loading skeleton matching the picker's exact dimensions prevents layout shift.
const EmojiPicker = dynamic(
  () => import('./emoji-picker').then((mod) => mod.EmojiPicker),
  {
    loading: () => (
      <div className="flex h-[23rem] w-80 items-center justify-center rounded-xl border bg-popover shadow-md" />
    ),
  }
);
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

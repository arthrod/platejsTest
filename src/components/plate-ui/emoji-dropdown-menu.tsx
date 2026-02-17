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

// Lazy load the heavy emoji picker to reduce initial bundle size
const EmojiPicker = dynamic(() =>
  import('./emoji-picker').then((mod) => mod.EmojiPicker)
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

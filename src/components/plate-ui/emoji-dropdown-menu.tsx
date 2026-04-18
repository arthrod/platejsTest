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

// Lazy-load the EmojiPicker to prevent shipping the heavy UI component to the initial client bundle
// and avoid SSR hydration mismatches with client-side emoji data.
const EmojiPicker = dynamic(
  () => import('./emoji-picker').then((mod) => mod.EmojiPicker),
  {
    ssr: false,
    loading: () => <div className="h-[23rem] w-80" />,
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

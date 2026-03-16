'use client';

import type { TElement } from '@udecode/plate';

import { CopilotPlugin } from '@udecode/plate-ai/react';
import { serializeMdNodes, stripMarkdown } from '@udecode/plate-markdown';

import { GhostText } from '@/components/plate-ui/ghost-text';

// ⚡ Bolt: Replaced heavy @faker-js/faker dependency with static mock sentences
// to significantly reduce the client-side bundle size.
const MOCK_SENTENCES = [
  'This is a generated suggestion from the copilot.',
  'The quick brown fox jumps over the lazy dog.',
  'Here is another brilliant continuation of your text.',
  'Plate allows you to build rich-text editors easily.',
  'Artificial intelligence is transforming how we write.',
  'Consider adding more details to your previous paragraph.',
  'A well-crafted sentence can make all the difference.',
  'Always measure performance before optimizing.',
];

function getRandomSentence() {
  return MOCK_SENTENCES[Math.floor(Math.random() * MOCK_SENTENCES.length)];
}

export const copilotPlugins = [
  CopilotPlugin.configure(({ api }) => ({
    options: {
      completeOptions: {
        api: '/api/ai/copilot',
        body: {
          system: `You are an advanced AI writing assistant, similar to VSCode Copilot but for general text. Your task is to predict and generate the next part of the text based on the given context.
  
  Rules:
  - Continue the text naturally up to the next punctuation mark (., ,, ;, :, ?, or !).
  - Maintain style and tone. Don't repeat given text.
  - For unclear context, provide the most likely continuation.
  - Handle code snippets, lists, or structured text if needed.
  - Don't include """ in your response.
  - CRITICAL: Always end with a punctuation mark.
  - CRITICAL: Avoid starting a new block. Do not use block formatting like >, #, 1., 2., -, etc. The suggestion should continue in the same block as the context.
  - If no context is provided or you can't generate a continuation, return "0" without explanation.`,
        },
        onError: () => {
          // Mock the API response. Remove it when you implement the route /api/ai/copilot
          // ⚡ Bolt: Using lightweight random sentence picker instead of faker
          api.copilot.setBlockSuggestion({
            text: stripMarkdown(getRandomSentence()),
          });
        },
        onFinish: (_, completion) => {
          if (completion === '0') return;

          api.copilot.setBlockSuggestion({
            text: stripMarkdown(completion),
          });
        },
      },
      debounceDelay: 500,
      renderGhostText: GhostText,
      getPrompt: ({ editor }) => {
        const contextEntry = editor.api.block({ highest: true });

        if (!contextEntry) return '';

        const prompt = serializeMdNodes([contextEntry[0] as TElement]);

        return `Continue the text up to the next punctuation mark:
  """
  ${prompt}
  """`;
      },
    },
  })),
] as const;

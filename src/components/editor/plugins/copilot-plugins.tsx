'use client';

import type { TElement } from '@udecode/plate';

import { CopilotPlugin } from '@udecode/plate-ai/react';
import { serializeMdNodes, stripMarkdown } from '@udecode/plate-markdown';

import { GhostText } from '@/components/plate-ui/ghost-text';

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
          const fallbackSentences = [
            'This is a simulated AI response.',
            'Continuing the sentence as expected.',
            'Here is some generated text from the mock AI.',
            'The AI assistant has provided this placeholder text.',
          ];
          const fallbackText =
            fallbackSentences[
              Math.floor(Math.random() * fallbackSentences.length)
            ];

          // ⚡ Bolt: Replaced @faker-js/faker with a lightweight local mock to eliminate a massive client-side dependency
          api.copilot.setBlockSuggestion({
            text: stripMarkdown(fallbackText),
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

import os

filepath = 'src/components/plate-ui/emoji-dropdown-menu.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add a comment explaining the optimization above the dynamic import
content = content.replace("const EmojiPicker = dynamic(", "/**\n * ⚡ Bolt Performance Optimization\n * Lazy load the EmojiPicker to reduce initial bundle size, as it imports heavy datasets.\n * A placeholder is used to prevent layout shift while the chunk loads.\n */\nconst EmojiPicker = dynamic(")

with open(filepath, 'w') as f:
    f.write(content)

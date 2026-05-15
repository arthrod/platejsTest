import re

with open('src/components/plate-ui/emoji-dropdown-menu.tsx', 'r') as f:
    content = f.read()

print("Original length:", len(content))

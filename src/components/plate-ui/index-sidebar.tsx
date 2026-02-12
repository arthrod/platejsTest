'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@udecode/cn';
import { ChevronDown, ChevronRight, Hash, List, X } from 'lucide-react';

import { Button } from '@/components/plate-ui/button';
import { useHeadings } from '@/hooks/use-headings';

interface HeadingItem {
  id: string;
  children: HeadingItem[];
  element: HTMLElement;
  level: number;
  text: string;
}

interface IndexSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function IndexSidebar({
  className,
  isOpen,
  onClose,
}: IndexSidebarProps) {
  const headings = useHeadings();
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Auto-expand all items when headings change
  useEffect(() => {
    const allIds = new Set<string>();
    const collectIds = (items: HeadingItem[]) => {
      items.forEach((item) => {
        allIds.add(item.id);
        collectIds(item.children);
      });
    };
    collectIds(headings);
    setExpandedItems(allIds);
  }, [headings]);

  // Track active heading based on scroll position
  useEffect(() => {
    const handleScroll = throttle(() => {
      const headingElements = document.querySelectorAll(
        '[data-slate-editor="true"] h1, [data-slate-editor="true"] h2, [data-slate-editor="true"] h3, [data-slate-editor="true"] h4, [data-slate-editor="true"] h5, [data-slate-editor="true"] h6'
      );
      let currentActive: string | null = null;

      headingElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 0) {
          currentActive = element.id;
        }
      });

      setActiveHeading(currentActive);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    // Call immediately without throttle for initial state
    const headingElements = document.querySelectorAll(
      '[data-slate-editor="true"] h1, [data-slate-editor="true"] h2, [data-slate-editor="true"] h3, [data-slate-editor="true"] h4, [data-slate-editor="true"] h5, [data-slate-editor="true"] h6'
    );
    let currentActive: string | null = null;
    headingElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 0) {
        currentActive = element.id;
      }
    });
    setActiveHeading(currentActive);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveHeading(id);
    }
  };

  // Toggle expanded state
  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  // Render heading item
  const renderHeadingItem = (item: HeadingItem, depth = 0) => {
    const isActive = activeHeading === item.id;
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children.length > 0;

    return (
      <div key={item.id} className="select-none">
        <div
          className={cn(
            'flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-sm transition-colors hover:bg-gray-100',
            isActive && 'bg-blue-100 font-medium text-blue-700',
            depth > 0 && 'ml-4'
          )}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          {hasChildren && (
            <Button
              size="sm"
              variant="ghost"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(item.id);
              }}
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </Button>
          )}

          {!hasChildren && <div className="w-4" />}

          <Hash
            className={cn(
              'h-3 w-3 flex-shrink-0',
              item.level === 1 && 'text-blue-600',
              item.level === 2 && 'text-green-600',
              item.level === 3 && 'text-orange-600',
              item.level >= 4 && 'text-gray-600'
            )}
          />

          <span
            className={cn(
              'flex-1 truncate',
              item.level === 1 && 'font-semibold',
              item.level === 2 && 'font-medium'
            )}
            onClick={() => scrollToHeading(item.id)}
            title={item.text}
          >
            {item.text || `Heading ${item.level}`}
          </span>
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-2">
            {item.children.map((child) => renderHeadingItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed top-0 right-0 z-40 flex h-full w-80 flex-col border-l border-gray-200 bg-white shadow-lg',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <List className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Table of Contents</h3>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {headings.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <Hash className="mx-auto mb-2 h-8 w-8 text-gray-300" />
            <p className="text-sm">No headings found</p>
            <p className="mt-1 text-xs text-gray-400">
              Add H1, H2, H3 headings to see them here
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {headings.map((heading) => renderHeadingItem(heading))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 p-4">
        <div className="space-y-1 text-xs text-gray-500">
          <div className="flex items-center justify-between">
            <span>Total headings:</span>
            <span className="font-medium">{headings.length}</span>
          </div>
          <div className="text-gray-400">
            Click headings to navigate • Auto-updates
          </div>
        </div>
      </div>
    </div>
  );
}

function throttle(func: (...args: any[]) => void, limit: number) {
  let inThrottle: boolean;
  let lastArgs: any[] | null = null;

  const run = () => {
    if (lastArgs) {
      func(...lastArgs);
      lastArgs = null;
      inThrottle = true;
      setTimeout(run, limit);
    } else {
      inThrottle = false;
    }
  };

  return function (...args: any[]) {
    if (inThrottle) {
      lastArgs = args;
    } else {
      func(...args);
      inThrottle = true;
      setTimeout(run, limit);
    }
  };
}

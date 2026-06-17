'use client';

import { allCategories, allPlatforms } from '@/data/videos';
import { VideoCategory } from '@/types';

interface FilterBarProps {
  selectedCategory: VideoCategory | '全部';
  onCategoryChange: (category: VideoCategory | '全部') => void;
}

export default function FilterBar({
  selectedCategory,
  onCategoryChange,
}: FilterBarProps) {
  const categories = ['全部', ...allCategories] as const;

  return (
    <div className="flex flex-wrap items-center gap-8">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-accent text-white shadow-lg shadow-accent/25'
                : 'bg-card-bg text-muted hover:text-foreground hover:bg-card-border border border-card-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

// 导出平台列表供外部使用
export { allPlatforms };

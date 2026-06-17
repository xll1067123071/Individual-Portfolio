'use client';

import { useState, useCallback, useMemo } from 'react';
import { videos } from '@/data/videos';
import { VideoProject, VideoCategory } from '@/types';
import FilterBar from './FilterBar';
import VideoCard from './VideoCard';
import VideoModal from './VideoModal';
import ScrollReveal from './ScrollReveal';

const ITEMS_PER_PAGE = 12;

/** 首页优先展示的分类 */
const PRIORITY_CATEGORIES = ['火影', '龙珠', 'JOJO', '水浒项目', '海外'];

/** Fisher-Yates 洗牌 — 真随机，每次页面刷新都会产生不同顺序 */
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function VideoGrid() {
  const [selectedCategory, setSelectedCategory] = useState<
    VideoCategory | '全部'
  >('全部');
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // "全部"时：优先分类先排（打乱），次要分类后排（打乱），切换分类不会重新洗牌
  const shuffledVideos = useMemo(() => {
    const priority = videos.filter((v) =>
      PRIORITY_CATEGORIES.includes(v.category)
    );
    const secondary = videos.filter(
      (v) => !PRIORITY_CATEGORIES.includes(v.category)
    );
    return [...shuffle(priority), ...shuffle(secondary)];
  }, []);

  const filtered =
    selectedCategory === '全部'
      ? shuffledVideos
      : videos.filter((v) => v.category === selectedCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleCategoryChange = useCallback(
    (category: VideoCategory | '全部') => {
      setSelectedCategory(category);
      setVisibleCount(ITEMS_PER_PAGE);
    },
    []
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleSelectVideo = useCallback((video: VideoProject) => {
    setSelectedVideo(video);
  }, []);

  return (
    <section id="works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">作品集</h2>
            <p className="text-muted">
              共 {videos.length} 条买量视频素材，覆盖{' '}
              {new Set(videos.map((v) => v.category)).size} 种类型
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mb-8">
            <FilterBar
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {visible.map((video, index) => (
            <ScrollReveal key={video.id} delay={index * 60} direction="up">
              <VideoCard video={video} onClick={handleSelectVideo} />
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg">该分类下暂无作品</p>
          </div>
        )}

        {/* 加载更多 */}
        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 rounded-xl border border-card-border bg-card-bg text-muted hover:text-foreground hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all text-sm font-medium"
            >
              加载更多（{filtered.length - visibleCount} 条剩余）
            </button>
          </div>
        )}
      </div>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  );
}

'use client';

import { VideoProject } from '@/types';

interface VideoCardProps {
  video: VideoProject;
  onClick: (video: VideoProject) => void;
}

/** 分类渐变色映射 */
const CATEGORY_GRADIENT: Record<string, string> = {
  'AI短剧': 'from-purple-900/80 via-indigo-900/60 to-violet-950/80',
  'AI结合': 'from-teal-900/80 via-cyan-900/60 to-emerald-950/80',
  JOJO: 'from-amber-900/80 via-yellow-900/60 to-orange-950/80',
  '水浒项目': 'from-rose-900/80 via-red-900/60 to-amber-950/80',
  火影: 'from-orange-900/80 via-red-800/60 to-yellow-950/80',
  龙珠: 'from-blue-900/80 via-sky-900/60 to-indigo-950/80',
  海外: 'from-green-900/80 via-emerald-900/60 to-teal-950/80',
};

/** 分类图标 */
const CATEGORY_ICON: Record<string, string> = {
  'AI短剧': '🎬',
  'AI结合': '🤖',
  JOJO: '⚡',
  '水浒项目': '🏯',
  火影: '🍥',
  龙珠: '🐉',
  海外: '🌍',
};

export default function VideoCard({ video, onClick }: VideoCardProps) {
  const gradient = CATEGORY_GRADIENT[video.category] || 'from-gray-900 via-slate-900 to-gray-950';
  const icon = CATEGORY_ICON[video.category] || '🎮';

  return (
    <article
      onClick={() => onClick(video)}
      className="group cursor-pointer bg-card-bg border border-card-border rounded-xl overflow-hidden hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[9/16] bg-surface overflow-hidden">
        {video.thumbnailUrl ? (
          /* 有封面图时显示真实图片 */
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          /* 无封面图时显示分类色块 */
          <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${gradient}`}>
            <div className="text-center">
              <span className="text-4xl block mb-3">{icon}</span>
              <span className="text-xs text-white/50 block px-2">{video.category}</span>
              <span className="text-[10px] text-white/30 block mt-1 line-clamp-2 px-4">
                {video.title}
              </span>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <span className="text-white text-xl">▶</span>
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
          {video.duration}
        </div>

        {/* Featured badge */}
        {video.featured && (
          <div className="absolute top-2 left-2 bg-accent text-white text-xs px-2 py-0.5 rounded">
            精选
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
            {video.category}
          </span>
          {video.platforms.slice(0, 2).map((p) => (
            <span
              key={p}
              className="text-xs px-2 py-0.5 rounded-full bg-card-border text-muted"
            >
              {p}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm mb-1 line-clamp-1 group-hover:text-accent transition-colors">
          {video.title}
        </h3>

        {/* Stats mini */}
        {video.stats && (
          <div className="flex gap-3 mt-2 text-xs text-muted">
            {video.stats.ctr && <span>CTR {video.stats.ctr}</span>}
            {video.stats.cvr && <span>CVR {video.stats.cvr}</span>}
          </div>
        )}
      </div>
    </article>
  );
}

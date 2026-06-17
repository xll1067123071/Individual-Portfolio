'use client';

import { VideoProject } from '@/types';
import { useEffect, useCallback, useRef } from 'react';

interface VideoModalProps {
  video: VideoProject | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  // 关闭时暂停视频
  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!video) return;

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [video, handleKeyDown]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative z-10 bg-card-bg border border-card-border rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video player area */}
        <div className="relative bg-black">
          <video
            ref={videoRef}
            src={video.videoUrl}
            className="w-full max-h-[60vh] object-contain"
            controls
            playsInline
            preload="metadata"
            controlsList="nodownload"
          >
            您的浏览器不支持视频播放。
          </video>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors z-10"
            aria-label="关闭"
          >
            ✕
          </button>
        </div>

        {/* Details */}
        <div className="p-6 overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
              {video.category}
            </span>
            {video.platforms.map((p) => (
              <span
                key={p}
                className="text-xs px-2 py-0.5 rounded-full bg-card-border text-muted"
              >
                {p}
              </span>
            ))}
            <span className="text-xs text-muted ml-auto">{video.duration}</span>
          </div>

          <h2 className="text-xl font-bold mb-2">{video.title}</h2>
          <p className="text-sm text-muted mb-4 leading-relaxed">
            {video.description}
          </p>

          {/* Stats detail */}
          {video.stats && (
            <div className="grid grid-cols-4 gap-4 p-4 bg-surface rounded-xl mb-4">
              {video.stats.ctr && (
                <div>
                  <p className="text-xs text-muted mb-1">CTR</p>
                  <p className="text-xl font-bold text-accent">{video.stats.ctr}</p>
                </div>
              )}
              {video.stats.cvr && (
                <div>
                  <p className="text-xs text-muted mb-1">CVR</p>
                  <p className="text-xl font-bold text-foreground">{video.stats.cvr}</p>
                </div>
              )}
              {video.stats.spend && (
                <div>
                  <p className="text-xs text-muted mb-1">投放消耗</p>
                  <p className="text-xl font-bold text-foreground">{video.stats.spend}</p>
                </div>
              )}
              {video.stats.impressions && (
                <div>
                  <p className="text-xs text-muted mb-1">曝光量</p>
                  <p className="text-xl font-bold text-foreground">
                    {video.stats.impressions}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Role & Game */}
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-muted">投放游戏：</span>
              <span className="text-foreground">{video.gameTitle}</span>
            </div>
            <div>
              <span className="text-muted">制作时间：</span>
              <span className="text-foreground">{video.date}</span>
            </div>
          </div>

          <div className="mt-3 p-3 bg-surface rounded-lg text-sm">
            <span className="text-muted">我的角色：</span>
            <span className="text-foreground">{video.role}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded bg-card-border text-muted"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

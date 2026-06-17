'use client';

import { useState, useEffect, useCallback } from 'react';

const BANNERS = [
  { src: '/banner-1.jpg', alt: '' },
  { src: '/banner-2.jpg', alt: '' },
  { src: '/banner-3.jpg', alt: '' },
];

const INTERVAL = 5000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % BANNERS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  const goTo = (i: number) => {
    if (i === current) return;
    setCurrent(i);
  };

  return (
    <section className="relative w-screen h-screen overflow-hidden flex items-center bg-black">
      {/* === 3 张轮播背景图 — 交叉淡入淡出 === */}
      {BANNERS.map((banner, i) => (
        <img
          key={banner.src}
          src={banner.src}
          alt={banner.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* 图片未加载时的后备背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1620] via-[#1a1a2e] to-[#0a0e15] -z-10" />

      {/* 遮罩层 — 保证文字可读 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* === 左侧文字区 === */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20">
        <div className="max-w-2xl">
          {/* 标签 */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-accent/60" />
            <span className="text-[11px] tracking-[0.2em] text-white/50 uppercase">
              Advertising Portfolio
            </span>
          </div>

          {/* 主标题 */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.05] mb-6 tracking-tight text-white">
            用创意驱动
            <br />
            <span className="text-accent">买量转化率</span>
          </h1>

          {/* 副标题 */}
          <p className="text-base md:text-lg text-white/50 max-w-md mb-10 leading-relaxed">
            专注设计团队管理、游戏买量视频创意策划与制作。
            <br />
            覆盖 AI 短剧、JOJO、火影、龙珠、水浒等全 IP 类型素材。
          </p>

          {/* 核心数据 */}
          <div className="flex gap-10 md:gap-16 mb-10">
            {[
              { value: '1000+', label: '投放素材' },
              { value: '¥1000万+', label: '总消耗金额' },
              { value: '海内外', label: '服务市场' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-[11px] text-white/30 mt-1 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <a
              href="#works"
              className="px-7 py-3.5 rounded-xl bg-accent text-white hover:bg-accent-soft transition-all font-medium text-sm shadow-xl shadow-accent/30"
            >
              查看全部作品
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-xl border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all text-sm"
            >
              联系我
            </a>
          </div>
        </div>
      </div>

      {/* === 底部：小进度点 === */}
      <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center gap-2">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === current
                ? 'bg-white w-4 h-1'
                : 'bg-white/25 hover:bg-white/45 w-1 h-1'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

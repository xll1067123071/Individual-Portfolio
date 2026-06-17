'use client';

import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

type PopupType = 'email' | 'wechat' | null;

export default function Footer() {
  const [popup, setPopup] = useState<PopupType>(null);

  const closePopup = () => setPopup(null);

  return (
    <footer id="contact" className="py-20 px-6 border-t border-card-border bg-surface">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-2xl font-bold mb-4">期待与你合作</h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-muted mb-8 max-w-md mx-auto">
            如果你正在寻找一个有数据思维、懂投放逻辑的买量视频设计师，欢迎联系我。
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button
              onClick={() => setPopup('email')}
              className="px-6 py-3 rounded-xl bg-accent text-white hover:bg-accent-soft transition-colors font-medium shadow-lg shadow-accent/25 cursor-pointer"
            >
              📧 发送邮件
            </button>
            <button
              onClick={() => setPopup('wechat')}
              className="px-6 py-3 rounded-xl bg-card-bg border border-card-border text-foreground hover:border-accent/50 transition-colors cursor-pointer"
            >
              📱 微信联系
            </button>
            <a
              href="/谢亮亮简历.pdf"
              download
              className="px-6 py-3 rounded-xl bg-card-bg border border-card-border text-foreground hover:border-accent/50 transition-colors cursor-pointer"
            >
              📄 下载简历
            </a>
          </div>
        </ScrollReveal>
        <p className="text-xs text-muted mt-16">
          © {new Date().getFullYear()} 谢亮亮作品集
        </p>
      </div>

      {/* === 邮箱弹窗 === */}
      {popup === 'email' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closePopup}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative z-10 bg-card-bg border border-card-border rounded-2xl p-6 md:p-8 shadow-2xl max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-muted mb-3">我的邮箱</p>
            <p className="text-xl md:text-2xl font-bold text-foreground mb-2 break-all">
              1067123071@qq.com
            </p>
            <p className="text-xs text-muted mb-6">欢迎随时联系</p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  navigator.clipboard.writeText('1067123071@qq.com');
                  closePopup();
                }}
                className="px-5 py-2.5 rounded-lg bg-accent text-white text-sm hover:bg-accent-soft transition-colors cursor-pointer"
              >
                复制邮箱
              </button>
              <button
                onClick={closePopup}
                className="px-5 py-2.5 rounded-lg bg-card-border text-muted text-sm hover:text-foreground transition-colors cursor-pointer"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === 微信弹窗 === */}
      {popup === 'wechat' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closePopup}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative z-10 bg-card-bg border border-card-border rounded-2xl p-6 md:p-8 shadow-2xl max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-muted mb-3">微信扫码联系</p>

            {/* 微信二维码 */}
            <div className="w-48 h-48 mx-auto mb-4">
              <img
                src="/qrcode-wechat.jpg"
                alt="微信二维码"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>

            <p className="text-xs text-muted mb-6">扫一扫添加微信</p>

            <button
              onClick={closePopup}
              className="px-5 py-2.5 rounded-lg bg-card-border text-muted text-sm hover:text-foreground transition-colors cursor-pointer"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}

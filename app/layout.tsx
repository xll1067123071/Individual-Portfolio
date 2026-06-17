import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "买量视频作品集 | AD Portfolio",
  description:
    "专注游戏买量视频创意策划与制作。覆盖真人实拍、UE引擎、2D动画、AI生成等全类型素材，每个作品附带真实投放数据。",
  keywords: ["买量视频", "游戏广告", "素材制作", "视频设计师", "广告创意"],
  openGraph: {
    title: "买量视频作品集",
    description: "用创意驱动转化率 — 游戏买量视频设计师作品集",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="bg-background text-foreground" suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

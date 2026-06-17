export type VideoCategory =
  | 'AI短剧'
  | 'AI结合'
  | 'JOJO'
  | '水浒项目'
  | '海外'
  | '火影'
  | '龙珠';

export type VideoPlatform =
  | 'TikTok'
  | '抖音'
  | 'Facebook'
  | 'Instagram'
  | 'Google UAC'
  | 'YouTube'
  | 'Bilibili';

export interface VideoProject {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  platforms: VideoPlatform[];
  tags: string[];
  /** 封面图路径，为空时使用分类色块占位 */
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  orientation: 'horizontal' | 'vertical';
  stats?: {
    ctr?: string;
    cvr?: string;
    spend?: string;
    impressions?: string;
  };
  role: string;
  featured?: boolean;
  date: string;
  gameTitle: string;
}

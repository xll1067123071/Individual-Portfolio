import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-surface">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-10">关于我</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-10">
          <ScrollReveal delay={100}>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-accent">个人简介</h3>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  专注游戏平面设计、买量视频创意制作的资深设计师，拥有10
                  年以上行业经验，8年的管理经验。擅长从数据出发，结合用户心理与平台特性，打造高转化买量素材。
                </p>
                <p>
                  累计制作投放素材 1000+ 条，总消耗金额超 ¥1000
                  万。熟悉国内抖音、海外
                  TikTok/Facebook/Google UAC 等主流投放渠道的素材规范和用户偏好。
                </p>
                <p>
                  始终保持对 AI 工具链的跟进 — 熟练使用
                  Nano banana Image Seedance 等 AI 工具，能够以极低成本快速验证素材方向，提升工作效率。
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-accent">技能栈</h3>
              <div className="space-y-4">
                {[
	  { label: '团队管理', desc: '设计团队搭建 · 素材方向把控与验收 · KPI制定 ' },
                  { label: '创意策划', desc: '用户洞察 · 卖点提炼 · 脚本撰写 · 分镜设计' },
                  { label: '视频制作', desc: 'Premiere Pro · After Effects · DaVinci Resolve · 达芬奇调色' },
                  { label: 'AI 工具链', desc: 'Nano banana · Image 2 · Seedance 2.0 ' },
                  { label: '数据分析', desc: '素材 A/B 测试 · CTR/CVR 归因分析 · 素材生命周期管理' },
                  { label: '协作流程', desc: '与投放优化师协作 · 素材排期管理 · 多语言本地化' },
                ].map((skill) => (
                  <div key={skill.label}>
                    <h4 className="text-sm font-semibold text-foreground mb-1">{skill.label}</h4>
                    <p className="text-sm text-muted">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

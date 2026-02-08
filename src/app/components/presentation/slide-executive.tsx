import { AlertTriangle, CheckCircle, TrendingUp, Target, Award, BarChart3 } from 'lucide-react';
import { SlideContainer, SlideHeader, InsightCard, InsightsSection, SlideFooter } from './design-system';

export function SlideExecutive() {
  return (
    <SlideContainer slideNumber={1}>
      <SlideHeader
        title="Fortinet Competitive Performance Overview"
        subtitle="Keyword & Traffic Insights · Sep 2025 - Jan 2026"
      />

      <div className="flex-1">
        {/* Fortinet Performance Section */}
        <div className="mb-8">
          <h3 className="text-[16px] font-bold text-gray-900 mb-4">Fortinet Performance Highlights</h3>
          <InsightsSection>
            <InsightCard
              icon={TrendingUp}
              type="success"
              content="Fortinet organic traffic: +6.7% growth (4.5M → 4.8M Oct-Jan), with strong keyword expansion (+13.9%, 296K → 337K) demonstrating effective content strategy and improving organic visibility."
            />

            <InsightCard
              icon={Award}
              type="success"
              content="Category Leadership: Fortinet is the #1 top performer in OT Security (29 keywords, 96.6% Page 1 visibility) and shows strong momentum in Zero Trust (+26.3% keyword growth) and NGFW categories."
            />

            <InsightCard
              icon={Target}
              type="info"
              content="Non-Branded Success: Fortinet achieves +18.2% non-branded traffic growth (3.62K → 4.28K), demonstrating effective SEO and content strategy beyond brand recognition—critical for market expansion."
            />
          </InsightsSection>
        </div>

        {/* Competitor Intelligence Section */}
        <div>
          <h3 className="text-[16px] font-bold text-gray-900 mb-4">Competitive Landscape Insights</h3>
          <InsightsSection>
            <InsightCard
              icon={BarChart3}
              type="warning"
              content="Cisco leads organic traffic (33.5M in Nov) but shows volatility — 70% spike in Oct-Nov requires monitoring for sustainability and market share impact."
            />

            <InsightCard
              icon={AlertTriangle}
              type="warning"
              content="Gap Areas: ZTNA (avg 20pp gap vs PA), Cloud Security (avg 32pp gap vs PA), and SecOps (avg 41pp gap vs CrowdStrike) require strategic content investment."
            />

            <InsightCard
              icon={CheckCircle}
              type="info"
              content="Palo Alto leads in SASE, ZTNA, and Cloud Security categories — primary competitive benchmark for Fortinet's content strategy and positioning."
            />
          </InsightsSection>
        </div>
      </div>

      <SlideFooter source="Source: Semrush" />
    </SlideContainer>
  );
}
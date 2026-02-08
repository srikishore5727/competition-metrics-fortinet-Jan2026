import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';
import { TrendingUp, Award, AlertTriangle, TrendingDown, Target } from 'lucide-react';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
  ChartContainer,
  ContextualInsightCard,
  CHART_CONFIG,
  COLORS,
  TEXT_STYLES,
  InsightCard,
  InsightsSection,
} from './design-system';

type CategoryType = 'sase' | 'otSecurity' | 'ztna' | 'cloudSecurity' | 'secOps';

// Category performance data with insights
const categories = [
  {
    id: 'sase' as CategoryType,
    name: 'Secure Access Service Edge (SASE)',
    topPerformer: 'Palo Alto',
    topPerformerColor: '#FFB14A',
    data: [
      { period: 'Nov Wk4', fortinet: 86.3, top: 92.6 },
      { period: 'Dec Wk4', fortinet: 89.6, top: 94.7 },
      { period: 'Feb Wk5', fortinet: 90.9, top: 95.3 },
    ],
    insights: [
      {
        icon: TrendingUp,
        type: 'neutral' as const,
        content: 'Fortinet shows consistent growth from 86.3% to 90.9%, narrowing the gap with Palo Alto from 6.3 to 4.4 percentage points.',
      },
      {
        icon: Target,
        type: 'negative' as const,
        content: 'Still trails Palo Alto by 4.4% in Feb Wk5. Requires sustained content optimization to close competitive gap in SASE category.',
      },
    ],
  },
  {
    id: 'otSecurity' as CategoryType,
    name: 'OT Security',
    topPerformer: 'Fortinet',
    topPerformerColor: '#EF4444',
    data: [
      { period: 'Nov Wk4', fortinet: 86.8, top: 86.8 },
      { period: 'Dec Wk4', fortinet: 90.3, top: 90.3 },
      { period: 'Feb Wk5', fortinet: 91.4, top: 91.4 },
    ],
    insights: [
      {
        icon: Award,
        type: 'positive' as const,
        content: 'Fortinet is the undisputed leader in OT Security, achieving 91.4% visibility score with steady growth trajectory throughout the period.',
      },
      {
        icon: TrendingUp,
        type: 'positive' as const,
        content: 'Strong market positioning with 4.6-point improvement from Nov to Feb. No competitive threat—maintain content leadership in this category.',
      },
    ],
  },
  {
    id: 'ztna' as CategoryType,
    name: 'ZTNA',
    topPerformer: 'Palo Alto',
    topPerformerColor: '#FFB14A',
    data: [
      { period: 'Nov Wk4', fortinet: 67.4, top: 88.4 },
      { period: 'Dec Wk4', fortinet: 75.4, top: 93.9 },
      { period: 'Feb Wk5', fortinet: 74.1, top: 90.3 },
    ],
    insights: [
      {
        icon: AlertTriangle,
        type: 'negative' as const,
        content: 'Improved from 67.4% to 75.4% in Dec, but declined to 74.1% by Feb. Palo Alto maintains 16.2-point lead in Zero Trust Network Access.',
      },
      {
        icon: TrendingDown,
        type: 'negative' as const,
        content: 'Recent decline suggests content momentum loss. Critical area requiring immediate attention to regain upward trajectory and close gap with PA.',
      },
    ],
  },
  {
    id: 'cloudSecurity' as CategoryType,
    name: 'Cloud Security',
    topPerformer: 'Palo Alto',
    topPerformerColor: '#FFB14A',
    data: [
      { period: 'Nov Wk4', fortinet: 52.0, top: 96.3 },
      { period: 'Dec Wk4', fortinet: 60.9, top: 92.9 },
      { period: 'Feb Wk5', fortinet: 64.4, top: 90.6 },
    ],
    insights: [
      {
        icon: TrendingUp,
        type: 'neutral' as const,
        content: 'Positive growth trend from 52.0% to 64.4% (12.4-point improvement), showing content strategy is gaining traction in cloud security space.',
      },
      {
        icon: AlertTriangle,
        type: 'negative' as const,
        content: 'Still 26.2 points behind Palo Alto despite growth. Largest competitive gap requiring aggressive content investment to reach parity.',
      },
    ],
  },
  {
    id: 'secOps' as CategoryType,
    name: 'SecOps',
    topPerformer: 'Cisco',
    topPerformerColor: '#FF7AB6',
    data: [
      { period: 'Nov Wk4', fortinet: 23.8, top: 58.5 },
      { period: 'Dec Wk4', fortinet: 16.4, top: 63.2 },
      { period: 'Feb Wk5', fortinet: 18.7, top: 58.6 },
    ],
    insights: [
      {
        icon: AlertTriangle,
        type: 'negative' as const,
        content: 'Lowest performing category at 18.7% with volatile performance (23.8% → 16.4% → 18.7%). Cisco leads with 39.9-point advantage.',
      },
      {
        icon: Target,
        type: 'negative' as const,
        content: 'SecOps requires fundamental content strategy overhaul. Critical opportunity gap—consider strategic partnerships or major content initiatives.',
      },
    ],
  },
];

// Custom label to show percentage on top of bars
const renderCustomLabel = (props: any) => {
  const { x, y, width, value } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 4}
      fill="#374151"
      textAnchor="middle"
      fontSize="11"
      fontWeight="500"
    >
      {value.toFixed(1)}%
    </text>
  );
};

export function SlideCategoryPerformance({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<CategoryType>('sase');

  const tabs = categories.map(cat => ({
    id: cat.id,
    label: cat.name,
  }));

  const activeCategory = categories.find(cat => cat.id === activeTab)!;
  const isFortinetTopPerformer = activeCategory.topPerformer === 'Fortinet';
  
  const chartData = activeCategory.data.map((item) => ({
    period: item.period,
    Fortinet: item.fortinet,
    [activeCategory.topPerformer]: item.top,
  }));

  return (
    <SlideContainer slideNumber={16} onNavigateHome={onNavigateHome}>
      <SlideHeader 
        title="Category-Wise LLM Metrics" 
        subtitle="(Nov 2025 - Jan 2026)"
      />

      <div className="flex-1 flex flex-col gap-6">
        {/* Tabs */}
        <div className="flex items-start gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-xs font-semibold transition-all duration-200 relative ${
                activeTab === tab.id
                  ? 'bg-white text-red-600 z-10'
                  : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
              }`}
              style={{
                borderRadius: '12px 12px 0 0',
                marginBottom: '-2px',
                boxShadow: activeTab === tab.id
                  ? '0 -2px 8px rgba(0, 0, 0, 0.08), 0 2px 0 0 white'
                  : '0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 grid grid-cols-12 gap-6">
          {/* Chart Section - 8 columns */}
          <div className="col-span-8 flex flex-col gap-4">
            <ChartContainer title="" height={420}>
              <div className="h-full flex flex-col">
                <div className="mb-4 pb-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Top Performer:</span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${activeCategory.topPerformerColor}20`,
                        color: activeCategory.topPerformerColor,
                      }}
                    >
                      {activeCategory.topPerformer}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
                      barGap={4}
                    >
                      <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
                      <XAxis
                        dataKey="period"
                        {...CHART_CONFIG.xAxis}
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis
                        {...CHART_CONFIG.yAxis}
                        tick={{ fontSize: 11 }}
                        domain={[0, 100]}
                        ticks={[0, 20, 40, 60, 80, 100]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          fontSize: '12px',
                        }}
                        formatter={(value: any) => `${value.toFixed(1)}%`}
                      />
                      {isFortinetTopPerformer ? (
                        <Bar
                          dataKey="Fortinet"
                          fill="#EF4444"
                          radius={[4, 4, 0, 0]}
                          label={renderCustomLabel}
                        />
                      ) : (
                        <>
                          <Bar
                            dataKey="Fortinet"
                            fill="#EF4444"
                            radius={[4, 4, 0, 0]}
                            label={renderCustomLabel}
                          />
                          <Bar
                            dataKey={activeCategory.topPerformer}
                            fill={activeCategory.topPerformerColor}
                            radius={[4, 4, 0, 0]}
                            label={renderCustomLabel}
                          />
                        </>
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </ChartContainer>
          </div>

          {/* Insights Section - 4 columns */}
          <div className="col-span-4 flex flex-col gap-4">
            {activeCategory.insights.map((insight, idx) => (
              <ContextualInsightCard
                key={idx}
                icon={insight.icon}
                sentiment={insight.type}
                headline=""
                body={insight.content}
              />
            ))}
          </div>
        </div>

        {/* Competitor Legend at bottom */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className={`${TEXT_STYLES.sectionLabel} mb-3`}>Top Performers by Category</h4>
          <div className="flex gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: '#FFB14A' }}
              />
              <span className="font-semibold text-gray-900">Palo Alto</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-600">SASE, ZTNA, Cloud Security</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: '#EF4444' }}
              />
              <span className="font-semibold text-gray-900">Fortinet</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-600">OT Security</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: '#FF7AB6' }}
              />
              <span className="font-semibold text-gray-900">Cisco</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-600">SecOps</span>
            </div>
          </div>
        </div>
      </div>

      <SlideFooter source="Source: Semrush" />
    </SlideContainer>
  );
}
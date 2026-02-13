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
    name: 'SASE',
    topPerformer: 'Palo Alto',
    topPerformerColor: '#FFB14A',
    data: [
      { period: 'Nov 2025', fortinet: 86.3, top: 92.6 },
      { period: 'Dec 2025', fortinet: 89.6, top: 94.7 },
      { period: 'Jan 2026', fortinet: 90.5, top: 96.8 },
    ],
    insights: [
      {
        icon: Target,
        type: 'neutral' as const,
        content: 'Improvement of 4–7% across most categories, except SecOps, which declined by 6.5% over the last three months.',
      },
      // {
      //   icon: Target,
      //   type: 'negative' as const,
      //   content: 'Palo Alto: 96.8%, trails Fortinet by 6.3pp (Nov-Jan)',
      // },
    ],
  },
  {
    id: 'otSecurity' as CategoryType,
    name: 'OT Security',
    topPerformer: 'Fortinet',
    topPerformerColor: '#EF4444',
    data: [
      { period: 'Nov 2025', fortinet: 86.8, top: 86.8, paloAlto: 60.3 },
      { period: 'Dec 2025', fortinet: 90.3, top: 90.3, paloAlto: 59.2 },
      { period: 'Jan 2026', fortinet: 91.3, top: 91.3, paloAlto: 69.8 },
    ],
    insights: [
      {
        icon: Target,
        type: 'neutral' as const,
        content: 'Improvement of 4–7% across most categories, except SecOps, which declined by 6.5% over the last three months.',
      },
      // {
      //   icon: TrendingUp,
      //   type: 'positive' as const,
      //   content: 'Palo Alto: 69.8%, 21.5pp behind Fortinet (Nov-Jan)',
      // },
    ],
  },
  {
    id: 'ztna' as CategoryType,
    name: 'ZTNA',
    topPerformer: 'Palo Alto',
    topPerformerColor: '#FFB14A',
    data: [
      { period: 'Nov 2025', fortinet: 67.4, top: 88.4 },
      { period: 'Dec 2025', fortinet: 75.4, top: 93.9 },
      { period: 'Jan 2026', fortinet: 74.1, top: 90.3 },
    ],
    insights: [
      {
        icon: Target,
        type: 'neutral' as const,
        content: 'Improvement of 4–7% across most categories, except SecOps, which declined by 6.5% over the last three months.',
      },
      // {
      //   icon: TrendingDown,
      //   type: 'negative' as const,
      //   content: 'Palo Alto: 90.3%, leads by 16.2pp, gap (Nov-Jan)',
      // },
    ],
  },
  {
    id: 'cloudSecurity' as CategoryType,
    name: 'Cloud Security',
    topPerformer: 'Palo Alto',
    topPerformerColor: '#FFB14A',
    data: [
      { period: 'Nov 2025', fortinet: 52.0, top: 96.3 },
      { period: 'Dec 2025', fortinet: 60.9, top: 92.9 },
      { period: 'Jan 2026', fortinet: 64.4, top: 90.6 },
    ],
    insights: [
      {
        icon: Target,
        type: 'neutral' as const,
        content: 'Improvement of 4–7% across most categories, except SecOps, which declined by 6.5% over the last three months.',
      },
      // {
      //   icon: AlertTriangle,
      //   type: 'negative' as const,
      //   content: 'Palo Alto: 90.6%, 26.2pp ahead, large gap (Nov-Jan)',
      // },
    ],
  },
  {
    id: 'secOps' as CategoryType,
    name: 'SecOps',
    topPerformer: 'Palo Alto',
    topPerformerColor: '#FFB14A',
    data: [
      { period: 'Nov 2025', fortinet: 23.8, top: 51.4 },
      { period: 'Dec 2025', fortinet: 16.4, top: 49.9 },
      { period: 'Jan 2026', fortinet: 17.3, top: 47.9 },
    ],
    insights: [
      {
        icon: Target,
        type: 'neutral' as const,
        content: 'Improvement of 4–7% across most categories, except SecOps, which declined by 6.5% over the last three months.',
      },
      // {
      //   icon: Target,
      //   type: 'negative' as const,
      //   content: 'PA leads 30.6pp; strategy overhaul needed',
      // },
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
  
  const chartData = activeCategory.data.map((item: any) => {
    const dataPoint: any = {
      period: item.period,
      Fortinet: item.fortinet,
      [activeCategory.topPerformer]: item.top,
    };
    // Add Palo Alto data for OT Security
    if (activeTab === 'otSecurity' && item.paloAlto !== undefined) {
      dataPoint['Palo Alto'] = item.paloAlto;
    }
    return dataPoint;
  });

  return (
    <SlideContainer slideNumber={16} onNavigateHome={onNavigateHome}>
      <SlideHeader 
        title="Focused Category - AI Visibility %" 
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
                        <>
                          <Bar
                            dataKey="Fortinet"
                            fill="#EF4444"
                            radius={[4, 4, 0, 0]}
                            label={renderCustomLabel}
                          />
                          {activeTab === 'otSecurity' && (
                            <Bar
                              dataKey="Palo Alto"
                              fill="#FFB14A"
                              radius={[4, 4, 0, 0]}
                              label={renderCustomLabel}
                            />
                          )}
                        </>
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
                headline="Fortinet"
                body={insight.content}
              />
            ))}
          </div>
        </div>

        {/* Competitor Legend at bottom */}
        {/* <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className={`${TEXT_STYLES.sectionLabel} mb-3`}>Top Performers by Category</h4>
          <div className="flex gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: '#FFB14A' }}
              />
              <span className="font-semibold text-gray-900">Palo Alto</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-600">SASE, ZTNA, Cloud Security, SecOps</span>
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
          </div>
        </div> */}
      </div>

      <SlideFooter source="Source: Profound" />
    </SlideContainer>
  );
}
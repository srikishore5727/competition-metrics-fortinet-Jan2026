import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { Sparkles, TrendingUp, Award, Zap, Target, TrendingDown } from 'lucide-react';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
  ChartContainer,
  InsightCard,
  InsightsSection,
  ContextualInsightCard,
  EditButton,
  CompetitorFilter,
  CHART_CONFIG,
} from './design-system';

const VENDORS = [
  { id: 'fortinet', name: 'Fortinet', color: '#EF4444' },
  { id: 'paloalto', name: 'Palo Alto', color: '#FFB14A' },
  { id: 'checkpoint', name: 'Check Point', color: '#6C9AFF' },
  { id: 'hpe', name: 'HPE', color: '#7ED957' },
  { id: 'cisco', name: 'Cisco', color: '#FF7AB6' },
  { id: 'crowdstrike', name: 'Crowdstrike', color: '#1F2937' },
];

const VISIBILITY_DATA_INITIAL = {
  fortinet: [57.8, 62.1, 62.6],
  paloalto: [40.9, 43.5, 43.5],
  checkpoint: [14.9, 15.8, 15.9],
  hpe: [1.6, 1.8, 2.1],
  cisco: [31.3, 34.6, 33.9],
  crowdstrike: [14.5, 16.3, 16.0],
};

const SHARE_OF_VOICE_DATA_INITIAL = {
  fortinet: [10.8, 10.1, 10.0],
  paloalto: [7.9, 7.5, 7.5],
  checkpoint: [2.8, 2.8, 2.8],
  hpe: [0.3, 0.3, 0.3],
  cisco: [5.8, 6.0, 5.9],
  crowdstrike: [2.7, 2.8, 2.8],
};

const CITATION_DATA_INITIAL = {
  fortinet: [9.2, 12.2, 12.4],
  paloalto: [2.0, 1.8, 1.8],
  checkpoint: [1.4, 0.9, 0.9],
  hpe: [1.1, 0.1, 0.1],
  cisco: [1.4, 1.1, 1.1],
  crowdstrike: [1.0, 0.4, 0.4],
};

const MONTHS = ['Nov 2025', 'Dec 2025', 'Jan 2026'];

type TabType = 'visibility' | 'shareOfVoice' | 'citation';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
      <p className="text-xs font-semibold text-gray-900 mb-2">{label}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-xs mb-1">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-700">{entry.name}:</span>
          <span className="font-semibold text-gray-900">{entry.value}%</span>
        </div>
      ))}
    </div>
  );
};

export function SlideProfundMetrics({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('visibility');
  const [visibleVendors, setVisibleVendors] = useState<Set<string>>(
    new Set(VENDORS.map((v) => v.id))
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    visibility: { ...VISIBILITY_DATA_INITIAL },
    shareOfVoice: { ...SHARE_OF_VOICE_DATA_INITIAL },
    citation: { ...CITATION_DATA_INITIAL },
  });

  const toggleVendor = (id: string) => {
    setVisibleVendors((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleValueChange = (metric: string, vendorId: string, monthIdx: number, value: string) => {
    setEditableData((prev) => ({
      ...prev,
      [metric]: {
        ...prev[metric as keyof typeof prev],
        [vendorId]: [
          ...prev[metric as keyof typeof prev][vendorId].slice(0, monthIdx),
          parseFloat(value) || 0,
          ...prev[metric as keyof typeof prev][vendorId].slice(monthIdx + 1),
        ],
      },
    }));
  };

  const visibilityChartData = MONTHS.map((month, idx) => {
    const dataPoint: any = { month };
    VENDORS.forEach((vendor) => {
      dataPoint[vendor.name] = editableData.visibility[vendor.id][idx];
    });
    return dataPoint;
  });

  const shareOfVoiceChartData = MONTHS.map((month, idx) => {
    const dataPoint: any = { month };
    VENDORS.forEach((vendor) => {
      dataPoint[vendor.name] = editableData.shareOfVoice[vendor.id][idx];
    });
    return dataPoint;
  });

  const citationChartData = MONTHS.map((month, idx) => {
    const dataPoint: any = { month };
    VENDORS.forEach((vendor) => {
      dataPoint[vendor.name] = editableData.citation[vendor.id][idx];
    });
    return dataPoint;
  });

  const tabs = [
    { id: 'visibility' as TabType, label: 'AI Visibility %' },
    { id: 'shareOfVoice' as TabType, label: 'Share of Voice %' },
    { id: 'citation' as TabType, label: 'Citation Rate %' },
  ];

  const getChartData = () => {
    switch (activeTab) {
      case 'visibility': return visibilityChartData;
      case 'shareOfVoice': return shareOfVoiceChartData;
      case 'citation': return citationChartData;
      default: return [];
    }
  };

  const getInsights = () => {
    switch (activeTab) {
      case 'visibility':
        return (
          <>
            <ContextualInsightCard
              icon={Award}
              sentiment="positive"
              headline="Fortinet Leads AI Visibility"
              body="Fortinet leads AI visibility at 62.6% (+8.3% growth), outperforming all competitors in LLM presence—strong AI-first content strategy paying off."
            />
            <ContextualInsightCard
              icon={Target}
              sentiment="neutral"
              headline="Competitive Gap Analysis"
              body="Palo Alto ranks #2 at 43.5%, 19.1 points behind Fortinet—significant competitive advantage in emerging AI search landscape for Fortinet to maintain."
            />
          </>
        );
      case 'shareOfVoice':
        return (
          <>
            <ContextualInsightCard
              icon={Sparkles}
              sentiment="positive"
              headline="Dominant Share of Voice"
              body="Fortinet dominates AI share of voice at 10.0%, nearly 33% higher than Palo Alto's 7.5%—strong authority in LLM responses and content citations."
            />
            <ContextualInsightCard
              icon={TrendingDown}
              sentiment="neutral"
              headline="Competitor Gaps"
              body="Cisco shows steady 5.9% share, while HPE trails at 0.3%, indicating minimal AI platform presence and content gaps—opportunity for Fortinet to widen lead."
            />
          </>
        );
      case 'citation':
        return (
          <>
            <ContextualInsightCard
              icon={Zap}
              sentiment="positive"
              headline="Exceptional Citation Growth"
              body="Fortinet's citation rate surged +34.8% (9.2% → 12.4%), massively outperforming competitors—strong content authority recognized by AI platforms."
            />
            <ContextualInsightCard
              icon={TrendingDown}
              sentiment="negative"
              headline="Competitor Decline"
              body="All other vendors show declining or flat citation rates, with HPE dropping to 0.1%—major opportunity gap for Fortinet to maintain and extend leadership."
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SlideContainer slideNumber={15} onNavigateHome={onNavigateHome}>
      <SlideHeader 
        title="Overall LLM Metrics" 
        subtitle="(Nov 2025 - Jan 2026)"
      />

      {!isEditing ? (
        <div className="flex-1 flex flex-col gap-6">
          {/* Tabs */}
          <div className="flex items-start gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 text-sm font-semibold transition-all duration-200 relative ${
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
              <ChartContainer
                title=""
                height={420}
              >
                <div className="h-full flex flex-col">
                  <div className="pb-4 border-b border-gray-200 mb-4">
                    <CompetitorFilter
                      competitors={VENDORS}
                      visibleCompetitors={visibleVendors}
                      onToggle={toggleVendor}
                    />
                  </div>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getChartData()} margin={CHART_CONFIG.margin}>
                        <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
                        <XAxis dataKey="month" {...CHART_CONFIG.xAxis} />
                        <YAxis {...CHART_CONFIG.yAxis} />
                        <Tooltip content={<CustomTooltip />} />
                        {VENDORS.map((vendor) =>
                          visibleVendors.has(vendor.id) ? (
                            <Line 
                              key={vendor.id} 
                              type="monotone" 
                              dataKey={vendor.name} 
                              stroke={vendor.color} 
                              {...CHART_CONFIG.line}
                              dot={{ fill: vendor.color, r: 5, strokeWidth: 2, stroke: '#fff' }}
                              activeDot={{ r: 7, strokeWidth: 2 }}
                            />
                          ) : null
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </ChartContainer>
            </div>

            {/* Insights Section - 4 columns */}
            <div className="col-span-4 flex flex-col gap-4">
              {getInsights()}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Edit AI Overview Metrics Data</h3>
            <div className="space-y-6">
              {VENDORS.map((vendor) => (
                <div key={vendor.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: vendor.color }} />
                    <h4 className="text-sm font-bold text-gray-900">{vendor.name}</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">Visibility %:</div>
                      {['Nov', 'Dec', 'Jan'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            step="0.1"
                            value={editableData.visibility[vendor.id][idx]}
                            onChange={(e) => handleValueChange('visibility', vendor.id, idx, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">Share of Voice %:</div>
                      {['Nov', 'Dec', 'Jan'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            step="0.1"
                            value={editableData.shareOfVoice[vendor.id][idx]}
                            onChange={(e) => handleValueChange('shareOfVoice', vendor.id, idx, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">Citation %:</div>
                      {['Nov', 'Dec', 'Jan'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            step="0.1"
                            value={editableData.citation[vendor.id][idx]}
                            onChange={(e) => handleValueChange('citation', vendor.id, idx, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <SlideFooter source="Source: Semrush" />
    </SlideContainer>
  );
}
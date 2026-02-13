import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, Zap, Sparkles } from 'lucide-react';
import { useState } from 'react';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
  ChartContainer,
  ContextualInsightCard,
  CompetitorFilter,
  CustomChartTooltip,
  EditButton,
  CHART_CONFIG,
} from './design-system';

const NGFW_COMPETITORS = [
  { id: 'fortinet', name: 'Fortinet', color: '#EF4444' },
  { id: 'cisco', name: 'Cisco', color: '#FF7AB6' },
  { id: 'hpe', name: 'HPE', color: '#7ED957' },
  { id: 'paloalto', name: 'Palo Alto', color: '#FFB14A' },
  { id: 'checkpoint', name: 'Check Point', color: '#6C9AFF' },
  { id: 'crowdstrike', name: 'CrowdStrike', color: '#1F2937' },
];

const MONTHS = ['Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026'];
const AIO_MONTHS = ['Nov 2025', 'Dec 2025', 'Jan 2026']; // AIO data starts from Nov

const TOTAL_KEYWORDS_ABS = {
  fortinet: [896, 944, 981, 998],
  cisco: [665, 700, 742, 755],
  hpe: [85, 103, 102, 109],
  paloalto: [727, 756, 860, 909],
  checkpoint: [564, 560, 562, 562],
  crowdstrike: [0, 63, 74, 80],
};

const PAGE_ONE_KW_ABS = {
  fortinet: [788, 849, 862, 879],
  cisco: [556, 584, 601, 604],
  hpe: [51, 64, 55, 66],
  paloalto: [608, 634, 719, 760],
  checkpoint: [413, 400, 371, 381],
  crowdstrike: [0, 38, 39, 36],
};

const CUMULATIVE_TRAFFIC_ABS = {
  fortinet: [23104, 24692, 27746, 30861],
  cisco: [15861, 15826, 24132, 29153],
  hpe: [782, 836, 626, 687],
  paloalto: [11946, 12637, 21611, 23649],
  checkpoint: [4294, 5126, 4772, 4814],
  crowdstrike: [0, 407, 338, 317],
};

const AIO_DATA_ABS = {
  fortinet: [0, 588, 615, 637],
  cisco: [0, 462, 490, 498],
  hpe: [0, 77, 77, 79],
  paloalto: [0, 496, 558, 587],
  checkpoint: [0, 389, 396, 384],
  crowdstrike: [0, 47, 47, 53],
};

type TabType = 'keywords' | 'page-one' | 'traffic' | 'aio';

interface SlideNGFWProps {
  onNavigateHome?: () => void;
}

export function SlideNGFW({ onNavigateHome }: SlideNGFWProps) {
  const [activeTab, setActiveTab] = useState<TabType>('keywords');
  const [visibleCompetitors, setVisibleCompetitors] = useState<Set<string>>(
    new Set(NGFW_COMPETITORS.map((c) => c.id))
  );

  const [editableData, setEditableData] = useState<{
    keywords: Record<string, number[]>;
    pageOne: Record<string, number[]>;
    traffic: Record<string, number[]>;
    aio: Record<string, number[]>;
  }>(() => ({
    keywords: JSON.parse(JSON.stringify(TOTAL_KEYWORDS_ABS)),
    pageOne: JSON.parse(JSON.stringify(PAGE_ONE_KW_ABS)),
    traffic: JSON.parse(JSON.stringify(CUMULATIVE_TRAFFIC_ABS)),
    aio: JSON.parse(JSON.stringify(AIO_DATA_ABS)),
  }));

  const [isEditing, setIsEditing] = useState(false);

  const toggleCompetitor = (competitorId: string) => {
    setVisibleCompetitors((prev) => {
      const newSet = new Set(prev);
      newSet.has(competitorId) ? newSet.delete(competitorId) : newSet.add(competitorId);
      return newSet;
    });
  };

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

  const handleCancel = () => {
    setEditableData({
      keywords: JSON.parse(JSON.stringify(TOTAL_KEYWORDS_ABS)),
      pageOne: JSON.parse(JSON.stringify(PAGE_ONE_KW_ABS)),
      traffic: JSON.parse(JSON.stringify(CUMULATIVE_TRAFFIC_ABS)),
      aio: JSON.parse(JSON.stringify(AIO_DATA_ABS)),
    });
    setIsEditing(false);
  };

  const handleValueChange = (
    dataset: 'keywords' | 'pageOne' | 'traffic' | 'aio',
    competitorId: string,
    index: number,
    value: string
  ) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    setEditableData((prev) => ({
      ...prev,
      [dataset]: {
        ...prev[dataset],
        [competitorId]: prev[dataset][competitorId].map((v, i) => (i === index ? numValue : v)),
      },
    }));
  };

  // Prepare chart data
  const keywordsChartData = MONTHS.map((month, index) => {
    const dataPoint: any = { month };
    NGFW_COMPETITORS.forEach((comp) => {
      if (visibleCompetitors.has(comp.id)) {
        dataPoint[comp.name] = editableData.keywords[comp.id][index];
      }
    });
    return dataPoint;
  });

  const trafficChartData = MONTHS.map((month, index) => {
    const dataPoint: any = { month };
    NGFW_COMPETITORS.forEach((comp) => {
      if (visibleCompetitors.has(comp.id)) {
        dataPoint[comp.name] = editableData.traffic[comp.id][index];
      }
    });
    return dataPoint;
  });

  const pageOneChartData = MONTHS.map((month, index) => {
    const dataPoint: any = { month };
    NGFW_COMPETITORS.forEach((comp) => {
      if (visibleCompetitors.has(comp.id)) {
        dataPoint[comp.name] = editableData.pageOne[comp.id][index];
      }
    });
    return dataPoint;
  });

  const aioChartData = AIO_MONTHS.map((month, index) => {
    const dataPoint: any = { month };
    NGFW_COMPETITORS.forEach((comp) => {
      if (visibleCompetitors.has(comp.id)) {
        // Skip October (index 0), use Nov/Dec/Jan (indices 1, 2, 3)
        dataPoint[comp.name] = editableData.aio[comp.id][index + 1];
      }
    });
    return dataPoint;
  });

  const tabs = [
    { id: 'keywords' as TabType, label: 'Total Keywords' },
    { id: 'page-one' as TabType, label: 'Page 1 Keywords' },
    { id: 'traffic' as TabType, label: 'Cumulative Traffic' },
    { id: 'aio' as TabType, label: 'AIO (AI Overview)' },
  ];

  const getChartData = () => {
    switch (activeTab) {
      case 'keywords': return keywordsChartData;
      case 'page-one': return pageOneChartData;
      case 'traffic': return trafficChartData;
      case 'aio': return aioChartData;
      default: return [];
    }
  };

  const getInsights = () => {
    switch (activeTab) {
      case 'keywords':
        return (
          <>
            <ContextualInsightCard
              icon={TrendingUp}
              sentiment="positive"
              headline="Fortinet"
              body="+11.4% growth from 896 to 996 (Oct-Jan)"
            />
            <ContextualInsightCard
              icon={BarChart3}
              sentiment="neutral"
              headline="Palo Alto"
              body="+25% growth from 707 to 909 (Oct-Jan)"
            />
          </>
        );
      case 'page-one':
        return (
          <>
            <ContextualInsightCard
              icon={TrendingUp}
              sentiment="positive"
              headline="Page 1"
              body="Fortinet is leading with 11.5% growth & 88.1% of total keywords are on page 1"
            />
            <ContextualInsightCard
              icon={BarChart3}
              sentiment="neutral"
              headline="Palo Alto"
              body="Behind Fortinet with the growth 25%"
            />
          </>
        );
      case 'traffic':
        return (
          <>
            <ContextualInsightCard
              icon={TrendingUp}
              sentiment="positive"
              headline="Fortinet"
              body="Steady growth and increase by 33.6%"
            />
            <ContextualInsightCard
              icon={Zap}
              sentiment="positive"
              headline="Fortinet is leading than competitions"
              // body="+83.9% to 29.2K; Gap narrowed 7.2K→1.7K (Oct-Jan)"
            />
          </>
        );
      case 'aio':
        return (
          <>
            <ContextualInsightCard
              icon={TrendingUp}
              sentiment="positive"
              headline="Fortinet"
              body="Top player with 11.4% increase"
            />
            {/* <ContextualInsightCard
              icon={Sparkles}
              sentiment="neutral"
              headline="Palo Alto AI Growth"
              body="587 AI Overview keywords, +18.4% (Nov-Jan)"
            /> */}
          </>
        );
      default:
        return null;
    }
  };

  const renderChart = () => {
    const chartData = getChartData();
    
    if (activeTab === 'traffic') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={CHART_CONFIG.margin}>
            <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
            <XAxis dataKey="month" {...CHART_CONFIG.xAxis} />
            <YAxis {...CHART_CONFIG.yAxis} />
            <Tooltip content={(props) => <CustomChartTooltip {...props} />} />
            {NGFW_COMPETITORS.map((comp) =>
              visibleCompetitors.has(comp.id) ? (
                <Line
                  key={comp.id}
                  type="monotone"
                  dataKey={comp.name}
                  stroke={comp.color}
                  {...CHART_CONFIG.line}
                  dot={{ fill: comp.color, r: 5, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7, strokeWidth: 2 }}
                />
              ) : null
            )}
          </LineChart>
        </ResponsiveContainer>
      );
    }

    // Bar chart for all other tabs
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={CHART_CONFIG.margin}>
          <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
          <XAxis dataKey="month" {...CHART_CONFIG.xAxis} />
          <YAxis {...CHART_CONFIG.yAxis} />
          <Tooltip content={(props) => <CustomChartTooltip {...props} />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
          {NGFW_COMPETITORS.map((comp) =>
            visibleCompetitors.has(comp.id) ? (
              <Bar
                key={comp.id}
                dataKey={comp.name}
                fill={comp.color}
                radius={CHART_CONFIG.bar.radius}
              />
            ) : null
          )}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <SlideContainer slideNumber={8} onNavigateHome={onNavigateHome} source="Ahrefs">
      <SlideHeader
        title="NGFW / Firewall"
        subtitle="(Oct 2025 - Jan 2026)"
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
                actions={<EditButton isEditing={isEditing} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />}
                height={420}
              >
                <div className="h-full flex flex-col">
                  <div className="pb-4 border-b border-gray-200 mb-4">
                    <CompetitorFilter
                      competitors={NGFW_COMPETITORS}
                      visibleCompetitors={visibleCompetitors}
                      onToggle={toggleCompetitor}
                    />
                  </div>
                  <div className="flex-1">
                    {renderChart()}
                  </div>
                </div>
              </ChartContainer>
            </div>

            {/* Insights Section - 4 columns */}
            <div className="col-span-4 flex flex-col gap-4">
              {getInsights()}
            </div>
          </div>

          {/* Executive Note */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm font-medium text-green-900">
              <span className="font-semibold">Executive Summary:</span> Fortinet dominates with 998 keywords and 879 Page 1 rankings. While maintaining the traffic lead (30.9K), competitors are accelerating, requiring continued focus on high-volume terms.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Edit NGFW Metrics Data</h3>
            <div className="space-y-6">
              {NGFW_COMPETITORS.map((comp) => (
                <div key={comp.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: comp.color }} />
                    <h4 className="text-sm font-bold text-gray-900">{comp.name}</h4>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">Total Keywords:</div>
                      {['Oct', 'Nov', 'Dec', 'Jan'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            value={editableData.keywords[comp.id][idx]}
                            onChange={(e) => handleValueChange('keywords', comp.id, idx, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">Page 1 KWs:</div>
                      {['Oct', 'Nov', 'Dec', 'Jan'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            value={editableData.pageOne[comp.id][idx]}
                            onChange={(e) => handleValueChange('pageOne', comp.id, idx, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">Traffic:</div>
                      {['Oct', 'Nov', 'Dec', 'Jan'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            value={editableData.traffic[comp.id][idx]}
                            onChange={(e) => handleValueChange('traffic', comp.id, idx, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">AIO:</div>
                      {['Nov', 'Dec', 'Jan'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            value={editableData.aio[comp.id][idx + 1]}
                            onChange={(e) => handleValueChange('aio', comp.id, idx + 1, e.target.value)}
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

      <SlideFooter source="Source: Ahrefs" />
    </SlideContainer>
  );
}
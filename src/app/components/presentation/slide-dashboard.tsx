import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { TrendingUp, BarChart3, Zap, Sparkles } from 'lucide-react';
import { formatChartAxisNumber } from '@/app/utils/format';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
  ChartContainer,
  ContextualInsightCard,
  CompetitorFilter,
  EditButton,
  CHART_CONFIG,
} from './design-system';

// SD-WAN Dashboard vendors with design system colors
const SDWAN_VENDORS = [
  { id: 'fortinet', name: 'Fortinet', color: '#EF4444' },
  { id: 'cisco', name: 'Cisco', color: '#FF7AB6' },
  { id: 'hpe', name: 'HPE', color: '#7ED957' },
  { id: 'paloalto', name: 'Palo Alto', color: '#FFB14A' },
  { id: 'checkpoint', name: 'Check Point', color: '#6C9AFF' },
  { id: 'crowdstrike', name: 'CrowdStrike', color: '#1F2937' },
];

// SASE data - Oct 2025, Nov 2025, Dec 2025, Jan 2026
const TOTAL_KEYWORDS_DATA_INITIAL = {
  fortinet: [175, 181, 189, 196],
  cisco: [129, 144, 154, 160],
  hpe: [33, 45, 65, 70],
  paloalto: [179, 182, 195, 200],
  checkpoint: [65, 99, 114, 114],
  crowdstrike: [35, 44, 48, 48],
};

const CUMULATIVE_TRAFFIC_DATA_INITIAL = {
  fortinet: [11031, 8746, 10024, 10015],
  cisco: [1921, 2090, 1976, 2109],
  hpe: [227, 107, 137, 118],
  paloalto: [8998, 9442, 10263, 10660],
  checkpoint: [818, 1270, 1368, 1372],
  crowdstrike: [325, 423, 436, 436],
};

const PAGE_ONE_KEYWORDS_DATA_INITIAL = {
  fortinet: [165, 167, 179, 188],
  cisco: [114, 128, 128, 131],
  hpe: [14, 13, 16, 15],
  paloalto: [173, 174, 182, 188],
  checkpoint: [37, 54, 57, 52],
  crowdstrike: [17, 15, 13, 13],
};

const AIO_DATA_INITIAL = {
  fortinet: [0, 125, 127, 125],
  cisco: [0, 105, 110, 110],
  hpe: [0, 38, 53, 55],
  paloalto: [0, 127, 136, 130],
  checkpoint: [0, 76, 85, 81],
  crowdstrike: [0, 32, 43, 44],
};

const MONTHS = ['Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026'];
const AIO_MONTHS = ['Nov 2025', 'Dec 2025', 'Jan 2026']; // AIO data starts from Nov

type TabType = 'keywords' | 'page-one' | 'traffic' | 'aio';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
      <p className="text-xs font-semibold text-gray-900 mb-2">{label}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-xs mb-1">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-700">{entry.name}:</span>
          <span className="font-semibold text-gray-900">{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export function SlideDashboard({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('keywords');
  const [visibleVendors, setVisibleVendors] = useState<Set<string>>(
    new Set(SDWAN_VENDORS.map((v) => v.id))
  );
  
  const [editableData, setEditableData] = useState<{
    keywords: Record<string, number[]>;
    traffic: Record<string, number[]>;
    pageOne: Record<string, number[]>;
    aio: Record<string, number[]>;
  }>(() => ({
    keywords: JSON.parse(JSON.stringify(TOTAL_KEYWORDS_DATA_INITIAL)),
    traffic: JSON.parse(JSON.stringify(CUMULATIVE_TRAFFIC_DATA_INITIAL)),
    pageOne: JSON.parse(JSON.stringify(PAGE_ONE_KEYWORDS_DATA_INITIAL)),
    aio: JSON.parse(JSON.stringify(AIO_DATA_INITIAL)),
  }));

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableData({
      keywords: JSON.parse(JSON.stringify(TOTAL_KEYWORDS_DATA_INITIAL)),
      traffic: JSON.parse(JSON.stringify(CUMULATIVE_TRAFFIC_DATA_INITIAL)),
      pageOne: JSON.parse(JSON.stringify(PAGE_ONE_KEYWORDS_DATA_INITIAL)),
      aio: JSON.parse(JSON.stringify(AIO_DATA_INITIAL)),
    });
    setIsEditing(false);
  };

  const handleValueChange = (
    dataset: 'keywords' | 'traffic' | 'pageOne' | 'aio',
    vendorId: string,
    index: number,
    value: string
  ) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    
    setEditableData((prev) => ({
      ...prev,
      [dataset]: {
        ...prev[dataset],
        [vendorId]: prev[dataset][vendorId].map((v, i) => (i === index ? numValue : v)),
      },
    }));
  };

  const toggleVendor = (vendorId: string) => {
    setVisibleVendors((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(vendorId)) {
        newSet.delete(vendorId);
      } else {
        newSet.add(vendorId);
      }
      return newSet;
    });
  };

  const totalKeywordsChartData = MONTHS.map((month, index) => {
    const dataPoint: any = { month };
    SDWAN_VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        dataPoint[vendor.name] = editableData.keywords[vendor.id][index];
      }
    });
    return dataPoint;
  });

  const cumulativeTrafficChartData = MONTHS.map((month, index) => {
    const dataPoint: any = { month };
    SDWAN_VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        dataPoint[vendor.name] = editableData.traffic[vendor.id][index];
      }
    });
    return dataPoint;
  });

  const getTrafficYMax = () => {
    let max = 0;
    cumulativeTrafficChartData.forEach((point) => {
      SDWAN_VENDORS.forEach((vendor) => {
        if (visibleVendors.has(vendor.id) && point[vendor.name] !== undefined) {
          max = Math.max(max, point[vendor.name]);
        }
      });
    });
    return Math.ceil(max * 1.15);
  };

  const trafficYMax = getTrafficYMax();

  const pageOneKeywordsChartData = MONTHS.map((month, index) => {
    const dataPoint: any = { month };
    SDWAN_VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        dataPoint[vendor.name] = editableData.pageOne[vendor.id][index];
      }
    });
    return dataPoint;
  });

  const aioChartData = AIO_MONTHS.map((month, index) => {
    const dataPoint: any = { month };
    SDWAN_VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        // Skip October (index 0), use Nov/Dec/Jan (indices 1, 2, 3)
        dataPoint[vendor.name] = editableData.aio[vendor.id][index + 1];
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
      case 'keywords': return totalKeywordsChartData;
      case 'page-one': return pageOneKeywordsChartData;
      case 'traffic': return cumulativeTrafficChartData;
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
              headline="Strong Keyword Growth"
              body="Fortinet shows steady growth from 175 to 196 keywords (+12% over 4 months), closely matching Palo Alto's 200—demonstrates strong content expansion in the emerging SASE category."
            />
          </>
        );
      case 'page-one':
        return (
          <>
            <ContextualInsightCard
              icon={BarChart3}
              sentiment="positive"
              headline="Excellent Visibility Ratio"
              body="Fortinet achieves 188 Page 1 rankings (95.9% of total keywords), matching Palo Alto's 188—demonstrates exceptional content relevance and strong competitive positioning in SASE category."
            />
          </>
        );
      case 'traffic':
        return (
          <>
            <ContextualInsightCard
              icon={Zap}
              sentiment="negative"
              headline="Traffic Volatility Challenge"
              body={[
                "Fortinet shows volatile traffic pattern (11K→8.7K→10K), ending flat at 10,015 while Palo Alto demonstrates consistent growth (+18.5%, reaching 10,660).",
                "Despite leading in keywords (196) and strong Page 1 presence (95.9%), traffic instability suggests content optimization opportunity to stabilize and grow SASE traffic.",
              ]}
            />
          </>
        );
      case 'aio':
        return (
          <>
            <ContextualInsightCard
              icon={Sparkles}
              sentiment="neutral"
              headline="Stable AI Overview Presence"
              body="Palo Alto leads (127 → 130) with Fortinet close behind (125 → 125). HPE shows strong growth (+44.7%), while category demonstrates growing AI Overview adoption across SASE queries."
            />
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
            <YAxis domain={[0, trafficYMax]} {...CHART_CONFIG.yAxis} tickFormatter={formatChartAxisNumber} />
            <Tooltip content={<CustomTooltip />} />
            {SDWAN_VENDORS.map((vendor) =>
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
      );
    }

    // Bar chart for all other tabs
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={CHART_CONFIG.margin}>
          <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
          <XAxis dataKey="month" {...CHART_CONFIG.xAxis} />
          <YAxis {...CHART_CONFIG.yAxis} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
          {SDWAN_VENDORS.map((vendor) =>
            visibleVendors.has(vendor.id) ? (
              <Bar key={vendor.id} dataKey={vendor.name} fill={vendor.color} radius={CHART_CONFIG.bar.radius} />
            ) : null
          )}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <SlideContainer slideNumber={11} onNavigateHome={onNavigateHome}>
      <SlideHeader 
        title="SASE Category Performance" 
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
                      competitors={SDWAN_VENDORS}
                      visibleCompetitors={visibleVendors}
                      onToggle={toggleVendor}
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
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Edit SASE Metrics Data</h3>
            <div className="space-y-6">
              {SDWAN_VENDORS.map((vendor) => (
                <div key={vendor.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: vendor.color }} />
                    <h4 className="text-sm font-bold text-gray-900">{vendor.name}</h4>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">Total Keywords:</div>
                      {['Oct', 'Nov', 'Dec', 'Jan'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            value={editableData.keywords[vendor.id][idx]}
                            onChange={(e) => handleValueChange('keywords', vendor.id, idx, e.target.value)}
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
                            value={editableData.pageOne[vendor.id][idx]}
                            onChange={(e) => handleValueChange('pageOne', vendor.id, idx, e.target.value)}
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
                            value={editableData.traffic[vendor.id][idx]}
                            onChange={(e) => handleValueChange('traffic', vendor.id, idx, e.target.value)}
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
                            value={editableData.aio[vendor.id][idx + 1]}
                            onChange={(e) => handleValueChange('aio', vendor.id, idx + 1, e.target.value)}
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
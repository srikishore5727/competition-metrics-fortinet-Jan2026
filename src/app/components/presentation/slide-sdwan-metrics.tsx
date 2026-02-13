import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { TrendingUp, BarChart3, Zap, Sparkles, Target, TrendingDown, Info } from 'lucide-react';
import { formatChartAxisNumber } from '@/app/utils/format';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
  ChartContainer,
  ContextualInsightCard,
  EditButton,
  CompetitorFilter,
  CHART_CONFIG,
} from './design-system';

// Vendors with design system colors
const VENDORS = [
  { id: 'fortinet', name: 'Fortinet', color: '#EF4444' },
  { id: 'cisco', name: 'Cisco', color: '#FF7AB6' },
  { id: 'hpe', name: 'HPE', color: '#7ED957' },
  { id: 'paloalto', name: 'Palo Alto', color: '#FFB14A' },
  { id: 'checkpoint', name: 'Check Point', color: '#6C9AFF' },
  { id: 'crowdstrike', name: 'CrowdStrike', color: '#1F2937' },
];

// Initial data - Oct, Nov, Dec 2025, Jan 2026
const TOTAL_KEYWORDS_DATA_INITIAL = {
  fortinet: [288, 289, 295, 304],
  cisco: [297, 308, 306, 314],
  hpe: [127, 135, 128, 125],
  paloalto: [283, 291, 309, 312],
  checkpoint: [48, 65, 68, 79],
  crowdstrike: [0, 0, 1, 1],
};

const CUMULATIVE_TRAFFIC_DATA_INITIAL = {
  fortinet: [5961, 5984, 6055, 6196],
  cisco: [9702, 9574, 8833, 8824],
  hpe: [1584, 1554, 1538, 1138],
  paloalto: [6979, 7379, 8021, 8281],
  checkpoint: [98, 262, 167, 215],
  crowdstrike: [0, 0, 0, 0],
};

const PAGE_ONE_KEYWORDS_DATA_INITIAL = {
  fortinet: [277, 282, 284, 292],
  cisco: [284, 296, 289, 291],
  hpe: [107, 124, 106, 105],
  paloalto: [274, 277, 296, 302],
  checkpoint: [16, 29, 22, 24],
  crowdstrike: [0, 0, 1, 1],
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

export function SlideSDWANMetrics({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('keywords');
  const [visibleVendors, setVisibleVendors] = useState<Set<string>>(
    new Set(VENDORS.map((v) => v.id))
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
    VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        dataPoint[vendor.name] = editableData.keywords[vendor.id][index];
      }
    });
    return dataPoint;
  });

  const cumulativeTrafficChartData = MONTHS.map((month, index) => {
    const dataPoint: any = { month };
    VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        dataPoint[vendor.name] = editableData.traffic[vendor.id][index];
      }
    });
    return dataPoint;
  });

  const getTrafficYMax = () => {
    let max = 0;
    cumulativeTrafficChartData.forEach((point) => {
      VENDORS.forEach((vendor) => {
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
    VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        dataPoint[vendor.name] = editableData.pageOne[vendor.id][index];
      }
    });
    return dataPoint;
  });

  const aioChartData = AIO_MONTHS.map((month, index) => {
    const dataPoint: any = { month };
    VENDORS.forEach((vendor) => {
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

  const getChartTitle = () => {
    switch (activeTab) {
      case 'keywords': return 'Total Keywords';
      case 'page-one': return 'No. of KWs Ranking on Page 1';
      case 'traffic': return 'Cumulative Traffic';
      case 'aio': return 'AIO (AI Overview)';
      default: return '';
    }
  };

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
              headline="Fortinet"
              body="+5.6% growth from 288 to 304 (Oct–Jan)"
            />
            <ContextualInsightCard
              icon={TrendingUp}
              sentiment="positive"
              headline="Cisco"
              body="+5.7 % growth from 297 to 314 (Oct–Jan)"
            />
          </>
        );
      case 'page-one':
        return (
          <>
            <ContextualInsightCard
              icon={TrendingUp}
              sentiment="positive"
              headline="Palo Alto"
              body="Leading with 10% growth"
            />
            <ContextualInsightCard
              icon={Target}
              sentiment="neutral"
              // headline="Cisco Volume Leader"
              body="Fortinet is next, and Cisco is close behind."
            />
          </>
        );
      case 'traffic':
        return (
          <>
            <ContextualInsightCard
              icon={TrendingDown}
              sentiment="negative"
              headline="Cisco"
              body="Leading but saw a 10% drop in January 2026."
            />
            <ContextualInsightCard
              icon={Info}
              sentiment="neutral"
              // headline="Palo Alto Steady Rise"
              body="Fortinet has been stable for the past four months with around 6K traffic."
            />
            <ContextualInsightCard
              icon={TrendingUp}
              sentiment="positive"
              headline="Palo Alto"
              body="Ranks second and has shown an 18% improvement."
            />
          </>
        );
      case 'aio':
        return (
          <>
            <ContextualInsightCard
              icon={TrendingUp}
              sentiment="positive"
              headline="Palo Alto"
              body="Leading the competition by 3% growth"
            />
            <ContextualInsightCard
              icon={Info}
              sentiment="neutral"
              // headline=""
              body="Fortinet is in second place and has been stable for the past four months with around 125 keywords."
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
      );
    }

    // Bar chart for all other tabs
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={CHART_CONFIG.margin}>
          <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
          <XAxis dataKey="month" {...CHART_CONFIG.xAxis} />
          <YAxis {...CHART_CONFIG.yAxis} tickFormatter={activeTab === 'traffic' ? formatChartAxisNumber : undefined} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
          {VENDORS.map((vendor) =>
            visibleVendors.has(vendor.id) ? (
              <Bar key={vendor.id} dataKey={vendor.name} fill={vendor.color} radius={CHART_CONFIG.bar.radius} />
            ) : null
          )}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <SlideContainer slideNumber={9} onNavigateHome={onNavigateHome} source="Ahrefs">
      <SlideHeader 
        title="SD-WAN" 
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
                      competitors={VENDORS}
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
            <h3 className="text-sm font-bold text-gray-900 mb-4">Edit SD-WAN Metrics Data</h3>
            <div className="space-y-6">
              {VENDORS.map((vendor) => (
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

      <SlideFooter source="Source: Ahrefs" />
    </SlideContainer>
  );
}
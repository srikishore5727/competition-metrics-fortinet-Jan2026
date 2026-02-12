import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { Sparkles, BarChart3, TrendingUp, AlertTriangle, TrendingDown } from 'lucide-react';
import { formatNumber } from '@/app/utils/format';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
  ChartContainer,
  InsightCard,
  InsightsSection,
  ContextualInsightCard,
  CompetitorFilter,
  CHART_CONFIG,
} from './design-system';

const VENDORS = [
  { id: 'fortinet', name: 'Fortinet', color: '#EF4444' },
  { id: 'cisco', name: 'Cisco', color: '#FF7AB6' },
  { id: 'hpe', name: 'HPE', color: '#7ED957' },
  { id: 'paloalto', name: 'Palo Alto', color: '#FFB14A' },
  { id: 'checkpoint', name: 'Check Point', color: '#6C9AFF' },
  { id: 'crowdstrike', name: 'Crowdstrike', color: '#1F2937' },
];

const AIO_KEYWORDS_DATA_INITIAL = {
  fortinet: [12365, 11938, 13496, 16613],
  cisco: [14365, 13811, 15462, 18133],
  hpe: [2784, 3257, 4993, 6155],
  paloalto: [4506, 4653, 5964, 7627],
  checkpoint: [2132, 2013, 1916, 1867],
  crowdstrike: [5051, 4623, 4406, 5137],
};

const AIO_TRAFFIC_DATA_INITIAL = {
  fortinet: [89387, 111533, 274734, 103997],
  cisco: [105842, 221665, 195524, 127125],
  hpe: [15630, 39985, 42522, 30235],
  paloalto: [114814, 40224, 64541, 48679],
  checkpoint: [10203, 10252, 9807, 14363],
  crowdstrike: [44539, 169073, 66811, 22229],
};

const MONTHS = ['Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026'];

type TabType = 'keywords' | 'traffic';

const CustomTooltip = ({ active, payload, label, isTraffic }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
      <p className="text-xs font-semibold text-gray-900 mb-2">{label}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-xs mb-1">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-700">{entry.name}:</span>
          <span className="font-semibold text-gray-900">
            {isTraffic ? formatNumber(entry.value) : entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export function SlideAIOverview({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('keywords');
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    keywords: JSON.parse(JSON.stringify(AIO_KEYWORDS_DATA_INITIAL)),
    traffic: JSON.parse(JSON.stringify(AIO_TRAFFIC_DATA_INITIAL)),
  });

  const [visibleVendors, setVisibleVendors] = useState<Set<string>>(
    new Set(VENDORS.map((v) => v.id))
  );

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData({
      keywords: JSON.parse(JSON.stringify(AIO_KEYWORDS_DATA_INITIAL)),
      traffic: JSON.parse(JSON.stringify(AIO_TRAFFIC_DATA_INITIAL)),
    });
    setIsEditing(false);
  };

  const handleValueChange = (
    dataset: 'keywords' | 'traffic',
    vendorId: string,
    index: number,
    value: string
  ) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    setEditedData((prev) => ({
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
      if (newSet.has(vendorId)) newSet.delete(vendorId);
      else newSet.add(vendorId);
      return newSet;
    });
  };

  const keywordsChartData = MONTHS.map((month, index) => {
    const dataPoint: any = { month };
    VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        dataPoint[vendor.name] = editedData.keywords[vendor.id][index];
      }
    });
    return dataPoint;
  });

  const trafficChartData = MONTHS.map((month, index) => {
    const dataPoint: any = { month };
    VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        dataPoint[vendor.name] = editedData.traffic[vendor.id][index];
      }
    });
    return dataPoint;
  });

  const getTrafficYMax = () => {
    let max = 0;
    trafficChartData.forEach((point) => {
      VENDORS.forEach((vendor) => {
        if (visibleVendors.has(vendor.id) && point[vendor.name] !== undefined) {
          max = Math.max(max, point[vendor.name]);
        }
      });
    });
    return Math.ceil(max * 1.15);
  };

  const fortinetKeywords = editedData.keywords.fortinet;
  const fortinetKwGrowth = ((fortinetKeywords[3] - fortinetKeywords[0]) / fortinetKeywords[0] * 100).toFixed(0);

  const tabs = [
    { id: 'keywords' as TabType, label: 'AI Overview Keywords' },
    { id: 'traffic' as TabType, label: 'AI Overview Traffic' },
  ];

  const getInsights = () => {
    if (activeTab === 'keywords') {
      return (
        <>
          <ContextualInsightCard
            icon={TrendingUp}
            sentiment="positive"
            headline="Fortinet grew 12.4K→16.6K mentions (+4.2K) from Oct 2025–Jan 2026."
            // body="16.6K AI keywords, +34.3% growth (Oct-Jan)"
          />
          <ContextualInsightCard
            icon={TrendingUp}
            sentiment="positive"
            headline="Cisco leads 14.4K→18.1K (+3.7K); most competitors show steady growth."
            // body="18.1K AI keywords, +26.2%, leads (Oct-Jan)"
          />
        </>
      );
    } else {
      return (
        <>
          <ContextualInsightCard
            icon={TrendingUp}
            sentiment="positive"
            headline="Fortinet AI traffic rose 89.4K→104.0K (+14.6K) from Oct 2025–Jan 2026."
            // body="Dec spike 275K AI traffic, volatile (Oct-Jan)"
          />
          <ContextualInsightCard
            icon={TrendingUp}
            sentiment="positive"
            headline="Cisco leads 105.8K→127.1K (+21.3K); most others show moderate growth overall."
            // body="127K AI traffic; CS drop 169K → 22K (Oct-Jan)"
          />
        </>
      );
    }
  };

  const renderChart = () => {
    if (activeTab === 'traffic') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trafficChartData} margin={CHART_CONFIG.margin}>
            <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
            <XAxis dataKey="month" {...CHART_CONFIG.xAxis} />
            <YAxis domain={[0, getTrafficYMax()]} {...CHART_CONFIG.yAxis} tickFormatter={(value) => formatNumber(value)} />
            <Tooltip content={(props) => <CustomTooltip {...props} isTraffic={true} />} />
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

    // Bar chart for keywords
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={keywordsChartData} margin={CHART_CONFIG.margin}>
          <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
          <XAxis dataKey="month" {...CHART_CONFIG.xAxis} />
          <YAxis {...CHART_CONFIG.yAxis} tickFormatter={(value) => formatNumber(value)} />
          <Tooltip content={(props) => <CustomTooltip {...props} isTraffic={false} />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
          {VENDORS.map((vendor) =>
            visibleVendors.has(vendor.id) ? (
              <Bar
                key={vendor.id}
                dataKey={vendor.name}
                fill={vendor.color}
                radius={CHART_CONFIG.bar.radius}
              />
            ) : null
          )}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <SlideContainer slideNumber={17} onNavigateHome={onNavigateHome}>
      <SlideHeader 
        title="AI Overview Metrics" 
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
                height={420}
              >
                <div className="h-full flex flex-col">
                  <div className="pb-4 border-b border-gray-200 mb-4">
                    <CompetitorFilter competitors={VENDORS} visibleCompetitors={visibleVendors} onToggle={toggleVendor} />
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
            <h3 className="text-sm font-bold text-gray-900 mb-4">Edit AI Overview Data</h3>
            <div className="space-y-6">
              {VENDORS.map((vendor) => (
                <div key={vendor.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: vendor.color }} />
                    <h4 className="text-sm font-bold text-gray-900">{vendor.name}</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">Keywords:</div>
                      {['Oct', 'Nov', 'Dec', 'Jan'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            value={editedData.keywords[vendor.id][idx]}
                            onChange={(e) => handleValueChange('keywords', vendor.id, idx, e.target.value)}
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
                            value={editedData.traffic[vendor.id][idx]}
                            onChange={(e) => handleValueChange('traffic', vendor.id, idx, e.target.value)}
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
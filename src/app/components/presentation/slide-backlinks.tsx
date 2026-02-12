import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { Award, TrendingDown, Link } from 'lucide-react';
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
  { id: 'paloalto', name: 'Palo Alto', color: '#FFB14A' },
  { id: 'checkpoint', name: 'Check Point', color: '#6C9AFF' },
  { id: 'hpe', name: 'HPE', color: '#7ED957' },
  { id: 'cisco', name: 'Cisco', color: '#FF7AB6' },
  { id: 'crowdstrike', name: 'Crowdstrike', color: '#1F2937' },
];

const REFERRING_DOMAINS_DATA_INITIAL = {
  fortinet: [55763, 56664, 54539, 54118],
  paloalto: [43395, 43492, 42913, 42607],
  checkpoint: [60931, 61349, 60699, 60302],
  hpe: [84928, 85049, 81908, 79383],
  cisco: [240813, 238909, 234233, 231358],
  crowdstrike: [39829, 41063, 40497, 40061],
};

const BACKLINKS_DATA_INITIAL = {
  fortinet: [2959317, 2781377, 2781318, 2801670],
  paloalto: [3065653, 2984036, 2664856, 2582186],
  checkpoint: [7196791, 6811855, 6497283, 5858117],
  hpe: [27623142, 29957004, 29892810, 29642408],
  cisco: [48289592, 49873514, 48045259, 46708296],
  crowdstrike: [1674586, 1686070, 1557071, 1395009],
};

const MONTHS = ['Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026'];

type TabType = 'referringDomains' | 'backlinks';

const CustomTooltip = ({ active, payload, label, isBacklinks }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
      <p className="text-xs font-semibold text-gray-900 mb-2">{label}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-xs mb-1">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-700">{entry.name}:</span>
          <span className="font-semibold text-gray-900">
            {isBacklinks ? formatNumber(entry.value) : entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export function SlideBacklinks({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('referringDomains');
  const [visibleVendors, setVisibleVendors] = useState<Set<string>>(
    new Set(VENDORS.map((v) => v.id))
  );

  const [editableData, setEditableData] = useState<{
    referringDomains: Record<string, number[]>;
    backlinks: Record<string, number[]>;
  }>(() => ({
    referringDomains: JSON.parse(JSON.stringify(REFERRING_DOMAINS_DATA_INITIAL)),
    backlinks: JSON.parse(JSON.stringify(BACKLINKS_DATA_INITIAL)),
  }));

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleCancel = () => {
    setEditableData({
      referringDomains: JSON.parse(JSON.stringify(REFERRING_DOMAINS_DATA_INITIAL)),
      backlinks: JSON.parse(JSON.stringify(BACKLINKS_DATA_INITIAL)),
    });
    setIsEditing(false);
  };

  const handleValueChange = (
    dataset: 'referringDomains' | 'backlinks',
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
      if (newSet.has(vendorId)) newSet.delete(vendorId);
      else newSet.add(vendorId);
      return newSet;
    });
  };

  const referringDomainsChartData = MONTHS.map((month, index) => {
    const dataPoint: any = { month };
    VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        dataPoint[vendor.name] = editableData.referringDomains[vendor.id][index];
      }
    });
    return dataPoint;
  });

  const backlinksChartData = MONTHS.map((month, index) => {
    const dataPoint: any = { month };
    VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        dataPoint[vendor.name] = editableData.backlinks[vendor.id][index];
      }
    });
    return dataPoint;
  });

  const getBacklinksYMax = () => {
    let max = 0;
    backlinksChartData.forEach((point) => {
      VENDORS.forEach((vendor) => {
        if (visibleVendors.has(vendor.id) && point[vendor.name] !== undefined) {
          max = Math.max(max, point[vendor.name]);
        }
      });
    });
    return Math.ceil(max * 1.15);
  };

  const ciscoReferring = editableData.referringDomains.cisco;

  const tabs = [
    { id: 'referringDomains' as TabType, label: 'Referring Domains' },
    { id: 'backlinks' as TabType, label: 'Total Backlinks' },
  ];

  const getChartData = () => {
    return activeTab === 'referringDomains' ? referringDomainsChartData : backlinksChartData;
  };

  const getInsights = () => {
    if (activeTab === 'referringDomains') {
      return (
        <>
          <ContextualInsightCard
            icon={TrendingDown}
            sentiment="negative"
            headline="Fortinet Domain Decline"
            body="Fortinet: 55.8K → 54.1K domains, -3.0% (Oct-Jan)"
          />
          <ContextualInsightCard
            icon={Award}
            sentiment="neutral"
            headline="Cisco Domain Lead"
            body={`Cisco: ${formatNumber(ciscoReferring[3])} domains, leads (Oct-Jan)`}
          />
        </>
      );
    } else {
      return (
        <>
          <ContextualInsightCard
            icon={TrendingDown}
            sentiment="negative"
            headline="Fortinet Backlink Decline"
            body="Fortinet: 16.6M → 16.3M backlinks, -1.7% (Oct-Jan)"
          />
          <ContextualInsightCard
            icon={Link}
            sentiment="negative"
            headline="Cisco Backlink Lead"
            body="Cisco: 46.7M backlinks, industry decline (Oct-Jan)"
          />
        </>
      );
    }
  };

  return (
    <SlideContainer slideNumber={19} onNavigateHome={onNavigateHome}>
      <SlideHeader 
        title="Competition Backlink Performance" 
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
                    <CompetitorFilter
                      competitors={VENDORS}
                      visibleCompetitors={visibleVendors}
                      onToggle={toggleVendor}
                    />
                  </div>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={getChartData()} 
                        margin={CHART_CONFIG.margin}
                      >
                        <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
                        <XAxis dataKey="month" {...CHART_CONFIG.xAxis} />
                        <YAxis 
                          {...CHART_CONFIG.yAxis} 
                          domain={activeTab === 'backlinks' ? [0, getBacklinksYMax()] : undefined}
                          tickFormatter={(value) => formatNumber(value)} 
                        />
                        <Tooltip content={(props) => <CustomTooltip {...props} isBacklinks={activeTab === 'backlinks'} />} />
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
            <h3 className="text-sm font-bold text-gray-900 mb-4">Edit Backlink Data</h3>
            <div className="space-y-6">
              {VENDORS.map((vendor) => (
                <div key={vendor.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: vendor.color }} />
                    <h4 className="text-sm font-bold text-gray-900">{vendor.name}</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">Referring Domains:</div>
                      {['Oct', 'Nov', 'Dec', 'Jan'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            value={editableData.referringDomains[vendor.id][idx]}
                            onChange={(e) => handleValueChange('referringDomains', vendor.id, idx, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">Backlinks:</div>
                      {['Oct', 'Nov', 'Dec', 'Jan'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            value={editableData.backlinks[vendor.id][idx]}
                            onChange={(e) => handleValueChange('backlinks', vendor.id, idx, e.target.value)}
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
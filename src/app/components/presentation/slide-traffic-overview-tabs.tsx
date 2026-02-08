import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { COMPETITORS, ORGANIC_TRAFFIC, BRANDED_TRAFFIC, NON_BRANDED_TRAFFIC, MONTH_LABELS } from '@/app/data/seo-data';
import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { formatNumber } from '@/app/utils/format';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
  ChartContainer,
  InsightCard,
  InsightsSection,
  EditButton,
  CompetitorFilter,
  CustomChartTooltip,
  CHART_CONFIG,
  TEXT_STYLES,
} from './design-system';

type TabType = 'overall' | 'branded' | 'non-branded';

interface EditableData {
  branded: (number | null)[];
  nonBranded: (number | null)[];
}

interface SlideTrafficOverviewTabsProps {
  onNavigateHome?: () => void;
}

export function SlideTrafficOverviewTabs({ onNavigateHome }: SlideTrafficOverviewTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overall');
  const [visibleCompetitors, setVisibleCompetitors] = useState<Set<string>>(
    new Set(COMPETITORS.map((c) => c.id))
  );

  const [editableTraffic, setEditableTraffic] = useState<Record<string, (number | null)[]>>(() => {
    const initial: Record<string, (number | null)[]> = {};
    COMPETITORS.forEach((comp) => {
      initial[comp.id] = [...ORGANIC_TRAFFIC[comp.id as keyof typeof ORGANIC_TRAFFIC]];
    });
    return initial;
  });

  const [editableBrandedData, setEditableBrandedData] = useState<Record<string, EditableData>>(() => {
    const initial: Record<string, EditableData> = {};
    COMPETITORS.forEach((comp) => {
      initial[comp.id] = {
        branded: [...BRANDED_TRAFFIC[comp.id as keyof typeof BRANDED_TRAFFIC]],
        nonBranded: [...NON_BRANDED_TRAFFIC[comp.id as keyof typeof NON_BRANDED_TRAFFIC]],
      };
    });
    return initial;
  });

  const [isEditing, setIsEditing] = useState(false);

  const toggleCompetitor = (competitorId: string) => {
    setVisibleCompetitors((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(competitorId)) {
        newSet.delete(competitorId);
      } else {
        newSet.add(competitorId);
      }
      return newSet;
    });
  };

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

  const handleCancel = () => {
    const reset: Record<string, (number | null)[]> = {};
    COMPETITORS.forEach((comp) => {
      reset[comp.id] = [...ORGANIC_TRAFFIC[comp.id as keyof typeof ORGANIC_TRAFFIC]];
    });
    setEditableTraffic(reset);
    
    const resetBranded: Record<string, EditableData> = {};
    COMPETITORS.forEach((comp) => {
      resetBranded[comp.id] = {
        branded: [...BRANDED_TRAFFIC[comp.id as keyof typeof BRANDED_TRAFFIC]],
        nonBranded: [...NON_BRANDED_TRAFFIC[comp.id as keyof typeof NON_BRANDED_TRAFFIC]],
      };
    });
    setEditableBrandedData(resetBranded);
    setIsEditing(false);
  };

  const handleValueChange = (competitorId: string, index: number, value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    setEditableTraffic((prev) => ({
      ...prev,
      [competitorId]: prev[competitorId].map((v, i) => (i === index ? numValue : v)),
    }));
  };

  const handleBrandedValueChange = (competitorId: string, type: 'branded' | 'nonBranded', index: number, value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    setEditableBrandedData((prev) => ({
      ...prev,
      [competitorId]: {
        ...prev[competitorId],
        [type]: prev[competitorId][type].map((v, i) => (i === index ? numValue : v)),
      },
    }));
  };

  // Prepare chart data for overall traffic
  const overallChartData = MONTH_LABELS.slice(1).map((label, index) => {
    const dataPoint: any = { month: label };
    COMPETITORS.forEach((competitor) => {
      if (visibleCompetitors.has(competitor.id)) {
        dataPoint[competitor.name] = editableTraffic[competitor.id][index + 1];
      }
    });
    return dataPoint;
  });

  // Prepare chart data for branded/non-branded
  const brandedChartData = MONTH_LABELS.slice(1).map((label, index) => {
    const dataPoint: any = { month: label };
    COMPETITORS.forEach((competitor) => {
      if (visibleCompetitors.has(competitor.id)) {
        const value = editableBrandedData[competitor.id].branded[index + 1];
        dataPoint[competitor.name] = value ? value * 1000 : null;
      }
    });
    return dataPoint;
  });

  const nonBrandedChartData = MONTH_LABELS.slice(1).map((label, index) => {
    const dataPoint: any = { month: label };
    COMPETITORS.forEach((competitor) => {
      if (visibleCompetitors.has(competitor.id)) {
        const value = editableBrandedData[competitor.id].nonBranded[index + 1];
        dataPoint[competitor.name] = value ? value * 1000 : null;
      }
    });
    return dataPoint;
  });

  // Calculate dynamic Y-axis domain
  const getYAxisDomain = (type: TabType) => {
    let maxValue = 0;
    COMPETITORS.forEach((competitor) => {
      if (visibleCompetitors.has(competitor.id)) {
        let trafficData: (number | null)[] = [];
        
        if (type === 'overall') {
          trafficData = editableTraffic[competitor.id].slice(1);
        } else if (type === 'branded') {
          trafficData = editableBrandedData[competitor.id].branded.slice(1).map(v => v ? v * 1000 : null);
        } else {
          trafficData = editableBrandedData[competitor.id].nonBranded.slice(1).map(v => v ? v * 1000 : null);
        }
        
        trafficData.forEach((value) => {
          if (value !== null && value > maxValue) {
            maxValue = value;
          }
        });
      }
    });
    return [0, maxValue > 0 ? Math.ceil(maxValue * 1.1) : 100];
  };

  const tabs = [
    { id: 'overall' as TabType, label: 'Overall Traffic' },
    { id: 'branded' as TabType, label: 'Branded' },
    { id: 'non-branded' as TabType, label: 'Non-Branded' },
  ];

  const getChartData = () => {
    if (activeTab === 'overall') return overallChartData;
    if (activeTab === 'branded') return brandedChartData;
    return nonBrandedChartData;
  };

  const getInsights = () => {
    if (activeTab === 'overall') {
      return (
        <InsightsSection>
          <InsightCard
            icon={TrendingUp}
            type="success"
            content="Fortinet demonstrates +6.7% traffic growth (4.5M → 4.8M) from Oct to Jan, showing steady momentum. This indicates effective content strategy and improving organic visibility in the competitive landscape."
          />
          <InsightCard
            icon={TrendingUp}
            type="info"
            content="Cisco shows volatile traffic pattern with a massive spike in November (33.5M) before dropping to 4.5M by January. Crowdstrike experiences consistent decline (679K → 439K). Market presents opportunity for Fortinet to capture additional share."
          />
        </InsightsSection>
      );
    } else if (activeTab === 'branded') {
      return (
        <InsightsSection>
          <InsightCard
            icon={TrendingUp}
            type="warning"
            content="Fortinet Brand Search Decline: Branded traffic dropped -38.4% (878K → 541K), though it still represents 11.2% of total traffic—reinforcing brand awareness and thought leadership is critical."
          />
          <InsightCard
            icon={TrendingUp}
            type="info"
            content="Cisco Leads But Eroding: Cisco maintains largest branded volume (1.51M) but faces -30.4% decline—presents opportunity for Fortinet to capture mindshare through strategic brand campaigns."
          />
        </InsightsSection>
      );
    } else {
      return (
        <InsightsSection>
          <InsightCard
            icon={TrendingUp}
            type="success"
            content="Strong Non-Branded Growth: Fortinet achieves +18.2% non-branded growth (3.62M → 4.28M), demonstrating effective SEO and content strategy beyond brand recognition—critical for market expansion."
          />
          <InsightCard
            icon={TrendingUp}
            type="warning"
            content="Cisco Volatility Creates Opening: Despite Cisco's dominant position (29.6M in Jan), their erratic performance (+80.4% then -6.6% swings) signals instability—opportunity for Fortinet to capture consistent market share."
          />
        </InsightsSection>
      );
    }
  };

  return (
    <SlideContainer slideNumber={3} onNavigateHome={onNavigateHome}>
      <SlideHeader
        title="Organic Traffic Overview"
        subtitle="(Oct 2025 - Jan 2026)"
      />

      {/* Tabs */}
      <div className="flex items-start gap-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-10 py-3.5 text-sm font-semibold transition-all duration-200 relative ${
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

      <div className="flex-1 grid grid-cols-12 gap-6">
        {/* Chart Section - 8 columns */}
        <div className="col-span-8 flex flex-col gap-4">
          <ChartContainer
            title=""
            actions={
              <EditButton
                isEditing={isEditing}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            }
            height={400}
          >
            {!isEditing ? (
              <div className="h-full flex flex-col">
                <div className="pb-4 border-b border-gray-200 mb-4">
                  <CompetitorFilter
                    competitors={COMPETITORS}
                    visibleCompetitors={visibleCompetitors}
                    onToggle={toggleCompetitor}
                  />
                </div>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getChartData()} margin={CHART_CONFIG.margin}>
                      <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
                      <XAxis dataKey="month" {...CHART_CONFIG.xAxis} />
                      <YAxis
                        {...CHART_CONFIG.yAxis}
                        tickFormatter={(value) => formatNumber(value)}
                        domain={getYAxisDomain(activeTab)}
                      />
                      <Tooltip
                        content={(props) => (
                          <CustomChartTooltip {...props} formatter={formatNumber} />
                        )}
                      />
                      {COMPETITORS.map((competitor) => {
                        const isVisible = visibleCompetitors.has(competitor.id);
                        return (
                          <Line
                            key={competitor.id}
                            type="monotone"
                            dataKey={competitor.name}
                            stroke={competitor.color}
                            {...CHART_CONFIG.line}
                            dot={{ fill: competitor.color, r: 5, strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 7, strokeWidth: 2 }}
                            hide={!isVisible}
                          />
                        );
                      })}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="h-full overflow-auto">
                <div className="space-y-4">
                  {activeTab === 'overall' && COMPETITORS.map((competitor) => (
                    <div key={competitor.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: competitor.color }}
                        />
                        <h4 className="text-sm font-semibold text-gray-900">{competitor.name}</h4>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {['Oct', 'Nov', 'Dec', 'Jan'].map((month, idx) => (
                          <div key={month}>
                            <label className="text-xs text-gray-600 font-medium mb-1 block">
                              {month}:
                            </label>
                            <input
                              type="number"
                              value={editableTraffic[competitor.id][idx + 1] ?? ''}
                              onChange={(e) => handleValueChange(competitor.id, idx + 1, e.target.value)}
                              className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="null"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {(activeTab === 'branded' || activeTab === 'non-branded') && COMPETITORS.map((competitor) => (
                    <div key={competitor.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: competitor.color }}
                        />
                        <h4 className="text-sm font-semibold text-gray-900">{competitor.name}</h4>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {['Oct', 'Nov', 'Dec', 'Jan'].map((month, idx) => (
                          <div key={month}>
                            <label className="text-xs text-gray-600 font-medium mb-1 block">
                              {month}:
                            </label>
                            <input
                              type="number"
                              value={activeTab === 'branded' 
                                ? editableBrandedData[competitor.id].branded[idx + 1] ?? ''
                                : editableBrandedData[competitor.id].nonBranded[idx + 1] ?? ''
                              }
                              onChange={(e) => handleBrandedValueChange(
                                competitor.id, 
                                activeTab === 'branded' ? 'branded' : 'nonBranded', 
                                idx + 1, 
                                e.target.value
                              )}
                              className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="null"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ChartContainer>
        </div>

        {/* Insights Section - 4 columns */}
        <div className="col-span-4">
          {getInsights()}
        </div>
      </div>

      <SlideFooter source="Source: Semrush" />
    </SlideContainer>
  );
}
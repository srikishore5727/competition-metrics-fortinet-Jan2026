import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { COMPETITORS, ORGANIC_KEYWORDS, PAGE_ONE_KEYWORDS, MONTH_LABELS } from '@/app/data/seo-data';
import { useState } from 'react';
import { TrendingUp, TrendingDown, Target, AlertCircle, BarChart3, Award } from 'lucide-react';
import { formatNumber } from '@/app/utils/format';
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
  CustomChartTooltip,
  CHART_CONFIG,
} from './design-system';

type TabType = 'organic' | 'page-one';

interface SlideOpportunitiesProps {
  onNavigateHome?: () => void;
}

export function SlideOpportunities({ onNavigateHome }: SlideOpportunitiesProps) {
  const [activeTab, setActiveTab] = useState<TabType>('organic');
  // Single shared visibility state for both charts
  const [visibleCompetitors, setVisibleCompetitors] = useState<Set<string>>(
    new Set(COMPETITORS.map((c) => c.id))
  );

  const [editableOrganic, setEditableOrganic] = useState<Record<string, (number | null)[]>>(() => {
    const initial: Record<string, (number | null)[]> = {};
    COMPETITORS.forEach((comp) => {
      initial[comp.id] = [...ORGANIC_KEYWORDS[comp.id as keyof typeof ORGANIC_KEYWORDS]];
    });
    return initial;
  });

  const [editablePageOne, setEditablePageOne] = useState<Record<string, (number | null)[]>>(() => {
    const initial: Record<string, (number | null)[]> = {};
    COMPETITORS.forEach((comp) => {
      initial[comp.id] = [...PAGE_ONE_KEYWORDS[comp.id as keyof typeof PAGE_ONE_KEYWORDS]];
    });
    return initial;
  });

  const [isEditingOrganic, setIsEditingOrganic] = useState(false);
  const [isEditingPageOne, setIsEditingPageOne] = useState(false);

  const toggleCompetitor = (competitorId: string) => {
    setVisibleCompetitors((prev) => {
      const newSet = new Set(prev);
      newSet.has(competitorId) ? newSet.delete(competitorId) : newSet.add(competitorId);
      return newSet;
    });
  };

  const handleEditOrganic = () => setIsEditingOrganic(true);
  const handleSaveOrganic = () => setIsEditingOrganic(false);

  const handleCancelOrganic = () => {
    const reset: Record<string, (number | null)[]> = {};
    COMPETITORS.forEach((comp) => {
      reset[comp.id] = [...ORGANIC_KEYWORDS[comp.id as keyof typeof ORGANIC_KEYWORDS]];
    });
    setEditableOrganic(reset);
    setIsEditingOrganic(false);
  };

  const handleEditPageOne = () => setIsEditingPageOne(true);
  const handleSavePageOne = () => setIsEditingPageOne(false);

  const handleCancelPageOne = () => {
    const reset: Record<string, (number | null)[]> = {};
    COMPETITORS.forEach((comp) => {
      reset[comp.id] = [...PAGE_ONE_KEYWORDS[comp.id as keyof typeof PAGE_ONE_KEYWORDS]];
    });
    setEditablePageOne(reset);
    setIsEditingPageOne(false);
  };

  const handleOrganicValueChange = (competitorId: string, index: number, value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    setEditableOrganic((prev) => ({
      ...prev,
      [competitorId]: prev[competitorId].map((v, i) => (i === index ? numValue : v)),
    }));
  };

  const handlePageOneValueChange = (competitorId: string, index: number, value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    setEditablePageOne((prev) => ({
      ...prev,
      [competitorId]: prev[competitorId].map((v, i) => (i === index ? numValue : v)),
    }));
  };

  // Chart data - skip Sep (index 0)
  const organicChartData = MONTH_LABELS.slice(1).map((label, index) => {
    const dataPoint: any = { month: label };
    COMPETITORS.forEach((competitor) => {
      if (visibleCompetitors.has(competitor.id)) {
        dataPoint[competitor.name] = editableOrganic[competitor.id][index + 1];
      }
    });
    return dataPoint;
  });

  const pageOneChartData = MONTH_LABELS.slice(1).map((label, index) => {
    const dataPoint: any = { month: label };
    COMPETITORS.forEach((competitor) => {
      if (visibleCompetitors.has(competitor.id)) {
        dataPoint[competitor.name] = editablePageOne[competitor.id][index + 1];
      }
    });
    return dataPoint;
  });

  // Dynamic Y-axis domains
  const getOrganicYAxisDomain = () => {
    let maxValue = 0;
    COMPETITORS.forEach((competitor) => {
      if (visibleCompetitors.has(competitor.id)) {
        editableOrganic[competitor.id].slice(1).forEach((value) => {
          if (value !== null && value > maxValue) maxValue = value;
        });
      }
    });
    return [0, maxValue > 0 ? Math.ceil(maxValue * 1.1) : 100];
  };

  const getPageOneYAxisDomain = () => {
    let maxValue = 0;
    COMPETITORS.forEach((competitor) => {
      if (visibleCompetitors.has(competitor.id)) {
        editablePageOne[competitor.id].slice(1).forEach((value) => {
          if (value !== null && value > maxValue) maxValue = value;
        });
      }
    });
    return [0, maxValue > 0 ? Math.ceil(maxValue * 1.1) : 100];
  };

  const renderChart = (
    chartData: any[],
    visibleCompetitors: Set<string>,
    isEditing: boolean,
    editableData: Record<string, (number | null)[]>,
    handleValueChange: (competitorId: string, index: number, value: string) => void,
    domain: [number, number],
    chartTitle?: string
  ) => {
    if (isEditing) {
      return (
        <div className="h-full overflow-auto p-2">
          <div className="space-y-3">
            {COMPETITORS.map((competitor) => (
              <div key={competitor.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: competitor.color }} />
                  <h4 className="text-sm font-semibold text-gray-900">{competitor.name}</h4>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {['Oct', 'Nov', 'Dec', 'Jan'].map((month, idx) => (
                    <div key={month}>
                      <label className="text-xs text-gray-600 font-medium mb-1 block">{month}:</label>
                      <input
                        type="number"
                        value={editableData[competitor.id][idx + 1] ?? ''}
                        onChange={(e) => handleValueChange(competitor.id, idx + 1, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="null"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={CHART_CONFIG.margin}>
          <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
          <XAxis dataKey="month" {...CHART_CONFIG.xAxis} />
          <YAxis
            {...CHART_CONFIG.yAxis}
            tickFormatter={(value) => formatNumber(value)}
            domain={domain}
          />
          <Tooltip content={(props) => <CustomChartTooltip {...props} formatter={formatNumber} />} />
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
    );
  };

  const tabs = [
    { id: 'organic' as TabType, label: 'Total Organic Keywords' },
    { id: 'page-one' as TabType, label: 'Page 1 Keywords' },
  ];

  const getChartData = () => {
    return activeTab === 'organic' ? organicChartData : pageOneChartData;
  };

  const getIsEditing = () => {
    return activeTab === 'organic' ? isEditingOrganic : isEditingPageOne;
  };

  const getEditableData = () => {
    return activeTab === 'organic' ? editableOrganic : editablePageOne;
  };

  const getHandleValueChange = () => {
    return activeTab === 'organic' ? handleOrganicValueChange : handlePageOneValueChange;
  };

  const getYAxisDomain = () => {
    return activeTab === 'organic' ? getOrganicYAxisDomain() : getPageOneYAxisDomain();
  };

  const getEditActions = () => {
    if (activeTab === 'organic') {
      return {
        isEditing: isEditingOrganic,
        onEdit: handleEditOrganic,
        onSave: handleSaveOrganic,
        onCancel: handleCancelOrganic,
      };
    } else {
      return {
        isEditing: isEditingPageOne,
        onEdit: handleEditPageOne,
        onSave: handleSavePageOne,
        onCancel: handleCancelPageOne,
      };
    }
  };

  const getInsights = () => {
    if (activeTab === 'organic') {
      return (
        <>
          <ContextualInsightCard
            icon={TrendingUp}
            sentiment="positive"
            headline="Fortinet's Strong Growth"
            body="Fortinet demonstrates +13.9% keyword growth (296K → 337K Oct-Jan), showing strong content momentum and improving organic visibility—second-best growth rate after HPE (+17.3%)."
          />
          <ContextualInsightCard
            icon={BarChart3}
            sentiment="neutral"
            headline="Cisco's Market Position"
            body="Cisco maintains highest volume at 734K keywords (+1.4% growth)—opportunity for Fortinet to gain market share through aggressive content expansion while Cisco shows minimal growth."
          />
        </>
      );
    } else {
      return (
        <>
          <ContextualInsightCard
            icon={Award}
            sentiment="positive"
            headline="Best-in-Class Conversion"
            body="Fortinet achieves 45K Page 1 keywords (+7.1% growth), representing 13.4% conversion rate—highest efficiency among all competitors in Jan, indicating superior content quality."
          />
          <ContextualInsightCard
            icon={Target}
            sentiment="neutral"
            headline="Cisco Leads Volume"
            body="Cisco leads absolute Page 1 volume (89K, +2.3% growth) but Fortinet's higher conversion rate suggests better content relevance and potential to capture more high-value keywords."
          />
        </>
      );
    }
  };

  return (
    <SlideContainer slideNumber={6} onNavigateHome={onNavigateHome}>
      <SlideHeader
        title="Keyword Opportunities & Rankings"
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
              <EditButton {...getEditActions()} />
            }
            height={400}
          >
            <div className="h-full flex flex-col">
              <div className="pb-4 border-b border-gray-200 mb-4">
                <CompetitorFilter
                  competitors={COMPETITORS}
                  visibleCompetitors={visibleCompetitors}
                  onToggle={toggleCompetitor}
                />
              </div>
              <div className="flex-1">
                {renderChart(
                  getChartData(),
                  visibleCompetitors,
                  getIsEditing(),
                  getEditableData(),
                  getHandleValueChange(),
                  getYAxisDomain()
                )}
              </div>
            </div>
          </ChartContainer>
        </div>

        {/* Insights Section - 4 columns */}
        <div className="col-span-4 flex flex-col gap-4">
          {getInsights()}
        </div>
      </div>

      <SlideFooter source="Source: Semrush" />
    </SlideContainer>
  );
}
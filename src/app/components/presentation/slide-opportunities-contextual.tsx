import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { COMPETITORS, ORGANIC_KEYWORDS, PAGE_ONE_KEYWORDS, MONTH_LABELS } from '@/app/data/seo-data';
import { useState } from 'react';
import { TrendingUp, Target } from 'lucide-react';
import { formatNumber } from '@/app/utils/format';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
  ChartContainer,
  ContextualInsightCard,
  EditButton,
  CompetitorFilter,
  CustomChartTooltip,
  CHART_CONFIG,
} from './design-system';

export function SlideOpportunitiesContextual() {
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

  const renderEditForm = (
    editableData: Record<string, (number | null)[]>,
    handleValueChange: (competitorId: string, index: number, value: string) => void
  ) => (
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

  return (
    <SlideContainer slideNumber={4}>
      <SlideHeader
        title="Keyword Performance Metrics — Contextual Insights"
        subtitle="Total organic keywords vs Page 1 rankings (Oct 2025 – Jan 2026)"
      />

      <div className="flex-1 flex flex-col gap-6">
        {/* Chart 1: Total Organic Keywords with contextual insight */}
        <div className="flex gap-6">
          {/* Chart takes 68% width */}
          <div className="flex-[68]">
            <ChartContainer
              title="Total Organic Keywords"
              actions={
                <EditButton
                  isEditing={isEditingOrganic}
                  onEdit={handleEditOrganic}
                  onSave={handleSaveOrganic}
                  onCancel={handleCancelOrganic}
                />
              }
              height={280}
            >
              {isEditingOrganic ? (
                renderEditForm(editableOrganic, handleOrganicValueChange)
              ) : (
                <div className="h-full flex flex-col">
                  <div className="pb-3 border-b border-gray-200 mb-3">
                    <CompetitorFilter
                      competitors={COMPETITORS}
                      visibleCompetitors={visibleCompetitors}
                      onToggle={toggleCompetitor}
                    />
                  </div>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={organicChartData} margin={CHART_CONFIG.margin}>
                        <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
                        <XAxis dataKey="month" {...CHART_CONFIG.xAxis} />
                        <YAxis
                          {...CHART_CONFIG.yAxis}
                          tickFormatter={(value) => formatNumber(value)}
                          domain={getOrganicYAxisDomain()}
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
                  </div>
                </div>
              )}
            </ChartContainer>
          </div>

          {/* Contextual Insight Card takes 32% width */}
          <div className="flex-[32] flex items-center">
            <ContextualInsightCard
              icon={TrendingUp}
              sentiment="positive"
              headline="Fortinet's Explosive Growth"
              body={[
                "Massive +142% keyword growth (139K → 337K Oct-Dec) signals major content/SEO initiatives paying off.",
                "Cisco maintains highest volume at 734K but shows flat growth—opportunity for Fortinet to gain market share."
              ]}
            />
          </div>
        </div>

        {/* Chart 2: Page 1 Keywords with contextual insight */}
        <div className="flex gap-6">
          {/* Chart takes 68% width */}
          <div className="flex-[68]">
            <ChartContainer
              title="Page 1 Keywords"
              actions={
                <EditButton
                  isEditing={isEditingPageOne}
                  onEdit={handleEditPageOne}
                  onSave={handleSavePageOne}
                  onCancel={handleCancelPageOne}
                />
              }
              height={280}
            >
              {isEditingPageOne ? (
                renderEditForm(editablePageOne, handlePageOneValueChange)
              ) : (
                <div className="h-full flex flex-col">
                  <div className="pb-3 border-b border-gray-200 mb-3">
                    <CompetitorFilter
                      competitors={COMPETITORS}
                      visibleCompetitors={visibleCompetitors}
                      onToggle={toggleCompetitor}
                    />
                  </div>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={pageOneChartData} margin={CHART_CONFIG.margin}>
                        <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
                        <XAxis dataKey="month" {...CHART_CONFIG.xAxis} />
                        <YAxis
                          {...CHART_CONFIG.yAxis}
                          tickFormatter={(value) => formatNumber(value)}
                          domain={getPageOneYAxisDomain()}
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
                  </div>
                </div>
              )}
            </ChartContainer>
          </div>

          {/* Contextual Insight Card takes 32% width */}
          <div className="flex-[32] flex items-center">
            <ContextualInsightCard
              icon={Target}
              sentiment="positive"
              headline="Best-in-Class Conversion Rate"
              body={[
                "Fortinet achieves 45K Page 1 keywords with 13.4% conversion rate—highest efficiency among all competitors in Jan.",
                "Cisco leads absolute Page 1 volume (89K), but Fortinet's conversion rate suggests superior content quality and relevance."
              ]}
            />
          </div>
        </div>

        {/* Executive Note (replaces global Key Insights) */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-900">
            <span className="font-semibold">Executive Summary:</span> Fortinet's keyword expansion dramatically outpaces competitors while maintaining exceptional Page 1 conversion efficiency—clear signal of content strategy success.
          </p>
        </div>
      </div>

      <SlideFooter source="Source: Semrush" />
    </SlideContainer>
  );
}
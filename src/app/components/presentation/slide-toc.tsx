import { ChevronRight, TrendingUp, Target, BarChart3, Sparkles, Link2, Lightbulb } from 'lucide-react';
import { SlideContainer, TEXT_STYLES, COLORS } from './design-system';

interface TOCProps {
  onNavigate: (slideIndex: number) => void;
  onNavigateHome?: () => void;
}

export function SlideTOC({ onNavigate, onNavigateHome }: TOCProps) {
  const sections = [
    {
      title: '1. Organic Traffic Overview',
      icon: TrendingUp,
      color: '#EF4444',
      items: [
        { label: 'Organic Traffic Overview (Tabbed)', slideIndex: 3 },
      ],
    },
    {
      title: '2. Keyword Performance Metrics',
      icon: Target,
      color: '#FF7AB6',
      items: [{ label: 'Keyword Opportunities & Rankings', slideIndex: 6 }],
    },
    {
      title: '3. Category-Wise Competitive Performance',
      icon: BarChart3,
      color: '#7ED957',
      items: [
        { label: 'NGFW / Firewall Category Performance', slideIndex: 8 },
        { label: 'SD-WAN Category Performance', slideIndex: 9 },
        { label: 'OT Security Category Performance', slideIndex: 10 },
        { label: 'SASE Category Performance', slideIndex: 11 },
        { label: 'Zero Trust Security Category Performance', slideIndex: 12 },
        { label: 'Cloud Security Category Performance', slideIndex: 13 },
      ],
    },
    {
      title: '4. LLM & AI Visibility Metrics',
      icon: Sparkles,
      color: '#FFB14A',
      items: [
        { label: 'Overall LLM Metrics', slideIndex: 15 },
        { label: 'Category-Wise LLM Metrics', slideIndex: 16 },
        { label: 'AI Overview Metrics', slideIndex: 17 },
      ],
    },
    {
      title: '5. Backlink Competitive Analysis',
      icon: Link2,
      color: '#6C9AFF',
      items: [{ label: 'Competition Backlink Performance', slideIndex: 19 }],
    },
    {
      title: '6. Competitive Intelligence Insights',
      icon: Lightbulb,
      color: '#FF8E5A',
      items: [
        { label: 'Fortinet – Competitive Intelligence Tips', slideIndex: 21 },
        { label: 'Keyword Gap Analysis', slideIndex: 22 },
      ],
    },
  ];

  return (
    <SlideContainer>
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className={`${TEXT_STYLES.slideTitle} text-[42px] mb-3`}>Table of Contents</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="flex-1 overflow-auto pb-12">
          <div className="max-w-6xl mx-auto px-12 grid grid-cols-2 gap-6">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200"
                >
                  {/* Section Title */}
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${section.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: section.color }} />
                    </div>
                    <h3 className="text-base font-bold text-gray-900">{section.title}</h3>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <button
                        key={itemIdx}
                        onClick={() => onNavigate(item.slideIndex)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all group"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-500 group-hover:translate-x-0.5 transition-all" />
                        <span className="flex-1 font-medium">{item.label}</span>
                        <span className="text-xs text-gray-400 font-medium">
                          Slide {item.slideIndex + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8">
          <p className="text-sm text-gray-500">
            Click any item to navigate directly to that slide
          </p>
        </div>
      </div>
    </SlideContainer>
  );
}
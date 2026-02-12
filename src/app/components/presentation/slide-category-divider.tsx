import { BarChart3, Shield, Network, Cloud, Lock } from 'lucide-react';
import { SlideContainer, TEXT_STYLES } from './design-system';

interface SlideCategoryDividerProps {
  onNavigateHome?: () => void;
  onNavigate?: (slideIndex: number) => void;
}

export function SlideCategoryDivider({ onNavigateHome, onNavigate }: SlideCategoryDividerProps) {
  const categories = [
    { name: 'NGFW / Firewall', color: '#EF4444', icon: Shield, slideIndex: 7 },
    { name: 'SD-WAN', color: '#FF7AB6', icon: Network, slideIndex: 8 },
    { name: 'OT Security', color: '#7ED957', icon: Shield, slideIndex: 9 },
    { name: 'SASE', color: '#FFB14A', icon: Cloud, slideIndex: 10 },
    { name: 'Zero Trust', color: '#6C9AFF', icon: Lock, slideIndex: 11 },
    { name: 'Cloud Security', color: '#1F2937', icon: Cloud, slideIndex: 12 },
  ];

  return (
    <SlideContainer slideNumber={7} onNavigateHome={onNavigateHome} source="Ahrefs">
      <div className="flex-1 flex flex-col justify-center items-center px-12">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full opacity-5 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-5 blur-3xl" />
        </div>

        {/* Icon Badge */}
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl mb-8">
          <BarChart3 className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-[64px] font-bold text-gray-900 mb-4 text-center leading-tight">
          Category-Wise Performance
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-14 text-center max-w-3xl">
          Deep-dive analysis across six key cybersecurity market segments
        </p>

        {/* Category Grid */}
        <div className="grid grid-cols-3 gap-6 max-w-5xl">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="group relative bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => onNavigate && onNavigate(category.slideIndex)}
              >
                {/* Category Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md"
                  style={{ backgroundColor: category.color }}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Category Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {category.name}
                </h3>

                {/* Color Indicator */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-1 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                </div>

                {/* Hover Effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
                  style={{ backgroundColor: category.color }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Indicator */}
        <div className="mt-14 flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-300" />
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            6 Categories
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-300" />
        </div>
      </div>
    </SlideContainer>
  );
}
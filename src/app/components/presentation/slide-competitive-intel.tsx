import { Brain, FileText, TrendingUp, ExternalLink } from 'lucide-react';
import { SlideContainer, SlideHeader, SlideFooter } from './design-system';

export function SlideCompetitiveIntel({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const newPages = [
    {
      title: 'Unrestricted Access Sensitive Business Flows',
      url: 'https://www.paloaltonetworks.com/cyberpedia/unrestricted-access-sensitive-business-flows',
      category: 'Access Control'
    },
    {
      title: 'Unrestricted Resource Consumption',
      url: 'https://www.paloaltonetworks.com/cyberpedia/unrestricted-resource-consumption',
      category: 'Resource Management'
    },
    {
      title: 'What is MLOps',
      url: 'https://www.paloaltonetworks.com/cyberpedia/what-is-mlops',
      category: 'AI/ML Operations'
    },
    {
      title: 'Broken Object Level Authorization (API1)',
      url: 'https://www.paloaltonetworks.com/cyberpedia/broken-object-level-authentication-api1',
      category: 'API Security'
    },
    {
      title: 'Security Misconfiguration (API8)',
      url: 'https://www.paloaltonetworks.com/cyberpedia/security-misconfiguration-api8',
      category: 'API Security'
    },
    {
      title: 'Small Business Cybersecurity Best Practices',
      url: 'https://www.paloaltonetworks.com/cyberpedia/small-business-cybersecurity-best-practices',
      category: 'SMB Security'
    },
    {
      title: 'Is Antivirus Enough for Small Businesses',
      url: 'https://www.paloaltonetworks.com/cyberpedia/is-antivirus-enough-for-small-businesses',
      category: 'SMB Security'
    },
    {
      title: 'Server-Side Request Forgery (API7)',
      url: 'https://www.paloaltonetworks.com/cyberpedia/server-side-request-forgery-api7',
      category: 'API Security'
    },
  ];

  return (
    <SlideContainer slideNumber={21} onNavigateHome={onNavigateHome}>
      <SlideHeader 
        title="Fortinet – Competitive Intelligence Tips" 
        subtitle="Key Insights & Strategic Actions"
      />

      <div className="flex-1 space-y-6">
        {/* Key Finding 1: AI Cybersecurity Category */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-[18px] font-bold text-gray-900">
                  1. <span className="text-orange-600 underline decoration-2 decoration-orange-400">Palo Alto</span> – AI Cybersecurity as Main Cyberpedia Category
                </h3>
                <div className="flex-shrink-0 px-3 py-1 bg-orange-500 text-white text-[11px] font-bold rounded-full">
                  50 PAGES
                </div>
              </div>
              <p className="text-[14px] text-gray-700 mb-3 leading-relaxed">
                <span className="bg-orange-200 px-1.5 py-0.5 rounded font-semibold">Palo Alto</span> has established <strong>AI Cybersecurity</strong> as one of the main categories under Cyberpedia with 50+ dedicated educational pages
              </p>
              <a
                href="https://www.paloaltonetworks.com/cyberpedia/artificial-intelligence-cybersecurity"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-orange-600 hover:text-orange-700 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                View AI Cybersecurity Category
              </a>
            </div>
          </div>
        </div>

        {/* Key Finding 2: New Pages Added */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <div className="flex items-start gap-4 mb-5">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-[18px] font-bold text-gray-900">
                  2. New Cyberpedia Pages Added in January 2026
                </h3>
                <div className="flex-shrink-0 px-3 py-1 bg-blue-500 text-white text-[11px] font-bold rounded-full">
                  8 NEW PAGES
                </div>
              </div>
              <p className="text-[14px] text-gray-600 mb-4">
                Recent content expansion focusing on API security, AI/ML operations, and SMB cybersecurity
              </p>
            </div>
          </div>

          {/* Pages Grid */}
          <div className="grid grid-cols-2 gap-3">
            {newPages.map((page, index) => (
              <a
                key={index}
                href={page.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                    {page.category}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
                </div>
                <h4 className="text-[13px] font-semibold text-gray-900 group-hover:text-blue-600 leading-tight">
                  {page.title}
                </h4>
              </a>
            ))}
          </div>
        </div>

        {/* Strategic Insight */}
      </div>

      <SlideFooter source="Source: Semrush" />
    </SlideContainer>
  );
}
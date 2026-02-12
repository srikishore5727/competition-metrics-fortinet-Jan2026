import { Search, AlertTriangle, Target, Users } from 'lucide-react';
import { useState } from 'react';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
} from './design-system';

// Missing Keywords Data (Image 1)
const missingKeywordsData = [
  { keyword: 'aiops platform', intent: 'Commercial, Informational', volume: 1300, kd: 47 },
  { keyword: 'what are cloud service providers', intent: 'Informational', volume: 140, kd: 38 },
  { keyword: 'why is zero trust important', intent: 'Informational', volume: 140, kd: 30 },
  { keyword: 'best product leadership in zero trust solutions', intent: 'Commercial', volume: 110, kd: 12 },
  { keyword: 'iot security companies', intent: 'Informational', volume: 110, kd: 25 },
  { keyword: 'types of network architecture', intent: 'Informational', volume: 90, kd: 29 },
  { keyword: 'zero-touch provisioning', intent: 'Informational', volume: 70, kd: 22 },
  { keyword: 'zero trust company', intent: 'Informational', volume: 50, kd: 62 },
];

// Untapped Keywords Data (Image 2)
const untappedKeywordsData = [
  { keyword: 'quantum cryptography', intent: 'Informational', volume: 14800, kd: 69 },
  { keyword: 'what is a quantum computer', intent: 'Informational', volume: 9900, kd: 86 },
  { keyword: 'ai data center', intent: 'Informational', volume: 2900, kd: 80 },
  { keyword: 'cloud network security', intent: 'Informational', volume: 2900, kd: 33 },
  { keyword: 'artificial intelligence solutions', intent: 'Informational', volume: 2400, kd: 71 },
  { keyword: 'industrial iot', intent: 'Informational', volume: 2400, kd: 57 },
  { keyword: 'iot platform', intent: 'Informational', volume: 2400, kd: 44 },
  { keyword: 'iot solutions', intent: 'Informational', volume: 2400, kd: 35 },
  { keyword: 'artificial intelligence machine learning', intent: 'Informational', volume: 1900, kd: 90 },
  { keyword: 'artificial intelligence models', intent: 'Informational', volume: 1900, kd: 64 },
  { keyword: 'iot technology', intent: 'Informational', volume: 1900, kd: 77 },
  { keyword: 'generative artificial intelligence', intent: 'Informational', volume: 1300, kd: 73 },
  { keyword: 'industrial iot solutions', intent: 'Informational', volume: 880, kd: 35 },
  { keyword: 'quantum computing definition', intent: 'Informational', volume: 880, kd: 83 },
  { keyword: 'define quantum computing', intent: 'Informational', volume: 720, kd: 81 },
  { keyword: 'quantum networks', intent: 'Informational', volume: 720, kd: 39 },
];

// Multi-Competitor Comparison Data / Weak Keywords (Image 3)
const multiCompetitorData = [
  { keyword: 'ai security', intent: 'Informational', volume: 4400, kd: 74, ft: 80, pa: 2, cisco: 33, hpe: 59, cp: 3 },
  { keyword: 'data center networking', intent: 'Informational', volume: 1000, kd: 32, ft: 56, pa: 41, cisco: 5, hpe: 1, cp: 35 },
  { keyword: 'ips and ids', intent: 'Informational', volume: 1000, kd: 39, ft: 23, pa: 3, cisco: 22, hpe: 1, cp: 17 },
  { keyword: 'cloud network protocols', intent: 'Informational', volume: 720, kd: 30, ft: 59, pa: 8, cisco: 46, hpe: 58, cp: 18 },
  { keyword: 'zero touch provisioning', intent: 'Informational', volume: 590, kd: 25, ft: 12, pa: 1, cisco: 6, hpe: 9, cp: 10 },
  { keyword: 'cloud network solutions', intent: 'Informational', volume: 390, kd: 52, ft: 89, pa: 65, cisco: 2, hpe: 44, cp: 29 },
  { keyword: 'enterprise datacenter', intent: 'Informational', volume: 320, kd: 15, ft: 58, pa: 15, cisco: 57, hpe: 1, cp: 33 },
];

// PA VS Fortinet Data (Image 4)
const paVsFortinetData = [
  { keyword: 'container security best practices', intent: 'Commercial', volume: 1000, kd: 17, ft: 0, pa: 33 },
  { keyword: 'cloud security posture management tools', intent: 'Commercial', volume: 1000, kd: 35, ft: 0, pa: 8 },
  { keyword: 'best saas security tools', intent: 'Commercial', volume: 390, kd: 6, ft: 0, pa: 10 },
  { keyword: 'cloud security checklist', intent: 'Informational', volume: 260, kd: 14, ft: 0, pa: 46 },
  { keyword: 'vulnerability scanning best practices', intent: 'Commercial', volume: 210, kd: 18, ft: 0, pa: 33 },
  { keyword: 'top aiops platform for cybersecurity', intent: 'Commercial', volume: 140, kd: 6, ft: 0, pa: 16 },
];

export function SlideKeywordGap({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<'missing' | 'untapped' | 'multiCompetitor' | 'paVsFt'>('missing');

  const getCurrentData = () => {
    switch (activeTab) {
      case 'missing': return missingKeywordsData;
      case 'untapped': return untappedKeywordsData;
      case 'multiCompetitor': return multiCompetitorData;
      case 'paVsFt': return paVsFortinetData;
    }
  };

  const getTabIcon = () => {
    switch (activeTab) {
      case 'missing': return AlertTriangle;
      case 'untapped': return Target;
      case 'multiCompetitor': return Users;
      case 'paVsFt': return Search;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'missing': return 'Missing Keywords';
      case 'untapped': return 'Untapped Keywords';
      case 'multiCompetitor': return 'Weak Keywords';
      case 'paVsFt': return 'PA VS Fortinet';
    }
  };

  const getTabDescription = () => {
    switch (activeTab) {
      case 'missing': return 'Critical gaps in Fortinet\'s content strategy';
      case 'untapped': return 'High-potential keywords with minimal competition';
      case 'multiCompetitor': return 'Competitive keyword comparison with ranking positions';
      case 'paVsFt': return 'Competitive keyword comparison with ranking positions';
    }
  };

  const IconComponent = getTabIcon();

  return (
    <SlideContainer slideNumber={22} onNavigateHome={onNavigateHome}>
      <SlideHeader 
        title="Keyword Gap" 
      />
      
      <div className="flex-1 flex flex-col gap-4 pb-4">
        {/* Main Tab Navigation - Curved Folder Style */}
        <div className="flex items-start gap-1">
          <button
            onClick={() => setActiveTab('missing')}
            className={`px-8 py-3 text-sm font-semibold transition-all duration-200 relative ${
              activeTab === 'missing'
                ? 'bg-white text-red-600 z-10'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
            }`}
            style={{
              borderRadius: '12px 12px 0 0',
              marginBottom: '-2px',
              boxShadow: activeTab === 'missing'
                ? '0 -2px 8px rgba(0, 0, 0, 0.08), 0 2px 0 0 white'
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            Missing Keywords
          </button>
          <button
            onClick={() => setActiveTab('untapped')}
            className={`px-8 py-3 text-sm font-semibold transition-all duration-200 relative ${
              activeTab === 'untapped'
                ? 'bg-white text-red-600 z-10'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
            }`}
            style={{
              borderRadius: '12px 12px 0 0',
              marginBottom: '-2px',
              boxShadow: activeTab === 'untapped'
                ? '0 -2px 8px rgba(0, 0, 0, 0.08), 0 2px 0 0 white'
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            Untapped Keywords
          </button>
          <button
            onClick={() => setActiveTab('multiCompetitor')}
            className={`px-8 py-3 text-sm font-semibold transition-all duration-200 relative ${
              activeTab === 'multiCompetitor'
                ? 'bg-white text-red-600 z-10'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
            }`}
            style={{
              borderRadius: '12px 12px 0 0',
              marginBottom: '-2px',
              boxShadow: activeTab === 'multiCompetitor'
                ? '0 -2px 8px rgba(0, 0, 0, 0.08), 0 2px 0 0 white'
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            Weak Keywords
          </button>
          <button
            onClick={() => setActiveTab('paVsFt')}
            className={`px-8 py-3 text-sm font-semibold transition-all duration-200 relative ${
              activeTab === 'paVsFt'
                ? 'bg-white text-red-600 z-10'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
            }`}
            style={{
              borderRadius: '12px 12px 0 0',
              marginBottom: '-2px',
              boxShadow: activeTab === 'paVsFt'
                ? '0 -2px 8px rgba(0, 0, 0, 0.08), 0 2px 0 0 white'
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            PA VS Fortinet
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                activeTab === 'paVsFt' ? 'bg-orange-50' :
                activeTab === 'untapped' ? 'bg-blue-50' : 'bg-red-50'
              }`}>
                <IconComponent className={`w-6 h-6 ${
                  activeTab === 'paVsFt' ? 'text-orange-500' :
                  activeTab === 'untapped' ? 'text-blue-500' : 'text-red-500'
                }`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{getTabTitle()}</h3>
                <p className="text-sm text-gray-600">{getTabDescription()}</p>
              </div>
            </div>

            {/* Table */}
            <div className="bg-gray-50 rounded-lg overflow-hidden flex-1">
              <div className="overflow-x-auto h-full max-h-[500px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-200 sticky top-0 z-20">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Keyword</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">
                        {activeTab === 'multiCompetitor' || activeTab === 'paVsFt' ? 'Intent' : 'Intents'}
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">
                        {activeTab === 'multiCompetitor' || activeTab === 'paVsFt' ? 'Volume' : 'Volume'}
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">KD</th>
                      {(activeTab === 'multiCompetitor' || activeTab === 'paVsFt') && (
                        <>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-red-50">FT</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-orange-50">PA</th>
                        </>
                      )}
                      {activeTab === 'multiCompetitor' && (
                        <>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-blue-50">CISCO</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-green-50">HPE</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-purple-50">CP</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {getCurrentData().map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-900">{row.keyword}</td>
                        <td className="px-4 py-3 text-gray-600 text-sm">{row.intent}</td>
                        <td className="px-4 py-3 text-center text-gray-900 font-medium">{row.volume.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{row.kd}</td>
                        {(activeTab === 'multiCompetitor' || activeTab === 'paVsFt') && 'ft' in row && (
                          <>
                            <td className="px-3 py-3 text-center font-semibold bg-red-50 text-red-700">{row.ft}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-orange-50 text-orange-700">{row.pa}</td>
                          </>
                        )}
                        {activeTab === 'multiCompetitor' && 'cisco' in row && (
                          <>
                            <td className="px-3 py-3 text-center font-semibold bg-blue-50 text-blue-700">{row.cisco}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-green-50 text-green-700">{row.hpe}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-purple-50 text-purple-700">{row.cp}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SlideFooter source="Source: Semrush Keyword Gap Tool" />
    </SlideContainer>
  );
}
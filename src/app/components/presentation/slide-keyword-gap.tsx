import { Search, AlertTriangle, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
  TEXT_STYLES,
} from './design-system';

// Import the keyword gap images
import missingKeywords from 'figma:asset/00ed087fd0ee6baa6df76013d12d7135d38132bf.png';

// Keyword data for Palo Alto vs Fortinet
const cloudKeywords = [
  { keyword: 'cloud network security', intent: 'Informational', volume: 2900, kd: 33, ft: 0, pa: 3 },
  { keyword: 'cloud security posture management tools', intent: 'Commercial', volume: 1000, kd: 35, ft: 0, pa: 8 },
  { keyword: 'cloud cyber security', intent: 'Informational', volume: 720, kd: 53, ft: 0, pa: 92 },
  { keyword: 'cloud security vulnerabilities', intent: 'Informational', volume: 390, kd: 33, ft: 0, pa: 16 },
  { keyword: 'security on cloud storage', intent: 'Informational', volume: 390, kd: 37, ft: 0, pa: 17 },
  { keyword: 'best cloud container security software', intent: 'Commercial', volume: 260, kd: 6, ft: 0, pa: 13 },
  { keyword: 'cloud database security', intent: 'Informational', volume: 260, kd: 14, ft: 0, pa: 19 },
  { keyword: 'sap cloud security', intent: 'Informational', volume: 260, kd: 49, ft: 0, pa: 66 },
  { keyword: 'shared responsibility model for cloud security', intent: 'Informational', volume: 260, kd: 45, ft: 0, pa: 6 },
  { keyword: 'cloud computing security challenges', intent: 'Informational', volume: 210, kd: 33, ft: 0, pa: 11 },
  { keyword: 'best container security for cloud platforms 2025', intent: 'Commercial', volume: 170, kd: 3, ft: 0, pa: 70 },
  { keyword: 'it security cloud', intent: 'Informational', volume: 170, kd: 65, ft: 0, pa: 37 },
  { keyword: 'security and privacy in cloud computing', intent: 'Informational', volume: 170, kd: 34, ft: 0, pa: 61 },
  { keyword: 'security challenges in cloud computing', intent: 'Informational', volume: 170, kd: 35, ft: 0, pa: 21 },
  { keyword: 'challenges of implementing ai in cloud security', intent: 'Commercial, Informational', volume: 140, kd: 15, ft: 0, pa: 7 },
  { keyword: 'best cloud storage for security', intent: 'Commercial', volume: 110, kd: 58, ft: 0, pa: 48 },
  { keyword: 'best container security solutions for cloud', intent: 'Commercial', volume: 110, kd: 17, ft: 0, pa: 7 },
  { keyword: 'cloud computing and security challenges', intent: 'Informational', volume: 110, kd: 18, ft: 0, pa: 16 },
  { keyword: 'cloud computing vs cyber security', intent: 'Commercial', volume: 110, kd: 15, ft: 0, pa: 58 },
];

const aiKeywords = [
  { keyword: 'ai cybersecurity threats', intent: 'Informational', volume: 390, kd: 73, ft: 0, pa: 3 },
  { keyword: 'best cloud container security software', intent: 'Commercial', volume: 260, kd: 6, ft: 0, pa: 13 },
  { keyword: 'evaluate the cybersecurity company living security on ai generated phishing', intent: 'Informational', volume: 210, kd: 0, ft: 0, pa: 65 },
  { keyword: 'agentic ai cybersecurity', intent: 'Informational', volume: 170, kd: 29, ft: 0, pa: 44 },
  { keyword: 'agentic ai in cybersecurity', intent: 'Informational', volume: 170, kd: 35, ft: 0, pa: 16 },
  { keyword: 'best container security for cloud platforms 2025', intent: 'Commercial', volume: 170, kd: 3, ft: 0, pa: 70 },
  { keyword: 'ai cybersecurity leaders', intent: 'Commercial, Informational', volume: 140, kd: 27, ft: 0, pa: 42 },
  { keyword: 'challenges of implementing ai in cloud security', intent: 'Commercial, Informational', volume: 140, kd: 15, ft: 0, pa: 7 },
  { keyword: 'best container security solutions for cloud', intent: 'Commercial', volume: 110, kd: 17, ft: 0, pa: 7 },
  { keyword: 'cybersecurity blockchain', intent: 'Informational', volume: 110, kd: 41, ft: 0, pa: 86 },
];

const quantumKeywords = [
  { keyword: 'quantum computing and cyber security', intent: 'Informational', volume: 170, kd: 52, ft: 0, pa: 1 },
  { keyword: 'quantum computing cybersecurity', intent: 'Informational', volume: 170, kd: 47, ft: 0, pa: 1 },
  { keyword: 'quantum securities', intent: 'Informational', volume: 140, kd: 13, ft: 0, pa: 6 },
];

// Weak Keywords data
const weakCloudNetworking = [
  { keyword: 'cloud network solutions', intent: 'Informational', volume: 390, kd: 52, ft: 89, pa: 65, cisco: 2, hpe: 44, cp: 29 },
  { keyword: 'hybrid wan solutions', intent: 'Informational', volume: 90, kd: 14, ft: 79, pa: 3, cisco: 14, hpe: 43, cp: 64 },
  { keyword: 'hybrid cloud software', intent: 'Informational', volume: 70, kd: 59, ft: 51, pa: 47, cisco: 6, hpe: 5, cp: 31 },
];

const weakIndustry = [
  { keyword: 'network solutions for education', intent: 'Informational', volume: 70, kd: 21, ft: 97, pa: 91, cisco: 3, hpe: 31, cp: 69 },
];

const weakZeroTrust = [
  { keyword: 'best zero trust security solutions 2025', intent: 'Commercial', volume: 110, kd: 32, ft: 94, pa: 57, cisco: 76, hpe: 59, cp: 87 },
  { keyword: 'best sd wan solution', intent: 'Commercial', volume: 50, kd: 15, ft: 93, pa: 16, cisco: 7, hpe: 50, cp: 12 },
];

const weakAISecurity = [
  { keyword: 'ai security', intent: 'Informational', volume: 4400, kd: 74, ft: 80, pa: 2, cisco: 33, hpe: 59, cp: 3 },
  { keyword: 'ai cloud security', intent: 'Informational', volume: 170, kd: 29, ft: 56, pa: 29, cisco: 12, hpe: 37, cp: 40 },
];

const weakIoT = [
  { keyword: 'enterprise iot', intent: 'Informational', volume: 210, kd: 30, ft: 87, pa: 8, cisco: 10, hpe: 73, cp: 29 },
  { keyword: 'iot endpoint', intent: 'Informational', volume: 70, kd: 24, ft: 83, pa: 24, cisco: 15, hpe: 52, cp: 48 },
];

const weakInfrastructure = [
  { keyword: 'cloud managed security', intent: 'Informational', volume: 110, kd: 25, ft: 47, pa: 35, cisco: 3, hpe: 5, cp: 19 },
  { keyword: 'it security infrastructure', intent: 'Informational', volume: 110, kd: 30, ft: 44, pa: 18, cisco: 27, hpe: 1, cp: 42 },
  { keyword: 'secure edge network', intent: 'Informational', volume: 70, kd: 40, ft: 43, pa: 4, cisco: 12, hpe: 19, cp: 23 },
];

const weakFirewall = [
  { keyword: 'nextgen firewall features', intent: 'Informational', volume: 70, kd: 32, ft: 7, pa: 2, cisco: 1, hpe: 6, cp: 5 },
];

// Missing Keywords data
const missingZeroTrust = [
  { keyword: 'best zero trust vendors for enterprise networks 2025', intent: 'Commercial', volume: 90, kd: 11 },
  { keyword: 'best product leadership in zero trust solutions', intent: 'Commercial', volume: 110, kd: 12 },
  { keyword: 'why is zero trust important', intent: 'Informational', volume: 140, kd: 30 },
  { keyword: 'global secure access client', intent: 'Informational', volume: 140, kd: 24 },
];

const missingCloudSecurity = [
  { keyword: 'cloud based service provider', intent: 'Informational', volume: 480, kd: 54 },
  { keyword: 'hybrid cloud computing solutions', intent: 'Informational', volume: 140, kd: 52 },
  { keyword: 'what are cloud service providers', intent: 'Informational', volume: 140, kd: 38 },
  { keyword: 'cloud network technology', intent: 'Informational', volume: 320, kd: 24 },
  { keyword: 'hybrid wan', intent: 'Informational', volume: 260, kd: 15 },
];

const missingNetworking = [
  { keyword: 'network management system', intent: 'Informational', volume: 880, kd: 50 },
  { keyword: 'manage network', intent: 'Informational', volume: 320, kd: 29 },
  { keyword: 'network software', intent: 'Informational', volume: 320, kd: 30 },
  { keyword: 'gre network', intent: 'Informational', volume: 720, kd: 27 },
  { keyword: 'mtu network', intent: 'Informational', volume: 720, kd: 31 },
  { keyword: 'what is an internet gateway', intent: 'Informational', volume: 320, kd: 30 },
  { keyword: 'network test solutions', intent: 'Commercial', volume: 140, kd: 18 },
];

const missingCybersecurity = [
  { keyword: 'ransomware recovery', intent: 'Informational', volume: 1300, kd: 54 },
  { keyword: 'secure gateway', intent: 'Informational', volume: 880, kd: 36 },
  { keyword: 'cyber security offerings', intent: 'Commercial / Informational', volume: 140, kd: 37 },
  { keyword: 'it infrastructure security services', intent: 'Informational', volume: 110, kd: 21 },
  { keyword: 'security management in it', intent: 'Informational', volume: 210, kd: 19 },
];

const missingIoT = [
  { keyword: 'enterprise iot services', intent: 'Informational', volume: 140, kd: 27 },
  { keyword: 'iot security companies', intent: 'Informational', volume: 110, kd: 25 },
];

const missingAI = [
  { keyword: 'ai-powered networking', intent: 'Informational', volume: 30, kd: 20 },
];

export function SlideKeywordGap({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [mainTab, setMainTab] = useState<'paVsFt' | 'missing' | 'weak'>('paVsFt');
  const [activeTab, setActiveTab] = useState<'cloud' | 'ai' | 'quantum'>('cloud');
  const [weakTab, setWeakTab] = useState<'cloudNet' | 'industry' | 'zeroTrust' | 'aiSec' | 'iot' | 'infra' | 'firewall'>('cloudNet');
  const [missingTab, setMissingTab] = useState<'zeroTrust' | 'cloudSec' | 'networking' | 'cybersec' | 'iot' | 'ai'>('zeroTrust');

  const getCurrentData = () => {
    switch (activeTab) {
      case 'cloud': return cloudKeywords;
      case 'ai': return aiKeywords;
      case 'quantum': return quantumKeywords;
    }
  };

  const getWeakKeywordsData = () => {
    switch (weakTab) {
      case 'cloudNet': return weakCloudNetworking;
      case 'industry': return weakIndustry;
      case 'zeroTrust': return weakZeroTrust;
      case 'aiSec': return weakAISecurity;
      case 'iot': return weakIoT;
      case 'infra': return weakInfrastructure;
      case 'firewall': return weakFirewall;
    }
  };

  const getWeakTabLabel = (tab: string) => {
    switch (tab) {
      case 'cloudNet': return 'Cloud/Hybrid';
      case 'industry': return 'Industry';
      case 'zeroTrust': return 'Zero Trust';
      case 'aiSec': return 'AI Security';
      case 'iot': return 'IoT/Edge';
      case 'infra': return 'Infrastructure';
      case 'firewall': return 'Firewall';
      default: return '';
    }
  };

  const getMissingKeywordsData = () => {
    switch (missingTab) {
      case 'zeroTrust': return missingZeroTrust;
      case 'cloudSec': return missingCloudSecurity;
      case 'networking': return missingNetworking;
      case 'cybersec': return missingCybersecurity;
      case 'iot': return missingIoT;
      case 'ai': return missingAI;
    }
  };

  const getMissingTabLabel = (tab: string) => {
    switch (tab) {
      case 'zeroTrust': return 'Zero Trust';
      case 'cloudSec': return 'Cloud Security';
      case 'networking': return 'Networking';
      case 'cybersec': return 'Cybersecurity';
      case 'iot': return 'IoT';
      case 'ai': return 'AI';
      default: return '';
    }
  };

  return (
    <SlideContainer slideNumber={22} onNavigateHome={onNavigateHome}>
      <SlideHeader 
        title="Keyword Gap Analysis" 
        subtitle="Palo Alto vs. Fortinet - Strategic Opportunities"
      />
      
      <div className="flex-1 flex flex-col gap-4 pb-4">
        {/* Main Tab Navigation - Curved Folder Style */}
        <div className="flex items-start gap-1">
          <button
            onClick={() => setMainTab('paVsFt')}
            className={`px-8 py-3 text-sm font-semibold transition-all duration-200 relative ${
              mainTab === 'paVsFt'
                ? 'bg-white text-red-600 z-10'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
            }`}
            style={{
              borderRadius: '12px 12px 0 0',
              marginBottom: '-2px',
              boxShadow: mainTab === 'paVsFt'
                ? '0 -2px 8px rgba(0, 0, 0, 0.08), 0 2px 0 0 white'
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            Palo Alto vs Fortinet Keywords
          </button>
          <button
            onClick={() => setMainTab('missing')}
            className={`px-8 py-3 text-sm font-semibold transition-all duration-200 relative ${
              mainTab === 'missing'
                ? 'bg-white text-red-600 z-10'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
            }`}
            style={{
              borderRadius: '12px 12px 0 0',
              marginBottom: '-2px',
              boxShadow: mainTab === 'missing'
                ? '0 -2px 8px rgba(0, 0, 0, 0.08), 0 2px 0 0 white'
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            Missing Keywords
          </button>
          <button
            onClick={() => setMainTab('weak')}
            className={`px-8 py-3 text-sm font-semibold transition-all duration-200 relative ${
              mainTab === 'weak'
                ? 'bg-white text-red-600 z-10'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
            }`}
            style={{
              borderRadius: '12px 12px 0 0',
              marginBottom: '-2px',
              boxShadow: mainTab === 'weak'
                ? '0 -2px 8px rgba(0, 0, 0, 0.08), 0 2px 0 0 white'
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            Weak Keywords
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Palo Alto vs Fortinet Keywords Tab */}
          {mainTab === 'paVsFt' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
                <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <Search className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Competitive Keyword Comparison</h3>
                  <p className="text-sm text-gray-600">Keywords where Fortinet has zero presence vs Palo Alto</p>
                </div>
              </div>
              
              {/* Sub-Tab Navigation */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('cloud')}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'cloud'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Cloud ({cloudKeywords.length})
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'ai'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  AI ({aiKeywords.length})
                </button>
                <button
                  onClick={() => setActiveTab('quantum')}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'quantum'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Quantum ({quantumKeywords.length})
                </button>
              </div>

              {/* Table */}
              <div className="bg-gray-50 rounded-lg overflow-hidden flex-1">
                <div className="overflow-x-auto h-full max-h-[450px] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-200 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Keyword</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Intent</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-900">Volume</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-900">KD</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-900 bg-red-50">FT</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-900 bg-orange-50">PA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {getCurrentData().map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-900">{row.keyword}</td>
                          <td className="px-4 py-3 text-gray-600 text-sm">{row.intent}</td>
                          <td className="px-4 py-3 text-center text-gray-900 font-medium">{row.volume.toLocaleString()}</td>
                          <td className="px-4 py-3 text-center text-gray-600">{row.kd}</td>
                          <td className="px-4 py-3 text-center font-semibold bg-red-50 text-red-700">{row.ft}</td>
                          <td className="px-4 py-3 text-center font-semibold bg-orange-50 text-orange-700">{row.pa}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Missing Keywords Tab */}
          {mainTab === 'missing' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Missing Keywords</h3>
                  <p className="text-sm text-gray-600">Critical gaps in Fortinet's content strategy</p>
                </div>
              </div>
              
              {/* Sub-Tab Navigation */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setMissingTab('zeroTrust')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    missingTab === 'zeroTrust'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Zero Trust ({missingZeroTrust.length})
                </button>
                <button
                  onClick={() => setMissingTab('cloudSec')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    missingTab === 'cloudSec'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Cloud Security ({missingCloudSecurity.length})
                </button>
                <button
                  onClick={() => setMissingTab('networking')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    missingTab === 'networking'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Networking ({missingNetworking.length})
                </button>
                <button
                  onClick={() => setMissingTab('cybersec')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    missingTab === 'cybersec'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Cybersecurity ({missingCybersecurity.length})
                </button>
                <button
                  onClick={() => setMissingTab('iot')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    missingTab === 'iot'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  IoT ({missingIoT.length})
                </button>
                <button
                  onClick={() => setMissingTab('ai')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    missingTab === 'ai'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  AI ({missingAI.length})
                </button>
              </div>

              {/* Table */}
              <div className="bg-gray-50 rounded-lg overflow-hidden flex-1">
                <div className="overflow-x-auto h-full max-h-[450px] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-200 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Keyword</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Intent</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-900">Volume</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-900">KD</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {getMissingKeywordsData().map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-900">{row.keyword}</td>
                          <td className="px-4 py-3 text-gray-600 text-sm">{row.intent}</td>
                          <td className="px-4 py-3 text-center text-gray-900 font-medium">{row.volume.toLocaleString()}</td>
                          <td className="px-4 py-3 text-center text-gray-600">{row.kd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Weak Keywords Tab */}
          {mainTab === 'weak' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
                <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Weak Keywords</h3>
                  <p className="text-sm text-gray-600">Underperforming keywords requiring optimization</p>
                </div>
              </div>
              
              {/* Sub-Tab Navigation */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setWeakTab('cloudNet')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    weakTab === 'cloudNet'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Cloud/Hybrid ({weakCloudNetworking.length})
                </button>
                <button
                  onClick={() => setWeakTab('industry')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    weakTab === 'industry'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Industry ({weakIndustry.length})
                </button>
                <button
                  onClick={() => setWeakTab('zeroTrust')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    weakTab === 'zeroTrust'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Zero Trust ({weakZeroTrust.length})
                </button>
                <button
                  onClick={() => setWeakTab('aiSec')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    weakTab === 'aiSec'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  AI Security ({weakAISecurity.length})
                </button>
                <button
                  onClick={() => setWeakTab('iot')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    weakTab === 'iot'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  IoT/Edge ({weakIoT.length})
                </button>
                <button
                  onClick={() => setWeakTab('infra')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    weakTab === 'infra'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Infrastructure ({weakInfrastructure.length})
                </button>
                <button
                  onClick={() => setWeakTab('firewall')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    weakTab === 'firewall'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Firewall ({weakFirewall.length})
                </button>
              </div>

              {/* Table */}
              <div className="bg-gray-50 rounded-lg overflow-hidden flex-1">
                <div className="overflow-x-auto h-full max-h-[450px] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-200 sticky top-0">
                      <tr>
                        <th className="px-3 py-3 text-left font-semibold text-gray-900">Keyword</th>
                        <th className="px-3 py-3 text-left font-semibold text-gray-900">Intent</th>
                        <th className="px-3 py-3 text-center font-semibold text-gray-900">Vol</th>
                        <th className="px-3 py-3 text-center font-semibold text-gray-900">KD</th>
                        <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-red-50">FT</th>
                        <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-orange-50">PA</th>
                        <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-blue-50">CISCO</th>
                        <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-green-50">HPE</th>
                        <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-purple-50">CP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {getWeakKeywordsData().map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-3 py-3 text-gray-900">{row.keyword}</td>
                          <td className="px-3 py-3 text-gray-600 text-sm">{row.intent}</td>
                          <td className="px-3 py-3 text-center text-gray-900 font-medium">{row.volume.toLocaleString()}</td>
                          <td className="px-3 py-3 text-center text-gray-600">{row.kd}</td>
                          <td className="px-3 py-3 text-center font-semibold bg-red-50 text-red-700">{row.ft}</td>
                          <td className="px-3 py-3 text-center font-semibold bg-orange-50 text-orange-700">{row.pa}</td>
                          <td className="px-3 py-3 text-center font-semibold bg-blue-50 text-blue-700">{row.cisco}</td>
                          <td className="px-3 py-3 text-center font-semibold bg-green-50 text-green-700">{row.hpe}</td>
                          <td className="px-3 py-3 text-center font-semibold bg-purple-50 text-purple-700">{row.cp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <SlideFooter source="Source: Semrush Keyword Gap Tool" />
    </SlideContainer>
  );
}
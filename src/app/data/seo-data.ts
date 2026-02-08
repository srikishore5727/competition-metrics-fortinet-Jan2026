// SEO Competitive Analysis Sample Data
// Timeframe: Sep 2025 → Jan 2026

export const MONTHS = ['2025-09', '2025-10', '2025-11', '2025-12', '2026-01'];
export const MONTH_LABELS = ['Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026'];

export const COMPETITORS = [
  { id: 'fortinet', name: 'Fortinet', color: '#EF4444' },
  { id: 'cisco', name: 'Cisco', color: '#FF7AB6' },
  { id: 'hpe', name: 'HPE', color: '#7ED957' },
  { id: 'paloalto', name: 'Palo Alto', color: '#FFB14A' },
  { id: 'checkpoint', name: 'Check Point', color: '#6C9AFF' },
  { id: 'crowdstrike', name: 'Crowdstrike', color: '#1F2937' },
];

// Organic Traffic (in thousands)
export const ORGANIC_TRAFFIC = {
  fortinet: [null, 4500000, 4400000, 4900000, 4800000],
  cisco: [null, 19700000, 33500000, 26300000, 4500000],
  hpe: [null, 1700000, 1600000, 1700000, 1600000],
  paloalto: [null, 1300000, 1000000, 1000000, 900000],
  checkpoint: [null, 1100000, 862000, 838000, 737000],
  crowdstrike: [null, 679000, 799000, 569000, 439000],
};

// Branded Traffic (in thousands)
export const BRANDED_TRAFFIC = {
  fortinet: [null, 878, 701, 593, 541],
  cisco: [null, 2170, 1870, 1670, 1510],
  hpe: [null, 482, 411, 413, 375],
  paloalto: [null, 303, 228, 257, 222],
  checkpoint: [null, 192, 180, 160, 158],
  crowdstrike: [null, 267, 218, 143, 109],
};

// Non-Branded Traffic (in thousands)
export const NON_BRANDED_TRAFFIC = {
  fortinet: [null, 3617, 3727, 4303, 4278],
  cisco: [null, 17545, 31655, 24630, 2957],
  hpe: [null, 1241, 1166, 1298, 1184],
  paloalto: [null, 951, 747, 722, 679],
  checkpoint: [null, 871, 682, 678, 679],
  crowdstrike: [null, 412, 580, 426, 330],
};

// Organic Keywords Overall (in thousands)
export const ORGANIC_KEYWORDS = {
  fortinet: [null, 296000, 296000, 300000, 337000],
  cisco: [null, 744000, 724000, 724000, 734000],
  hpe: [null, 197000, 202000, 225000, 231000],
  paloalto: [null, 163000, 166000, 183000, 189000],
  checkpoint: [null, 108000, 106000, 108000, 124000],
  crowdstrike: [null, 103000, 96000, 93000, 90000],
};

// Keywords Ranking on Page 1 (in thousands)
export const PAGE_ONE_KEYWORDS = {
  fortinet: [null, 42000, 41000, 42000, 45000],
  cisco: [null, 87000, 86000, 83000, 89000],
  hpe: [null, 25000, 25000, 25000, 26000],
  paloalto: [null, 20000, 20000, 20000, 24000],
  checkpoint: [null, 9000, 9000, 8000, 8000],
  crowdstrike: [null, 17000, 16000, 15000, 15000],
};

// Mock Domain Authority & Referring Domains
export const DOMAIN_AUTHORITY = {
  fortinet: [85, 86, 86, 87, 87],
  cisco: [92, 92, 93, 93, 93],
  hpe: [88, 88, 89, 89, 89],
  paloalto: [82, 83, 83, 84, 84],
  checkpoint: [79, 79, 80, 80, 81],
  crowdstrike: [86, 87, 87, 88, 88],
};

export const REFERRING_DOMAINS = {
  fortinet: [45000, 46200, 47100, 48300, 49200],
  cisco: [128000, 129500, 131000, 132800, 134200],
  hpe: [98000, 99100, 100200, 101500, 102800],
  paloalto: [38000, 39200, 40100, 41000, 42100],
  checkpoint: [32000, 32800, 33600, 34200, 35000],
  crowdstrike: [52000, 54100, 56300, 58200, 60100],
};

// Mock Top 20 Keywords
export const TOP_KEYWORDS = [
  { keyword: 'cybersecurity solutions', position: 2, trafficShare: 12.5, aiPresence: 'High', competitor: 'cisco' },
  { keyword: 'network firewall', position: 1, trafficShare: 18.3, aiPresence: 'Medium', competitor: 'fortinet' },
  { keyword: 'endpoint security', position: 3, trafficShare: 9.7, aiPresence: 'High', competitor: 'crowdstrike' },
  { keyword: 'cloud security platform', position: 4, trafficShare: 15.2, aiPresence: 'Medium', competitor: 'paloalto' },
  { keyword: 'enterprise networking', position: 1, trafficShare: 22.1, aiPresence: 'Low', competitor: 'cisco' },
  { keyword: 'threat intelligence', position: 5, trafficShare: 8.4, aiPresence: 'High', competitor: 'crowdstrike' },
  { keyword: 'zero trust security', position: 2, trafficShare: 11.9, aiPresence: 'High', competitor: 'paloalto' },
  { keyword: 'vpn gateway', position: 3, trafficShare: 10.2, aiPresence: 'Low', competitor: 'checkpoint' },
  { keyword: 'edge computing', position: 6, trafficShare: 7.8, aiPresence: 'Medium', competitor: 'hpe' },
  { keyword: 'network monitoring', position: 2, trafficShare: 13.6, aiPresence: 'Medium', competitor: 'cisco' },
  { keyword: 'malware protection', position: 4, trafficShare: 9.1, aiPresence: 'High', competitor: 'fortinet' },
  { keyword: 'siem solutions', position: 7, trafficShare: 6.3, aiPresence: 'Medium', competitor: 'crowdstrike' },
  { keyword: 'firewall software', position: 1, trafficShare: 16.7, aiPresence: 'Low', competitor: 'fortinet' },
  { keyword: 'hybrid cloud security', position: 5, trafficShare: 8.9, aiPresence: 'High', competitor: 'hpe' },
  { keyword: 'intrusion prevention', position: 3, trafficShare: 10.8, aiPresence: 'Medium', competitor: 'checkpoint' },
  { keyword: 'data center solutions', position: 4, trafficShare: 9.5, aiPresence: 'Low', competitor: 'hpe' },
  { keyword: 'next-gen firewall', position: 2, trafficShare: 14.2, aiPresence: 'Medium', competitor: 'paloalto' },
  { keyword: 'threat detection', position: 6, trafficShare: 7.1, aiPresence: 'High', competitor: 'crowdstrike' },
  { keyword: 'security analytics', position: 8, trafficShare: 5.9, aiPresence: 'High', competitor: 'cisco' },
  { keyword: 'network security', position: 1, trafficShare: 19.4, aiPresence: 'Medium', competitor: 'fortinet' },
];

// Quick Wins & Content Gap Insights
export const QUICK_WINS = [
  {
    title: 'Cisco: Major Organic Spike Investigation',
    description: 'Cisco shows massive traffic spike Oct-Nov (19.7M → 33.5M). Investigate content strategy, possible cannibalization, or data anomalies.',
    priority: 'high',
    impact: 'High',
  },
  {
    title: 'HPE: Consistent Performance',
    description: 'HPE maintains steady organic traffic (1.6-1.9M). Opportunity to amplify winning content and expand keyword coverage.',
    priority: 'medium',
    impact: 'Medium',
  },
  {
    title: 'Crowdstrike: Volatile Traffic Pattern',
    description: 'Crowdstrike shows inconsistent traffic (946k → 569k). Analyze seasonal trends and content freshness for stabilization.',
    priority: 'medium',
    impact: 'Medium',
  },
];

// LLM/AI Visibility Mock Data
export const AI_METRICS = {
  aiReadinessScore: 73,
  aiTriggeringQueries: 284,
  llmCitations: 156,
  topAIKeywords: ['cybersecurity solutions', 'zero trust security', 'threat intelligence', 'endpoint security'],
};

// Anomalies & Callouts
export const ANOMALIES = [
  { type: 'warning', message: 'Cisco: major organic spike Oct–Nov (19.7M → 33.5M)', competitor: 'cisco' },
  { type: 'alert', message: 'Cisco Non-Branded: large volume — confirm data source', competitor: 'cisco' },
  { type: 'info', message: 'Data note: null = no data reported for month', competitor: null },
  { type: 'warning', message: 'Multiple competitors missing Jan 2026 branded data', competitor: null },
];
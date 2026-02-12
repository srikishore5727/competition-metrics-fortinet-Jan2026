// import { ExternalLink, Lightbulb, TrendingUp, Target, Users, Sparkles, List } from 'lucide-react';
// import { useState } from 'react';
// import {
//   SlideContainer,
//   SlideHeader,
//   SlideFooter,
// } from './design-system';

// // Import screenshots
// import img1 from 'figma:asset/efdffb8fedc0324e77717d864d048138fc9b9e42.png';
// import img2 from 'figma:asset/c3483c5b3f0a4197f61541c5bcaed528c0764964.png';
// import img3 from 'figma:asset/f76bfbb1e8b45ab3500631f86231828330761496.png';
// import img4 from 'figma:asset/f52dc14b739318d932e67276bf1ebde6a968d9f0.png';
// import img5 from 'figma:asset/0a8bf43fea8fb119772adb54811dcf3ccbf8b2fd.png';
// import img6 from 'figma:asset/4bf3e4af771da4e343885470b9c1bcad58864fb6.png';
// import img7 from 'figma:asset/259e0e153dff2a50e1072654d0371102c3ba4404.png';

// interface Finding {
//   icon: any;
//   color: string;
//   bgColor: string;
//   title: string;
//   description: string;
//   competitor: string;
//   url: string;
//   urlDisplay: string;
//   screenshot?: string;
//   screenshot2?: string;
// }

// const findings: Finding[] = [
//   {
//     icon: Target,
//     color: '#EF4444',
//     bgColor: '#FEF2F2',
//     title: 'Taxonomy-Aligned Breadcrumbs',
//     description: 'Structured breadcrumb navigation reinforces category ownership and guides users through solution hierarchies while signaling topical relevance to LLMs.',
//     competitor: 'CrowdStrike',
//     url: 'https://www.crowdstrike.com/en-us/cybersecurity-101/cloud-security/ai-and-cloud-security/',
//     urlDisplay: 'crowdstrike.com/cybersecurity-101/cloud-security/ai-and-cloud-security',
//     screenshot: img1,
//   },
//   {
//     icon: Lightbulb,
//     color: '#F59E0B',
//     bgColor: '#FEF3C7',
//     title: 'LLM Friendly Takeaways',
//     description: 'Structured key takeaway sections optimize content for LLM parsing and citation, increasing likelihood of appearing in AI-generated responses.',
//     competitor: 'Wiz',
//     url: 'https://www.wiz.io/academy/ai-security/ai-risk-management',
//     urlDisplay: 'wiz.io/academy/ai-security/ai-risk-management',
//     screenshot: img2,
//   },
//   {
//     icon: Users,
//     color: '#8B5CF6',
//     bgColor: '#F5F3FF',
//     title: 'Lead Generation Touchpoints',
//     description: 'Strategic CTAs embedded within educational content convert high-intent readers into qualified leads without disrupting the learning experience.',
//     competitor: 'Wiz',
//     url: 'https://www.wiz.io/academy/ai-security/ai-risk-management',
//     urlDisplay: 'wiz.io/academy/ai-security/ai-risk-management',
//     screenshot: img3,
//   },
//   {
//     icon: TrendingUp,
//     color: '#10B981',
//     bgColor: '#D1FAE5',
//     title: 'Building Topical Authority',
//     description: 'Dedicated content hubs consolidate expertise around core themes, demonstrating depth of knowledge and establishing domain authority for LLM indexing.',
//     competitor: 'Palo Alto Networks',
//     url: 'https://www.paloaltonetworks.com/perspectives/',
//     urlDisplay: 'paloaltonetworks.com/perspectives',
//     screenshot: img6,
//   },
//   {
//     icon: List,
//     color: '#6C9AFF',
//     bgColor: '#EFF6FF',
//     title: 'LLM Dominance Through Listicles',
//     description: 'Aggregated vendor and tool comparisons drive LLM citations, as list-based formats align perfectly with how AI models structure recommendations.',
//     competitor: 'Check Point',
//     url: 'https://www.checkpoint.com/cyber-hub/tools-vendors/',
//     urlDisplay: 'checkpoint.com/cyber-hub/tools-vendors',
//     screenshot: img7,
//   },
//   {
//     icon: Sparkles,
//     color: '#3B82F6',
//     bgColor: '#DBEAFE',
//     title: 'Leveraging AI Messaging',
//     description: 'Homepage-level AI positioning establishes immediate brand association with emerging technologies, while competitor gaps present opportunity for differentiation.',
//     competitor: 'CrowdStrike vs Fortinet',
//     url: 'https://www.crowdstrike.com/en-us/',
//     urlDisplay: 'crowdstrike.com',
//     screenshot: img4, // CrowdStrike
//     screenshot2: img5, // Fortinet
//   },
// ];

// export function SlideCompetitiveFindings({ onNavigateHome }: { onNavigateHome?: () => void }) {
//   const [selectedFinding, setSelectedFinding] = useState<number>(0);
//   const [lightboxImage, setLightboxImage] = useState<string | null>(null);

//   return (
//     <SlideContainer slideNumber={23} onNavigateHome={onNavigateHome} source="">
//       <SlideHeader 
//         title="Competition Website Findings" 
//         subtitle="Strategic Observations from Competitor Websites"
//       />
      
//       <div className="flex-1 flex flex-col gap-4 pb-4 overflow-hidden">
//         {/* Top Panel - Horizontal Findings Buttons */}
//         <div className="flex-shrink-0 overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:opacity-0 hover:[&::-webkit-scrollbar]:opacity-100 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 transition-all">
//           <div className="flex gap-3 min-w-max">
//             {findings.map((finding, idx) => {
//               const Icon = finding.icon;
//               const isSelected = selectedFinding === idx;
              
//               return (
//                 <button
//                   key={idx}
//                   onClick={() => setSelectedFinding(idx)}
//                   className={`w-[220px] flex-shrink-0 text-left bg-white border-2 rounded-xl p-4 transition-all duration-200 ${
//                     isSelected 
//                       ? 'border-red-500 shadow-lg' 
//                       : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//                   }`}
//                 >
//                   <div className="flex items-center gap-3 mb-2">
//                     <div
//                       className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
//                       style={{ backgroundColor: finding.bgColor }}
//                     >
//                       <Icon className="w-5 h-5" style={{ color: finding.color }} />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">{finding.title}</h3>
//                     </div>
//                   </div>
//                   <span 
//                     className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block"
//                     style={{ 
//                       backgroundColor: finding.bgColor,
//                       color: finding.color 
//                     }}
//                   >
//                     {finding.competitor}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Bottom Panel - Screenshot Display */}
//         <div className="flex-1 bg-white border border-gray-200 rounded-xl p-5 flex flex-col overflow-hidden">
//           {/* Header */}
//           <div className="flex-shrink-0 flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
//             {(() => {
//               const Icon = findings[selectedFinding].icon;
//               return (
//                 <>
//                   <div
//                     className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
//                     style={{ backgroundColor: findings[selectedFinding].bgColor }}
//                   >
//                     <Icon className="w-6 h-6" style={{ color: findings[selectedFinding].color }} />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-base font-bold text-gray-900">{findings[selectedFinding].title}</h3>
//                     <p className="text-xs text-gray-600 mt-1">{findings[selectedFinding].description}</p>
//                     <a
//                       href={findings[selectedFinding].url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 transition-colors group mt-1"
//                     >
//                       <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
//                       <span className="truncate max-w-full">{findings[selectedFinding].urlDisplay}</span>
//                     </a>
//                   </div>
//                 </>
//               );
//             })()}
//           </div>

//           {/* Screenshot(s) - Fixed Display */}
//           <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 p-4 flex items-start justify-center overflow-y-auto">
//             {findings[selectedFinding].screenshot ? (
//               <div className="w-full space-y-3">
//                 {/* Main Screenshot */}
//                 <div 
//                   className="bg-white rounded-lg shadow-sm overflow-hidden cursor-zoom-in hover:shadow-md transition-shadow"
//                   onClick={() => setLightboxImage(findings[selectedFinding].screenshot!)}
//                 >
//                   <img
//                     src={findings[selectedFinding].screenshot}
//                     alt={findings[selectedFinding].title}
//                     className="w-full h-auto object-contain"
//                   />
//                 </div>

//                 {/* Second Screenshot for AI Messaging comparison */}
//                 {findings[selectedFinding].screenshot2 && (
//                   <>
//                     <div className="flex items-center gap-2">
//                       <div className="flex-1 h-px bg-gray-300" />
//                       <span className="text-xs font-semibold text-gray-500 px-2">VS</span>
//                       <div className="flex-1 h-px bg-gray-300" />
//                     </div>
//                     <div 
//                       className="bg-white rounded-lg shadow-sm overflow-hidden cursor-zoom-in hover:shadow-md transition-shadow"
//                       onClick={() => setLightboxImage(findings[selectedFinding].screenshot2!)}
//                     >
//                       <img
//                         src={findings[selectedFinding].screenshot2}
//                         alt="Fortinet AI Messaging"
//                         className="w-full h-auto object-contain"
//                       />
//                     </div>
//                   </>
//                 )}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-gray-100">
//                   <ExternalLink className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <p className="text-sm text-gray-500 font-medium">No screenshot available</p>
//                 <p className="text-xs text-gray-400 mt-1">Visit the link to view the content</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Lightbox Modal */}
//       {lightboxImage && (
//         <div 
//           className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-8"
//           onClick={() => setLightboxImage(null)}
//         >
//           <button
//             className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl font-light w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
//             onClick={() => setLightboxImage(null)}
//           >
//             ×
//           </button>
//           <div className="max-w-7xl max-h-full overflow-auto">
//             <img
//               src={lightboxImage}
//               alt="Enlarged view"
//               className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg shadow-2xl"
//               onClick={(e) => e.stopPropagation()}
//             />
//           </div>
//         </div>
//       )}

//       <SlideFooter />
//     </SlideContainer>
//   );
// }
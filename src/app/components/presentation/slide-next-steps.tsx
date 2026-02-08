import { CheckCircle2, Users, Calendar } from 'lucide-react';

export function SlideNextSteps() {
  const actions = [
    {
      category: 'Technical SEO',
      tasks: [
        { task: 'Validate data sources for Cisco traffic spike', impact: 'Critical', owner: 'Analytics Team', timeline: 'Week 1' },
        { task: 'Fix missing Jan 2026 data points across all competitors', impact: 'High', owner: 'Data Team', timeline: 'Week 1-2' },
        { task: 'Implement automated anomaly detection alerts', impact: 'Medium', owner: 'Dev Team', timeline: 'Week 3-4' },
      ],
    },
    {
      category: 'Content Strategy',
      tasks: [
        { task: 'Analyze Crowdstrike volatility patterns and content gaps', impact: 'High', owner: 'Content Team', timeline: 'Week 2' },
        { task: 'Expand HPE keyword coverage in top-performing categories', impact: 'Medium', owner: 'SEO Team', timeline: 'Week 2-3' },
        { task: 'Create AI-optimized content for high-presence keywords', impact: 'High', owner: 'Content Team', timeline: 'Week 3-6' },
      ],
    },
    {
      category: 'Backlinks & Authority',
      tasks: [
        { task: 'Launch outreach campaign to close DA gap with Cisco', impact: 'Medium', owner: 'PR Team', timeline: 'Ongoing' },
        { task: 'Audit referring domain quality across all competitors', impact: 'Medium', owner: 'SEO Team', timeline: 'Week 4' },
        { task: 'Develop link-building strategy for top 20 keywords', impact: 'High', owner: 'Marketing Team', timeline: 'Week 5-8' },
      ],
    },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-white p-8">
      <div className="max-w-5xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <div className="text-xs text-purple-600 font-semibold mb-2 uppercase tracking-wide">
            Slide 6 of 6
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Next Steps & Action Plan</h2>
          <p className="text-sm text-gray-600 mb-3">
            Prioritized actions with estimated impact and ownership
          </p>
        </div>

        {/* Action Categories */}
        <div className="flex-1 space-y-3 overflow-auto">
          {actions.map((category, catIndex) => (
            <div key={catIndex} className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
              <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                {category.category}
              </h3>

              <div className="space-y-1.5">
                {category.tasks.map((item, taskIndex) => (
                  <div
                    key={taskIndex}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50/50 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-900 font-medium">{item.task}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          item.impact === 'Critical'
                            ? 'bg-red-100 text-red-700'
                            : item.impact === 'High'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.impact}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Users className="w-3 h-3" />
                        <span>{item.owner}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>{item.timeline}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Source: Semrush (sample data; internal analysis)
          </div>
          <div className="text-xs text-gray-700 font-semibold">
            Questions? Contact: analysis@company.com
          </div>
        </div>
      </div>
    </div>
  );
}

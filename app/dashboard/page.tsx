import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Dashboard | PathForge',
  description: 'Your career journey dashboard',
};

const stats = [
  { label: 'Career Progress', value: '42%', change: '+5%' },
  { label: 'Tasks Completed', value: '12', change: '+3 this week' },
  { label: 'Current Streak', value: '7 days', change: 'Keep it up!' },
  { label: 'Portfolio Items', value: '8', change: '+2 new' },
];

const recentActivity = [
  {
    title: 'Completed: JavaScript Fundamentals',
    description: 'Work Simulator - Basic JavaScript',
    time: '2 hours ago',
    icon: '✅',
  },
  {
    title: 'Updated Portfolio',
    description: 'Added 2 new projects to your portfolio',
    time: '5 hours ago',
    icon: '📝',
  },
  {
    title: 'Unlocked Achievement',
    description: 'First Week: Completed 7 tasks in a week',
    time: '1 day ago',
    icon: '🏆',
  },
  {
    title: 'Career Path Recommendation',
    description: 'New roadmap available: Full Stack Developer',
    time: '2 days ago',
    icon: '🎯',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-foreground font-sans">{stat.value}</div>
              <span className="text-xs text-green-600 font-semibold">{stat.change}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground font-sans">Career Roadmap</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Frontend Basics', progress: 100, status: 'Completed' },
              { title: 'Backend Development', progress: 60, status: 'In Progress' },
              { title: 'Full Stack Integration', progress: 20, status: 'In Progress' },
              { title: 'DevOps & Deployment', progress: 0, status: 'Not Started' },
            ].map((roadmap, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground text-sm">{roadmap.title}</span>
                  <span className="text-xs text-muted-foreground">{roadmap.status}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${roadmap.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground font-sans mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Button className="w-full justify-start bg-primary hover:bg-primary/90 text-white">
              <span className="mr-2">🚀</span>Start New Simulator
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-2">📊</span>View Career GPS
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-2">📝</span>Update Portfolio
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-2">🎯</span>Browse Roadmaps
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground font-sans mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0">
              <div className="text-2xl">{activity.icon}</div>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Work Simulator | PathForge',
  description: 'Practice real-world work scenarios',
};

const simulators = [
  {
    id: 1,
    title: 'Build a Personal Blog',
    category: 'Frontend',
    difficulty: 'Beginner',
    duration: '45 min',
    xp: 250,
    completed: true,
    description: 'Create a responsive personal blog using HTML, CSS, and JavaScript',
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
  },
  {
    id: 2,
    title: 'REST API Development',
    category: 'Backend',
    difficulty: 'Intermediate',
    duration: '90 min',
    xp: 500,
    completed: false,
    description: 'Build a complete REST API with Node.js and Express',
    skills: ['Node.js', 'Express', 'REST APIs', 'Databases'],
  },
  {
    id: 3,
    title: 'E-Commerce Product Page',
    category: 'Frontend',
    difficulty: 'Intermediate',
    duration: '60 min',
    xp: 350,
    completed: false,
    description: 'Design and build an interactive product page with shopping cart',
    skills: ['React', 'State Management', 'CSS', 'UX Design'],
  },
  {
    id: 4,
    title: 'Database Design & SQL',
    category: 'Backend',
    difficulty: 'Intermediate',
    duration: '75 min',
    xp: 400,
    completed: false,
    description: 'Design a database schema and write complex SQL queries',
    skills: ['SQL', 'Database Design', 'Data Modeling'],
  },
  {
    id: 5,
    title: 'Real-time Chat Application',
    category: 'Full Stack',
    difficulty: 'Advanced',
    duration: '120 min',
    xp: 750,
    completed: false,
    description: 'Build a real-time chat app with WebSockets',
    skills: ['WebSockets', 'React', 'Node.js', 'Real-time'],
  },
  {
    id: 6,
    title: 'Authentication System',
    category: 'Backend',
    difficulty: 'Advanced',
    duration: '100 min',
    xp: 600,
    completed: false,
    description: 'Implement JWT authentication and session management',
    skills: ['Authentication', 'JWT', 'Security', 'Backend'],
  },
];

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-100 text-green-800';
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'Advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'Frontend':
      return 'bg-blue-100 text-blue-800';
    case 'Backend':
      return 'bg-purple-100 text-purple-800';
    case 'Full Stack':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default function SimulatorPage() {
  const totalXP = simulators.filter(s => s.completed).reduce((acc, s) => acc + s.xp, 0);
  const completedCount = simulators.filter(s => s.completed).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-sans mb-2">Work Simulator</h1>
        <p className="text-muted-foreground">
          Practice real-world projects and build your portfolio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Total XP Earned</p>
          <p className="text-3xl font-bold text-primary font-sans">{totalXP}</p>
          <p className="text-xs text-muted-foreground mt-2">Level 5 • Next: {1000 - totalXP} XP</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Completed Simulations</p>
          <p className="text-3xl font-bold text-primary font-sans">{completedCount}</p>
          <p className="text-xs text-muted-foreground mt-2">of {simulators.length} total</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
          <p className="text-3xl font-bold text-orange-600 font-sans">5 days</p>
          <p className="text-xs text-muted-foreground mt-2">Keep it up!</p>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        {['All', 'Frontend', 'Backend', 'Full Stack', 'Beginner', 'Completed'].map((filter) => (
          <Button
            key={filter}
            variant={filter === 'All' ? 'default' : 'outline'}
            size="sm"
            className={filter === 'All' ? 'bg-primary text-white' : ''}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {simulators.map((simulator) => (
          <Card
            key={simulator.id}
            className={`p-6 hover:shadow-lg transition-shadow ${
              simulator.completed ? 'border-green-200 bg-green-50/30' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-foreground">{simulator.title}</h3>
                  {simulator.completed && <span className="text-green-600">✓</span>}
                </div>
                <p className="text-sm text-muted-foreground">{simulator.description}</p>
              </div>
              <span className="text-2xl font-bold text-yellow-600">{simulator.xp}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border">
              <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(simulator.category)}`}>
                {simulator.category}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(simulator.difficulty)}`}>
                {simulator.difficulty}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">
                {simulator.duration}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Skills Learned</p>
              <div className="flex flex-wrap gap-2">
                {simulator.skills.map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-muted rounded text-xs text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {simulator.completed ? (
              <Button variant="outline" className="w-full">
                Review Solution
              </Button>
            ) : (
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                Start Challenge
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

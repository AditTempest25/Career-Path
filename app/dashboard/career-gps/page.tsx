import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Career GPS | PathForge',
  description: 'Find your ideal career path',
};

const careersData = [
  {
    title: 'Full Stack Developer',
    description: 'Build end-to-end web applications',
    match: 87,
    skills: ['JavaScript', 'React', 'Node.js', 'Databases'],
    avgSalary: '$120,000 - $180,000',
    demand: 'Very High',
  },
  {
    title: 'Frontend Engineer',
    description: 'Create beautiful user interfaces',
    match: 92,
    skills: ['React', 'Vue', 'CSS', 'UX Design'],
    avgSalary: '$110,000 - $160,000',
    demand: 'High',
  },
  {
    title: 'Backend Engineer',
    description: 'Build scalable server systems',
    match: 78,
    skills: ['Node.js', 'Python', 'Databases', 'APIs'],
    avgSalary: '$115,000 - $170,000',
    demand: 'Very High',
  },
  {
    title: 'DevOps Engineer',
    description: 'Manage cloud infrastructure',
    match: 65,
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    avgSalary: '$130,000 - $190,000',
    demand: 'High',
  },
];

function getMatchColor(match: number) {
  if (match >= 80) return 'text-green-600';
  if (match >= 60) return 'text-yellow-600';
  return 'text-orange-600';
}

export default function CareerGPSPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-sans mb-2">Career GPS</h1>
        <p className="text-muted-foreground">
          Discover career paths aligned with your skills and goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Your Top Match</p>
          <p className="text-2xl font-bold text-primary font-sans">Frontend Engineer</p>
          <p className="text-xs text-muted-foreground mt-2">92% compatibility</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Skills Gap</p>
          <p className="text-2xl font-bold text-orange-600 font-sans">3 skills</p>
          <p className="text-xs text-muted-foreground mt-2">to master</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Time to Goal</p>
          <p className="text-2xl font-bold text-blue-600 font-sans">6-8 months</p>
          <p className="text-xs text-muted-foreground mt-2">estimated</p>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground font-sans mb-4">Recommended Careers</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {careersData.map((career, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{career.title}</h3>
                  <p className="text-sm text-muted-foreground">{career.description}</p>
                </div>
                <div className={`text-right ${getMatchColor(career.match)}`}>
                  <p className="text-2xl font-bold">{career.match}%</p>
                  <p className="text-xs">Match</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground font-semibold mb-2">Key Skills</p>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-muted rounded-full text-xs text-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Average Salary</p>
                  <p className="font-semibold text-sm text-foreground">{career.avgSalary}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Market Demand</p>
                  <p className="font-semibold text-sm text-green-600">{career.demand}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">
                  View Roadmap
                </Button>
                <Button variant="outline" className="flex-1">
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="text-lg font-bold text-foreground font-sans mb-2">Career Assessment Quiz</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Take our 10-minute assessment to get personalized career recommendations based on your interests and skills.
        </p>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          Start Assessment
        </Button>
      </Card>
    </div>
  );
}

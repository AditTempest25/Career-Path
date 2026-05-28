import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Roadmaps | PathForge',
  description: 'Career development roadmaps',
};

const roadmaps = [
  {
    title: 'Full Stack Developer Roadmap',
    duration: '12-16 weeks',
    level: 'Intermediate',
    progress: 25,
    modules: 8,
    enrolled: true,
    tasks: [
      { title: 'Frontend Fundamentals', completed: true },
      { title: 'React & State Management', completed: true },
      { title: 'Backend Basics', completed: false },
      { title: 'Databases & SQL', completed: false },
      { title: 'API Development', completed: false },
    ],
  },
  {
    title: 'Data Science Path',
    duration: '10-14 weeks',
    level: 'Intermediate',
    progress: 0,
    modules: 7,
    enrolled: false,
    tasks: [
      { title: 'Python Fundamentals', completed: false },
      { title: 'Data Analysis with Pandas', completed: false },
      { title: 'Machine Learning Basics', completed: false },
    ],
  },
  {
    title: 'Mobile App Developer',
    duration: '14-18 weeks',
    level: 'Advanced',
    progress: 0,
    modules: 9,
    enrolled: false,
    tasks: [
      { title: 'React Native Setup', completed: false },
      { title: 'Building UI Components', completed: false },
      { title: 'State Management', completed: false },
    ],
  },
  {
    title: 'UX/UI Designer to Developer',
    duration: '8-10 weeks',
    level: 'Beginner',
    progress: 50,
    modules: 6,
    enrolled: true,
    tasks: [
      { title: 'Design Fundamentals', completed: true },
      { title: 'HTML & CSS Basics', completed: true },
      { title: 'JavaScript Essentials', completed: false },
      { title: 'Building with Figma to Code', completed: false },
    ],
  },
];

export default function RoadmapsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-sans mb-2">Learning Roadmaps</h1>
        <p className="text-muted-foreground">
          Structured paths to master in-demand skills
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {['All', 'Enrolled', 'Beginner', 'Intermediate', 'Advanced'].map((filter) => (
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

      <div className="grid grid-cols-1 gap-6">
        {roadmaps.map((roadmap, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{roadmap.title}</h3>
                    <div className="flex gap-3 mt-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {roadmap.duration}
                      </span>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        {roadmap.level}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {roadmap.modules} modules
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Progress</span>
                    <span className="text-sm font-semibold text-primary">{roadmap.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${roadmap.progress}%` }}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Learning Modules</p>
                  <div className="space-y-2">
                    {roadmap.tasks.map((task, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          readOnly
                          className="w-5 h-5 rounded border-border cursor-pointer"
                        />
                        <span
                          className={`text-sm ${
                            task.completed
                              ? 'text-muted-foreground line-through'
                              : 'text-foreground'
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 lg:w-40">
                {roadmap.enrolled ? (
                  <>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Continue Learning
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Enroll Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      Preview
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

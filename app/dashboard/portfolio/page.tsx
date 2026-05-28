import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Portfolio | PathForge',
  description: 'Showcase your work and projects',
};

const portfolioItems = [
  {
    id: 1,
    title: 'Personal Portfolio Website',
    description: 'A fully responsive portfolio showcasing my skills and projects',
    image: '/images/portfolio-1.jpg',
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    link: '#',
    date: 'March 2024',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A real-time collaborative task management application',
    image: '/images/portfolio-2.jpg',
    technologies: ['React', 'Firebase', 'Material-UI'],
    link: '#',
    date: 'February 2024',
    featured: true,
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Weather app with real-time data and location-based forecasts',
    image: '/images/portfolio-3.jpg',
    technologies: ['Vue.js', 'API Integration', 'Chart.js'],
    link: '#',
    date: 'January 2024',
    featured: false,
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration',
    image: '/images/portfolio-4.jpg',
    technologies: ['Node.js', 'MongoDB', 'Stripe', 'React'],
    link: '#',
    date: 'December 2023',
    featured: false,
  },
  {
    id: 5,
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media management',
    image: '/images/portfolio-5.jpg',
    technologies: ['React', 'Redux', 'D3.js'],
    link: '#',
    date: 'November 2023',
    featured: false,
  },
  {
    id: 6,
    title: 'Fitness Tracking App',
    description: 'Mobile-friendly app for tracking workouts and nutrition',
    image: '/images/portfolio-6.jpg',
    technologies: ['React Native', 'Express.js', 'PostgreSQL'],
    link: '#',
    date: 'October 2023',
    featured: false,
  },
];

export default function PortfolioPage() {
  const featured = portfolioItems.filter(item => item.featured);
  const all = portfolioItems;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-sans mb-2">Portfolio</h1>
          <p className="text-muted-foreground">
            Showcase your best work and impress potential employers
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          Add Project
        </Button>
      </div>

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <h2 className="text-lg font-bold text-foreground font-sans mb-2">Public Portfolio URL</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value="pathforge.io/user/your-portfolio"
            readOnly
            className="flex-1 px-3 py-2 bg-white border border-border rounded-lg text-sm"
          />
          <Button variant="outline">Copy</Button>
          <Button variant="outline">View Public</Button>
        </div>
      </Card>

      {featured.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-foreground font-sans mb-4">Featured Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featured.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-6xl">🖼️</p>
                    <p className="text-sm text-muted-foreground mt-2">Project Image</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border">
                    {item.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-muted rounded text-xs text-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                        GitHub
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-foreground font-sans mb-4">All Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {all.map((item) => (
            <Card
              key={item.id}
              className={`overflow-hidden hover:shadow-lg transition-shadow ${
                item.featured ? 'hidden lg:block' : ''
              }`}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <p className="text-4xl">🖼️</p>
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-muted rounded text-xs text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                  <Button variant="ghost" size="sm" className="h-7">
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground font-sans mb-3">Tips for an Amazing Portfolio</h2>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-3">
            <span>✓</span>
            <span>Showcase 3-5 of your best projects that demonstrate different skills</span>
          </li>
          <li className="flex gap-3">
            <span>✓</span>
            <span>Include detailed descriptions of what you built and your role</span>
          </li>
          <li className="flex gap-3">
            <span>✓</span>
            <span>Add links to live demos and GitHub repositories</span>
          </li>
          <li className="flex gap-3">
            <span>✓</span>
            <span>Use high-quality screenshots or videos of your projects</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

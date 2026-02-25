import SidebarFilter from './SidebarFilter';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'AI Study Buddy',
    tech: ['Python', 'React'],
    price: 49,
    verified: true,
  },
  {
    title: 'Resume Builder',
    tech: ['Next.js', 'Tailwind'],
    price: 29,
    verified: false,
  },
  {
    title: 'Exam Scheduler',
    tech: ['Java', 'Spring'],
    price: 59,
    verified: true,
  },
];

export default function Marketplace() {
  // Filtering logic would go here
  return (
    <section id="explore" className="flex gap-8 px-8 py-16">
      <SidebarFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
        {projects.map((p, i) => (
          <ProjectCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}

import { Project } from '../types/project';

let projects: Project[] = [
  {
    id: '1',
    title: 'Dev Portfolio',
    description: 'A personal site to showcase my work',
    status: 'Completed',
    techStack: ['Next.js', 'TypeScript', 'Tailwind'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'E-commerce Store',
    description: 'A full-stack e-commerce application',
    status: 'In Progress',
    techStack: ['React', 'Node.js', 'MongoDB'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Blog Platform',
    description: 'A blogging platform with user authentication',
    status: 'Backlog',
    techStack: ['Gatsby', 'GraphQL', 'Contentful'],
    createdAt: new Date().toISOString(),
  },
];

export const getProjects = () => projects;

export const addProject = (p: Omit<Project, 'id' | 'createdAt'>) => {
  const maxId = Math.max(...projects.map(p => parseInt(p.id)), 0);
  const newProj: Project = {
    ...p,
    id: (maxId + 1).toString(),
    createdAt: new Date().toISOString(),
  };
  console.log(newProj);
  projects.push(newProj);
  return newProj;
};

export const updateProject = (id: string, data: Partial<Project>) => {
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return null as any;
  projects[idx] = { ...projects[idx], ...data };
  return projects[idx];
};


export const deleteProject = (id: string) => {
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const [removed] = projects.splice(idx, 1);
  return removed;
};

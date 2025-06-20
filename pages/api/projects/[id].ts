import { NextApiRequest, NextApiResponse } from 'next';
import { getProjects, updateProject, deleteProject } from '../../../lib/projectsStore';
import { Project, Methods} from '../../../types/project';

export default function handler(req: NextApiRequest, res: NextApiResponse<Project | { message: string } | { error: string }>) {
  const { id } = req.query as { id: string };

  if (req.method === Methods.DELETE) {
    deleteProject(id);
    return res.status(204).json({ message: 'Deleted' });
  }

  if (req.method === Methods.PUT) {
    const updated = updateProject(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.status(200).json(updated);
  }


  const project = getProjects().find((p) => p.id === id);
  if (!project) return res.status(404).json({ error: 'Project not found' });

  if (req.method === Methods.GET) {
    return res.status(200).json(project);
  }

  res.setHeader('Allow', [Methods.GET, Methods.PUT, Methods.DELETE]);
  return res.status(405).json({ error: 'Method not allowed' });
}

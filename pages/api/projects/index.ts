import { NextApiRequest, NextApiResponse } from 'next';
import { getProjects, addProject } from '../../../lib/projectsStore';
import { Project, Methods } from '../../../types/project';

export default function handler(req: NextApiRequest, res: NextApiResponse<Project | Project[] | { error: string }>) {
  if (req.method === Methods.GET) {
    return res.status(200).json(getProjects());
  }

  if (req.method === Methods.POST) {
    const { title, description, status, techStack } = req.body;
    if (!title || !description || !status) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const newProj = addProject({ title, description, status, techStack: techStack || [] });
    return res.status(201).json(newProj);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: 'Method not allowed' });
}

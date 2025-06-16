export type Project = {
  id: string;
  title: string;
  description: string;
  status: 'Backlog' | 'In Progress' | 'Completed';
  techStack: string[];
  createdAt: string;
};

export const Methods = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  POST: 'POST',
}
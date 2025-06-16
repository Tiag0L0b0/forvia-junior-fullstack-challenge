import { getProjects, addProject, updateProject, deleteProject } from '../../lib/projectsStore';

describe('Project Store', () => {
    it('should get all projects', () => {
        const projects = getProjects();
        expect(Array.isArray(projects)).toBe(true);
        expect(projects.length).toBeGreaterThan(0);
    });

    it('should add a new project', () => {
        const newProject = {
            title: 'Test Project',
            description: 'Test Description',
            status: 'In Progress',
            techStack: ['Jest', 'TypeScript']
        };

        const added = addProject(newProject);
        expect(added).toMatchObject(newProject);
        expect(added.id).toBeDefined();
        expect(added.createdAt).toBeDefined();
    });

    it('should update an existing project', () => {
        const projects = getProjects();
        const projectToUpdate = projects[0];
        const updatedData = {
            title: 'Updated Title'
        };

        const updated = updateProject(projectToUpdate.id, updatedData);
        expect(updated.title).toBe(updatedData.title);
        expect(updated.id).toBe(projectToUpdate.id);
    });

    it('should delete a project', () => {
        const projects = getProjects();
        const projectToDelete = projects[0];
        const initialLength = projects.length;

        deleteProject(projectToDelete.id);
        const afterDelete = getProjects();

        expect(afterDelete.length).toBe(initialLength - 1);
        expect(afterDelete.find(p => p.id === projectToDelete.id)).toBeUndefined();
    });
});

import { createMocks } from 'node-mocks-http';
import handler from '../../../pages/api/projects';
import { Methods } from '../../../types/project';

describe('/api/projects endpoint', () => {
    it('should return projects list for GET request', async () => {
        const { req, res } = createMocks({
            method: Methods.GET,
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);
        const data = JSON.parse(res._getData());
        expect(Array.isArray(data)).toBe(true);
    });

    it('should create new project for POST request', async () => {
        const { req, res } = createMocks({
            method: Methods.POST,
            body: {
                title: 'Test Project',
                description: 'Test Description',
                status: 'In Progress',
                techStack: ['Test']
            },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(201);
        const data = JSON.parse(res._getData());
        expect(data.title).toBe('Test Project');
    });

    it('should return 400 for POST request with missing fields', async () => {
        const { req, res } = createMocks({
            method: Methods.POST,
            body: {
                title: 'Test Project'
            },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(400);
    });
});

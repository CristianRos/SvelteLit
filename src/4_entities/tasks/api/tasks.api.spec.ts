/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { testClient } from 'hono/testing';

import { app } from '$/_infra/backend/api/hono.server';
import { db } from '$/_infra/database/api/db';

import * as HttpStatusCodes from 'stoker/http-status-codes';
import { 
  expectInternalServerError,
  expectNoContent,
  expectNotFound,
  expectUnprocessableEntity
} from '$/_infra/backend/test/assertions';


vi.mock('$/_infra/database/api/db', () => {
  return {
    db: {
      query: {
        tasks: {
          findMany: vi.fn(),
          findFirst: vi.fn(),
        }
      },
      insert: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    }
  }
});


vi.mock('drizzle-orm', async () => {
  return {
    eq: vi.fn(),
  };
});


describe('Tasks API', () => {
  const mockedApi = testClient(app).api;
  const mockedDb = db as any;

  const mockTasks = [
    { 
      id: 1,
      title: 'Learn Vitest',
      description: 'Write tests for handlers',
      completed: false,
      createdAt: '2025-07-01T10:00:00Z',
      updatedAt: '2025-07-01T10:00:00Z'
    },
  ];

  
  describe('list', () => {
    it('should return a list of tasks when found', async () => {
      mockedDb.query.tasks.findMany.mockResolvedValue(mockTasks);
  
      const res = await mockedApi.tasks.$get(); 
  
      expect(res.status).toBe(HttpStatusCodes.OK);
      expect(await res.json()).toEqual(mockTasks);
    });
  
    it('should return an empty array if no tasks are found', async () => {
      mockedDb.query.tasks.findMany.mockResolvedValue([]);
  
      const res = await mockedApi.tasks.$get();
  
      expect(res.status).toBe(HttpStatusCodes.OK);
      expect(await res.json()).toEqual([]);
    });
  
    it('should return an error if the database query fails', async () => {
      mockedDb.query.tasks.findMany.mockRejectedValue(new Error('Database error'));
  
      const res = await mockedApi.tasks.$get();
  
      await expectInternalServerError(res);
    });
  });
  
  describe('create', () => {
    const validCreateJson = {
      title: 'Learn Vitest',
      description: 'Write tests for handlers',
      completed: false,
    }
  
    const expectedValidResponse = {
      ...validCreateJson,
      id: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    }
  
    it('should return a task when created', async () => {
      mockedDb.insert.mockReturnValue({
        values: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([{
          ...expectedValidResponse,
          id: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }]),
      })
      
      const res = await mockedApi.tasks.$post({
        json: {
          title: 'Learn Vitest',
          description: 'Write tests for handlers',
          completed: false,
        },
      })
  
      expect(res.status).toBe(HttpStatusCodes.OK);
      expect(await res.json()).toEqual(expectedValidResponse);
    });
  
    it('should return an error if the database query fails', async () => {
      mockedDb.insert = vi.fn(() => Promise.reject(new Error('Database error')));
      const res = await mockedApi.tasks.$post({
        json: {
          title: 'Learn Vitest',
          description: 'Write tests for handlers',
          completed: false,
        }
      });
  
      await expectInternalServerError(res);
    });
  
    it.each([
      { title: 'Learn Vitest', description: 'Write tests for handlers' }, // missing completed
      { title: '', description: 'Write tests for handlers', completed: false }, // empty title
      { title: 'Learn Vitest', description: '', completed: false }, // empty description
      { title: 'Learn Vitest', description: 'Write tests for handlers', completed: '' }, // invalid completed
    ])
    ('should return an error if the request body is invalid',async (invalidBody) => {
      const res = await mockedApi.tasks.$post({
        json: invalidBody as any,
      });
  
      await expectUnprocessableEntity(res);
    });
  });
  
  describe('getOne', () => {
    it('should return a task when found', async () => {
      mockedDb.query.tasks.findFirst.mockResolvedValue(mockTasks[0]);
  
      const res = await mockedApi.tasks[':id'].$get({ param: { id: 1 } });
  
      expect(res.status).toBe(HttpStatusCodes.OK);
      expect(await res.json()).toEqual(mockTasks[0]);
    });
  
    it('should return an error if the task is not found', async () => {
      mockedDb.query.tasks.findFirst.mockResolvedValue(null);
  
      const res = await mockedApi.tasks[':id'].$get({ param: { id: 2 } });
  
      await expectNotFound(res);
    });
  
    it('should return an error if the request param is invalid', async () => {
      // @ts-expect-error - invalid id
      const res = await mockedApi.tasks[':id'].$get({ param: { id: 'invalid' } });
  
      await expectUnprocessableEntity(res);
    });
  
    it('should return an error if the database query fails', async () => {
      mockedDb.query.tasks.findFirst.mockRejectedValue(new Error('Database error'));
  
      const res = await mockedApi.tasks[':id'].$get({ param: { id: 1 } });
  
      await expectInternalServerError(res);
    });
  });
  
  describe('patch', () => {
    const expectedResult = {
      ...mockTasks[0],
      title: 'Learn Svelte',
    }
  
    beforeEach(() => {
      vi.clearAllMocks();
  
      mockedDb.update.mockReturnValue({
        set: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([{
          ...expectedResult,
          updatedAt: new Date().toISOString(),
        }]),
      })
    })
    
    it('should return a task when sucessfully updated', async () => {
      const res = await mockedApi.tasks[':id'].$patch({ param: { id: 1 }, json: { title: 'Learn Svelte' } });
  
      expect(res.status).toBe(HttpStatusCodes.OK);
      expect(await res.json()).toEqual({
        ...expectedResult,
        updatedAt: expect.any(String),
      }); 
    });
  
    it('should return an error if the task is not found', async () => {
      mockedDb.update.mockReturnValue({
        set: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([]),
      });
  
      const res = await mockedApi.tasks[':id'].$patch({ param: { id: 2 }, json: { title: 'Learn Svelte' } });
  
      await expectNotFound(res);
    });
  
    it('should return an error if the request body is invalid', async () => {
      // @ts-expect-error - invalid id
      const res = await mockedApi.tasks[':id'].$patch({ param: { id: 'invalid' }, json: { title: 'Learn Svelte' } });
      const res2 = await mockedApi.tasks[':id'].$patch({ param: { id: 1 }, json: {}});
      const res3 = await mockedApi.tasks[':id'].$patch({ param: { id: 1 }, json: { title: '', description: '' } });
  
      await expectUnprocessableEntity(res);
      await expectUnprocessableEntity(res2);
      await expectUnprocessableEntity(res3);
    });
  
    it('should return an error if the database query fails', async () => {
      mockedDb.update.mockRejectedValue(new Error('Database error'));
  
      const res = await mockedApi.tasks[':id'].$patch({ param: { id: 1 }, json: { title: 'Learn Svelte' } });
  
      await expectInternalServerError(res);
    });
  });
  
  describe('remove', () => {
    beforeEach(() => {
      vi.clearAllMocks();
  
      mockedDb.delete.mockReturnValue({
        where: vi.fn().mockReturnValue({
          rowCount: 1,
        }),
      });
    })
    
    it('should return no content when sucessfully removed', async () => {
      const res = await mockedApi.tasks[':id'].$delete({ param: { id: 1 } });
  
      await expectNoContent(res);
    });
  
    it('should return an error if the task is not found', async () => {
      mockedDb.delete.mockReturnValue({
        where: vi.fn().mockReturnValue({
          rowCount: 0,
        }),
      });
  
      const res = await mockedApi.tasks[':id'].$delete({ param: { id: 2 } });
  
      await expectNotFound(res);
    });
  
    it('should return an error if the request param is invalid', async () => {
      // @ts-expect-error - invalid id
      const res = await mockedApi.tasks[':id'].$delete({ param: { id: 'invalid' } });
  
      await expectUnprocessableEntity(res);
    });
  
    it('should return an error if the database query fails', async () => {
      mockedDb.delete.mockRejectedValue(new Error('Database error'));
  
      const res = await mockedApi.tasks[':id'].$delete({ param: { id: 1 } });
  
      await expectInternalServerError(res);
    });
  });
})
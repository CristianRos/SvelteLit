import { expect } from "vitest";
import * as HttpStatusCodes from 'stoker/http-status-codes';
import * as HttpStatusPhrases from 'stoker/http-status-phrases';

export async function expectInternalServerError(res: Response) {
	expect(res.status).toBe(HttpStatusCodes.INTERNAL_SERVER_ERROR);
	expect(await res.json()).toEqual({
		message: HttpStatusPhrases.INTERNAL_SERVER_ERROR,
	});
}

export async function expectNotFound(res: Response) {
	expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
	expect(await res.json()).toEqual({
		message: HttpStatusPhrases.NOT_FOUND,
	});
}

export async function expectUnprocessableEntity(res: Response) {
	expect(res.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY);
	expect(await res.json()).toEqual({
		success: false,
		error: expect.objectContaining({
			name: 'ZodError',
		}),
	});
}

export async function expectNoContent(res: Response) {
	expect(res.status).toBe(HttpStatusCodes.NO_CONTENT);
	expect(await res.text()).toEqual('');
}

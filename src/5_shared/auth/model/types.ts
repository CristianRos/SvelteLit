import type { Session, User } from 'better-auth';

export type AuthType = {
	session: Session;
	user: User;
};

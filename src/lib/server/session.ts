import type { RequestEvent } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { validateSession, invalidateSession, type SessionWithUser } from './auth';

const SESSION_COOKIE_NAME = 'session';

export function setSessionCookie(event: RequestEvent, sessionId: string, expiresAt: Date): void {
	const cookieAttributes = [
		`${SESSION_COOKIE_NAME}=${sessionId}`,
		`Path=/`,
		`HttpOnly`,
		`SameSite=Lax`,
		`Expires=${expiresAt.toUTCString()}`
	];

	if (!dev) {
		cookieAttributes.push('Secure');
	}

	event.cookies.set(SESSION_COOKIE_NAME, sessionId, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		expires: expiresAt,
		secure: !dev
	});
}

export function deleteSessionCookie(event: RequestEvent): void {
	event.cookies.set(SESSION_COOKIE_NAME, '', {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 0,
		secure: !dev
	});
}

export function getSessionId(event: RequestEvent): string | null {
	return event.cookies.get(SESSION_COOKIE_NAME) ?? null;
}

export async function getCurrentSession(event: RequestEvent): Promise<SessionWithUser | null> {
	const sessionId = getSessionId(event);
	if (!sessionId) {
		return null;
	}

	return await validateSession(sessionId);
}

export async function requireAuth(event: RequestEvent): Promise<SessionWithUser> {
	const session = await getCurrentSession(event);
	if (!session) {
		throw new Error('Unauthorized');
	}
	return session;
}

export async function invalidateCurrentSession(event: RequestEvent): Promise<void> {
	const sessionId = getSessionId(event);
	if (sessionId) {
		await invalidateSession(sessionId);
		deleteSessionCookie(event);
	}
}

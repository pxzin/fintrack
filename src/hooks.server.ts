import type { Handle } from '@sveltejs/kit';
import { getCurrentSession } from '$lib/server/session';

export const handle: Handle = async ({ event, resolve }) => {
	// Get current session and user
	const sessionWithUser = await getCurrentSession(event);

	event.locals.session = sessionWithUser?.id ?? null;
	event.locals.user = sessionWithUser?.user ?? null;

	return resolve(event);
};

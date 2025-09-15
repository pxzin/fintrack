import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
	validateEmailVerificationToken,
	markEmailAsVerified,
	createSession,
	setSessionCookie
} from '$lib/server/auth';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const { token } = params;

	try {
		// Validate the verification token
		const tokenData = await validateEmailVerificationToken(token);

		if (!tokenData) {
			// Token is invalid or expired
			return redirect(302, '/verify-email?error=invalid_token');
		}

		// Mark email as verified
		await markEmailAsVerified(tokenData.userId);

		// Create a new session for the verified user
		const session = await createSession(tokenData.userId);
		setSessionCookie(cookies, session.id, session.expires_at);

		// Redirect to dashboard with success message
		return redirect(302, '/dashboard?verified=true');

	} catch (error) {
		console.error('Email verification error:', error);
		return redirect(302, '/verify-email?error=server_error');
	}
};
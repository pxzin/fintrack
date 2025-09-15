import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	createUser,
	getUserByEmail,
	createSession,
	createEmailVerificationToken
} from '$lib/server/auth';
import { setSessionCookie } from '$lib/server/session';
import { calculatePasswordStrength } from '$lib/utils/password-strength';

export const load: PageServerLoad = async ({ locals }) => {
	// Redirect if already authenticated
	if (locals.user) {
		throw redirect(302, '/dashboard');
	}
};

export const actions: Actions = {
	default: async (event) => {
		const { request } = event;
		const data = await request.formData();
		const fullName = data.get('fullName')?.toString();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();
		const confirmPassword = data.get('confirmPassword')?.toString();

		// Basic validation
		if (!fullName || fullName.length < 2) {
			return fail(400, {
				error: 'Full name must be at least 2 characters long',
				fullName,
				email
			});
		}

		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, {
				error: 'Please enter a valid email address',
				fullName,
				email
			});
		}

		if (!password || password.length < 8) {
			return fail(400, {
				error: 'Password must be at least 8 characters long',
				fullName,
				email
			});
		}

		if (password !== confirmPassword) {
			return fail(400, {
				error: 'Passwords do not match',
				fullName,
				email
			});
		}

		// Validate password strength
		const passwordStrength = calculatePasswordStrength(password);
		if (passwordStrength.score < 3) {
			return fail(400, {
				error: 'Password is too weak. Please choose a stronger password.',
				fullName,
				email
			});
		}

		try {
			// Check if user already exists
			const existingUser = await getUserByEmail(email);

			// Security: Always return success even if user exists to prevent email enumeration
			if (existingUser) {
				// If user exists, we still return success but don't actually create anything
				// This prevents attackers from knowing which emails are registered
				console.log(`Registration attempt for existing email: ${email}`);
				throw redirect(302, '/verify-email?email=' + encodeURIComponent(email));
			}

			// Create new user
			const user = await createUser(email, password, fullName);

			// Create email verification token
			const verificationToken = await createEmailVerificationToken(user.id, email);

			// TODO: Send verification email here
			console.log(`Verification token for ${email}: ${verificationToken}`);
			console.log(`Verification URL: ${new URL('/verify-email/' + verificationToken, 'http://localhost:5173').toString()}`);

			// Create session but don't log user in until email is verified
			// We still create the session so we can track the user through the verification process
			const session = await createSession(user.id);
			setSessionCookie(event, session.id, session.expires_at);

			// Redirect to email verification page
			throw redirect(302, '/verify-email?email=' + encodeURIComponent(email));

		} catch (error) {
			// Se for redirect, rethrow por propriedades
			if (
				(error as { status?: number; location?: string })?.status === 302 &&
				(error as { status?: number; location?: string })?.location
			) {
				throw error;
			}
			// Só loga erro real
			console.error('Registration error:', error);
			return fail(500, {
				error: 'An error occurred during registration. Please try again.',
				fullName,
				email
			});
		}
	}
};

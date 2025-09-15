import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Redirect if already authenticated
	if (locals.user) {
		throw redirect(302, '/dashboard');
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
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

		// TODO: Implement user registration with lucia-auth
		// For now, just return an error indicating the feature is not implemented
		return fail(400, {
			error: 'User registration will be implemented with authentication system',
			fullName,
			email
		});
	}
};

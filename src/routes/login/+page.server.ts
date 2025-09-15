import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { authenticateUser, createSession } from '$lib/server/auth';
import { setSessionCookie, getCurrentSession } from '$lib/server/session';

export const load: PageServerLoad = async ({ locals }) => {
	// Redirect if already authenticated
	if (locals.user) {
		throw redirect(302, '/dashboard');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		// Validate input
		if (!email || !password) {
			return fail(400, {
				error: 'Email e senha são obrigatórios',
				email
			});
		}

		if (!email.includes('@')) {
			return fail(400, {
				error: 'Email inválido',
				email
			});
		}

		try {
			// Authenticate user
			const user = await authenticateUser(email, password);

			if (!user) {
				return fail(400, {
					error: 'Email ou senha inválidos',
					email
				});
			}

			// Create session
			const session = await createSession(user.id);

			// Set session cookie
			const event = { cookies } as any;
			setSessionCookie(event, session.id, session.expires_at);

			// ...existing code...
			throw redirect(302, '/dashboard');
		} catch (error) {
			// Se for redirect, rethrow por propriedades
			if ((error as any)?.status === 302 && (error as any)?.location) {
				throw error;
			}
			// Só loga erro real
			console.error('Login error:', error);
			return fail(500, {
				error: 'Erro interno do servidor',
				email
			});
		}
	}
};

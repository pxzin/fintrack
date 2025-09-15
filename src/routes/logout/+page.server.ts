import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { invalidateCurrentSession } from '$lib/server/session'

export const actions: Actions = {
	default: async (event) => {
		// Invalidate current session
		await invalidateCurrentSession(event)

		// Redirect to login
		throw redirect(302, '/login')
	}
}
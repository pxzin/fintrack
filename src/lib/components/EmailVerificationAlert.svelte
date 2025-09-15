<script lang="ts">
	import { goto } from '$app/navigation';
	import LL from '$i18n/i18n-svelte';

	// Read-only prop (Svelte 5 pattern)
	const { user } = $props<{ user?: { email_verified?: number } | null }>();

	// Show when a user exists and their email is not verified (0)
	const showAlert = $derived(!!(user && user.email_verified === 0));

	function handleVerifyClick() {
		// Use replaceState to avoid creating extra history entry for this flow
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto('/verify-email', { replaceState: true });
	}
</script>

{#if showAlert}
	<div
		class="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 rounded-r-md dark:bg-amber-900/20 dark:border-amber-600"
	>
		<div class="flex items-start">
			<div class="flex-shrink-0">
				<!-- Warning icon -->
				<svg
					class="h-5 w-5 text-amber-400 dark:text-amber-500"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
			<div class="ml-3 flex-1">
				<h3 class="text-sm font-medium text-amber-800 dark:text-amber-200">
					{$LL.auth.emailVerification.title()}
				</h3>
				<div class="mt-1 text-sm text-amber-700 dark:text-amber-300">
					<p>{$LL.auth.emailVerification.checkEmail()}</p>
				</div>
			</div>
			<div class="ml-auto pl-3">
				<div class="-mx-1.5 -my-1.5">
					<button
						type="button"
						class="inline-flex rounded-md bg-amber-50 p-1.5 text-amber-500 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 focus:ring-offset-amber-50 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 dark:focus:ring-offset-amber-900"
						onclick={handleVerifyClick}
					>
						<span class="sr-only">{$LL.auth.emailVerification.resendEmail()}</span>
						<span class="text-xs font-medium px-2 py-1"
							>{$LL.auth.emailVerification.resendEmail()}</span
						>
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

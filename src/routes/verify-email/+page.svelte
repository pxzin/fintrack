<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/Button.svelte';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	import LocaleSwitcher from '$lib/components/ui/LocaleSwitcher.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
	import LL from '$i18n/i18n-svelte';

	// Get email from URL params
	const email = $page.url.searchParams.get('email') || '';
</script>

<svelte:head>
	<title>{$LL.auth.emailVerification.title()} - FinTrack</title>
	<meta name="description" content={$LL.auth.emailVerification.subtitle()} />
</svelte:head>

<main
	class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 p-8"
>
	<!-- Top controls -->
	<div class="absolute top-6 right-6 z-20 flex items-center gap-3">
		<LocaleSwitcher />
		<ThemeToggle />
	</div>

	<!-- Email verification info -->
	<div class="relative z-10">
		<div
			class="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 w-100 border border-white/20"
		>
			<!-- Logo -->
			<div class="flex justify-center mb-6">
				<Logo size="md" />
			</div>

			<!-- Header -->
			<div class="text-center mb-8">
				<h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
					{$LL.auth.emailVerification.title()}
				</h1>
				<p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
					{$LL.auth.emailVerification.subtitle()}
				</p>
				{#if email}
					<p class="text-sm font-medium text-gray-900 dark:text-white">
						{email}
					</p>
				{/if}
			</div>

			<!-- Instructions -->
			<div class="mb-8">
				<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
					<div class="flex items-start gap-3">
						<div class="text-blue-500 flex-shrink-0 mt-0.5">
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
							</svg>
						</div>
						<div class="text-sm text-blue-700 dark:text-blue-300">
							<p class="font-medium mb-1">{$LL.auth.emailVerification.checkEmail()}</p>
							<p>{$LL.auth.emailVerification.instructions()}</p>
						</div>
					</div>
				</div>

				<div class="text-center">
					<p class="text-xs text-gray-500 dark:text-gray-400 mb-4">
						{$LL.auth.emailVerification.didNotReceive()}
					</p>
					<!-- TODO: Add resend verification email functionality -->
					<Button
						type="button"
						variant="secondary"
						size="sm"
						disabled={true}
					>
						{$LL.auth.emailVerification.resendEmail()}
					</Button>
				</div>
			</div>

			<!-- Back to login -->
			<div class="text-center">
				<a
					href="/login"
					class="text-sm text-blue-500 font-medium underline hover:text-blue-600 transition-colors duration-200"
				>
					{$LL.auth.emailVerification.backToLogin()}
				</a>
			</div>
		</div>
	</div>
</main>
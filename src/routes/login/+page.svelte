<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import StyledCheckbox from '$lib/components/ui/StyledCheckbox.svelte';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	import LocaleSwitcher from '$lib/components/ui/LocaleSwitcher.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from './$types';

	interface Props {
		form?: ActionData;
	}

	const { form }: Props = $props();

	// Form state
	let email = $state(form?.email || '');
	let password = $state('');
	let rememberPassword = $state(false);
	let loading = $state(false);

	// Handle create account
	function handleCreateAccount() {
		goto(`${base}/register`);
	}

	// Handle forgot password
	function handleForgotPassword() {
		// TODO: Navigate to forgot password page
	}

	function enhanceLogin(): ReturnType<SubmitFunction> {
		loading = true;
		return async ({ update, result }) => {
			if (result.type === 'redirect' && result.status === 302 && result.location) {
				await goto(result.location, { replaceState: true });
				return;
			}
			if (typeof update === 'function') {
				await update();
			}
			loading = false;
		};
	}
</script>

<svelte:head>
	<title>{$LL.auth.login.title()} - FinTrack</title>
	<meta name="description" content={$LL.auth.login.subtitle()} />
</svelte:head>

<main
	class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 p-8"
>
	<!-- Top controls -->
	<div class="absolute top-6 right-6 z-20 flex items-center gap-3">
		<LocaleSwitcher />
		<ThemeToggle />
	</div>

	<!-- Login form -->
	<div class="relative z-10">
		<form
			class="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 w-100 border border-white/20"
			method="POST"
			use:enhance={enhanceLogin}
		>
			<!-- Logo -->
			<div class="flex justify-center mb-6">
				<Logo size="md" />
			</div>

			<!-- Header -->
			<div class="text-center mb-8">
				<h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
					{$LL.auth.login.title()}
				</h1>
				<p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
					{$LL.auth.login.subtitle()}
				</p>
				{#if form?.error}
					<div
						class="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
					>
						<p class="text-sm text-red-600 dark:text-red-400">{form.error}</p>
					</div>
				{/if}
			</div>

			<!-- Email field -->
			<div class="mb-6">
				<Input
					bind:value={email}
					type="email"
					name="email"
					label={$LL.auth.login.emailLabel()}
					placeholder={$LL.auth.login.emailPlaceholder()}
					id="email"
					required
					disabled={loading}
				/>
			</div>

			<!-- Password field -->
			<div class="mb-6">
				<div class="flex items-center justify-between mb-2">
					<label for="password" class="block text-sm font-medium text-gray-900 dark:text-white"
						>{$LL.auth.login.passwordLabel()}</label
					>
					<button
						type="button"
						class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
						onclick={handleForgotPassword}
						disabled={loading}
					>
						{$LL.auth.login.forgotPassword()}
					</button>
				</div>
				<Input
					bind:value={password}
					type="password"
					name="password"
					placeholder={$LL.auth.login.passwordPlaceholder()}
					id="password"
					required
					disabled={loading}
				/>
			</div>

			<!-- Remember password checkbox -->
			<div class="mb-6">
				<StyledCheckbox
					bind:checked={rememberPassword}
					label={$LL.auth.login.rememberPassword()}
					id="remember"
					disabled={loading}
				/>
			</div>

			<!-- Submit button -->
			<div class="mb-8">
				<Button
					type="submit"
					variant="primary"
					size="lg"
					class="w-full"
					disabled={loading || !email || !password}
					{loading}
				>
					{$LL.auth.login.signInButton()}
				</Button>
			</div>

			<!-- Create account link -->
			<div class="text-center flex items-center justify-center gap-1">
				<span class="text-sm text-gray-600 dark:text-gray-400">{$LL.auth.login.noAccount()}</span>
				<button
					type="button"
					class="text-sm text-blue-500 font-medium underline hover:text-blue-600 transition-colors duration-200"
					onclick={handleCreateAccount}
					disabled={loading}
				>
					{$LL.auth.login.createAccount()}
				</button>
			</div>
		</form>
	</div>
</main>

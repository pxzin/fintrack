<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	import LocaleSwitcher from '$lib/components/ui/LocaleSwitcher.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
	import PasswordStrengthIndicator from '$lib/components/ui/PasswordStrengthIndicator.svelte';
	import LL from '$i18n/i18n-svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from './$types';

	interface Props {
		form?: ActionData;
	}

	const { form }: Props = $props();

	// Form state
	let fullName = $state(form?.fullName || '');
	let email = $state(form?.email || '');
	let password = $state('');
	let confirmPassword = $state('');
	let loading = $state(false);

	// Validation
	const isValidEmail = $derived(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
	const passwordsMatch = $derived(password === confirmPassword && password.length > 0);
	const isFormValid = $derived(
		fullName.length >= 2 && isValidEmail && password.length >= 8 && passwordsMatch
	);

	// Handle sign in navigation
	function handleSignIn() {
		goto('/login');
	}

	function enhanceRegister(): ReturnType<SubmitFunction> {
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
	<title>{$LL.auth.register.title()} - FinTrack</title>
	<meta name="description" content={$LL.auth.register.subtitle()} />
</svelte:head>

<main
	class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 p-8"
>
	<!-- Top controls -->
	<div class="absolute top-6 right-6 z-20 flex items-center gap-3">
		<LocaleSwitcher />
		<ThemeToggle />
	</div>

	<!-- Register form -->
	<div class="relative z-10">
		<form
			class="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 w-100 border border-white/20"
			method="POST"
			use:enhance={enhanceRegister}
			autocomplete="off"
		>
			<!-- Logo -->
			<div class="flex justify-center mb-6">
				<Logo size="md" />
			</div>

			<!-- Header -->
			<div class="text-center mb-8">
				<h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
					{$LL.auth.register.title()}
				</h1>
				<p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
					{$LL.auth.register.subtitle()}
				</p>
				{#if form?.error}
					<div
						class="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
					>
						<p class="text-sm text-red-600 dark:text-red-400">{form.error}</p>
					</div>
				{/if}
			</div>

			<!-- Full name field -->
			<div class="mb-6">
				<Input
					bind:value={fullName}
					type="text"
					name="fullName"
					label={$LL.auth.register.nameLabel()}
					placeholder={$LL.auth.register.namePlaceholder()}
					id="fullName"
					required
					disabled={loading}
					autocomplete="name"
				/>
			</div>

			<!-- Email field -->
			<div class="mb-6">
				<Input
					bind:value={email}
					type="email"
					name="email"
					label={$LL.auth.register.emailLabel()}
					placeholder={$LL.auth.register.emailPlaceholder()}
					id="email"
					required
					disabled={loading}
					autocomplete="email"
				/>
				{#if email && !isValidEmail}
					<p class="mt-1 text-sm text-red-600 dark:text-red-400">
						{$LL.errors.invalidEmail()}
					</p>
				{/if}
			</div>

			<!-- Password field -->
			<div class="mb-4">
				<Input
					bind:value={password}
					type="password"
					name="password"
					label={$LL.auth.register.passwordLabel()}
					placeholder={$LL.auth.register.passwordPlaceholder()}
					id="password"
					required
					disabled={loading}
					autocomplete="new-password"
					data-form-type="signup"
				/>
			</div>

			<!-- Password strength indicator -->
			<div class="mb-6">
				<PasswordStrengthIndicator {password} />
			</div>

			<!-- Confirm password field -->
			<div class="mb-6">
				<Input
					bind:value={confirmPassword}
					type="password"
					name="confirmPassword"
					label={$LL.auth.register.confirmPasswordLabel()}
					placeholder={$LL.auth.register.confirmPasswordPlaceholder()}
					id="confirmPassword"
					required
					disabled={loading}
					autocomplete="new-password"
					data-form-type="signup"
				/>
				{#if confirmPassword && !passwordsMatch}
					<p class="mt-1 text-sm text-red-600 dark:text-red-400">
						{$LL.errors.passwordMismatch()}
					</p>
				{/if}
			</div>

			<!-- Submit button -->
			<div class="mb-8">
				<Button
					type="submit"
					variant="primary"
					size="lg"
					class="w-full"
					disabled={loading || !isFormValid}
					{loading}
				>
					{$LL.auth.register.signUpButton()}
				</Button>
			</div>

			<!-- Sign in link -->
			<div class="text-center flex items-center justify-center gap-1">
				<span class="text-sm text-gray-600 dark:text-gray-400"
					>{$LL.auth.register.hasAccount()}</span
				>
				<button
					type="button"
					class="text-sm text-blue-500 font-medium underline hover:text-blue-600 transition-colors duration-200"
					onclick={handleSignIn}
					disabled={loading}
				>
					{$LL.auth.register.signIn()}
				</button>
			</div>
		</form>
	</div>
</main>

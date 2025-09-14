<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Checkbox from '$lib/components/ui/Checkbox.svelte';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';

	// Form state
	let email = $state('');
	let password = $state('');
	let rememberPassword = $state(false);
	let loading = $state(false);

	// Handle form submission
	async function handleLogin() {
		loading = true;
		
		try {
			// TODO: Implement login logic
			console.log('Login attempt:', { email, rememberPassword });
			
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			// TODO: Redirect to dashboard on success
		} catch (error) {
			console.error('Login failed:', error);
		} finally {
			loading = false;
		}
	}

	// Handle create account
	function handleCreateAccount() {
		// TODO: Navigate to sign up page
		console.log('Navigate to create account');
	}

	// Handle forgot password
	function handleForgotPassword() {
		// TODO: Navigate to forgot password page
		console.log('Navigate to forgot password');
	}
</script>

<svelte:head>
	<title>Login - FinTrack</title>
	<meta name="description" content="Login to your FinTrack account" />
</svelte:head>

<main class="login-container">
	<!-- Background gradient -->
	<div class="login-background"></div>
	
	<!-- Theme toggle -->
	<div class="theme-toggle-wrapper">
		<ThemeToggle />
	</div>
	
	<!-- Login form -->
	<div class="login-form-wrapper">
		<form class="login-form" onsubmit={handleLogin}>
			<!-- Header -->
			<div class="form-header">
				<h1 class="form-title">Login to Account</h1>
				<p class="form-subtitle">Please enter your email and password to continue</p>
			</div>

			<!-- Email field -->
			<div class="form-field">
				<Input
					bind:value={email}
					type="email"
					label="Email address:"
					placeholder="esteban_schiller@gmail.com"
					id="email"
					required
					disabled={loading}
				/>
			</div>

			<!-- Password field -->
			<div class="form-field">
				<div class="password-header">
					<label for="password" class="input-label">Password</label>
					<button
						type="button"
						class="forgot-password-link"
						onclick={handleForgotPassword}
						disabled={loading}
					>
						Forget Password?
					</button>
				</div>
				<Input
					bind:value={password}
					type="password"
					placeholder="Enter your password"
					id="password"
					required
					disabled={loading}
				/>
			</div>

			<!-- Remember password checkbox -->
			<div class="form-field">
				<Checkbox
					bind:checked={rememberPassword}
					label="Remember Password"
					id="remember"
					disabled={loading}
				/>
			</div>

			<!-- Submit button -->
			<div class="form-field">
				<Button
					type="submit"
					variant="primary"
					size="lg"
					class="w-full"
					disabled={loading || !email || !password}
					{loading}
				>
					Sign In
				</Button>
			</div>

			<!-- Create account link -->
			<div class="form-footer">
				<span class="footer-text">Don't have an account?</span>
				<button
					type="button"
					class="create-account-link"
					onclick={handleCreateAccount}
					disabled={loading}
				>
					Create Account
				</button>
			</div>
		</form>
	</div>
</main>

<style>
	.login-container {
		@apply min-h-screen w-full flex items-center justify-center relative overflow-hidden;
	}

	.login-background {
		@apply absolute inset-0 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600;
		@apply dark:from-slate-900 dark:via-slate-800 dark:to-slate-700;
	}

	.login-form-wrapper {
		@apply relative z-10 w-full max-w-md mx-auto px-6;
	}

	.login-form {
		@apply bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8;
		@apply border border-gray-100 dark:border-slate-700;
	}

	.form-header {
		@apply text-center mb-8;
	}

	.form-title {
		@apply text-2xl font-semibold text-gray-900 dark:text-white mb-2;
	}

	.form-subtitle {
		@apply text-sm text-gray-600 dark:text-gray-400;
	}

	.form-field {
		@apply mb-6;
	}

	.password-header {
		@apply flex items-center justify-between mb-2;
	}

	.input-label {
		@apply block text-sm font-medium text-gray-700 dark:text-gray-300;
	}

	.forgot-password-link {
		@apply text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors;
		@apply disabled:opacity-60 disabled:cursor-not-allowed;
	}

	.form-footer {
		@apply text-center mt-8 flex items-center justify-center gap-1;
	}

	.footer-text {
		@apply text-sm text-gray-600 dark:text-gray-400;
	}

	.create-account-link {
		@apply text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors;
		@apply disabled:opacity-60 disabled:cursor-not-allowed;
	}

	.theme-toggle-wrapper {
		@apply absolute top-6 right-6 z-20;
	}
</style>
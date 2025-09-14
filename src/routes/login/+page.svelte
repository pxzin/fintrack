<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import StyledCheckbox from '$lib/components/ui/StyledCheckbox.svelte';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';

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
			<!-- Logo -->
			<div class="logo-container">
				<Logo size="md" />
			</div>
			
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
				<StyledCheckbox
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
		min-height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
		padding: 2rem;
	}

	.login-background {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
	}

	.login-form-wrapper {
		position: relative;
		z-index: 10;
	}

	.login-form {
		background: white;
		border-radius: 24px;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
		padding: 32px;
		width: 400px;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.login-form.dark {
		background: #1e293b;
	}

	.logo-container {
		display: flex;
		justify-content: center;
		margin-bottom: 24px;
	}

	.form-header {
		text-align: center;
		margin-bottom: 32px;
	}

	.form-title {
		font-size: 24px;
		font-weight: 600;
		color: #111827;
		margin-bottom: 12px;
	}

	.form-subtitle {
		font-size: 14px;
		color: #6b7280;
		line-height: 1.5;
	}

	.form-field {
		margin-bottom: 24px;
	}

	.form-field:last-of-type {
		margin-bottom: 32px;
	}

	.password-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 8px;
	}

	.input-label {
		display: block;
		font-size: 14px;
		font-weight: 500;
		color: #111827;
		margin-bottom: 8px;
	}

	.forgot-password-link {
		font-size: 14px;
		color: #6b7280;
		text-decoration: none;
		transition: color 0.2s;
	}

	.forgot-password-link:hover {
		color: #374151;
	}

	.form-footer {
		text-align: center;
		margin-top: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
	}

	.footer-text {
		font-size: 14px;
		color: #6b7280;
	}

	.create-account-link {
		font-size: 14px;
		color: #3b82f6;
		font-weight: 500;
		text-decoration: underline;
		transition: color 0.2s;
	}

	.create-account-link:hover {
		color: #2563eb;
	}

	.theme-toggle-wrapper {
		position: absolute;
		top: 24px;
		right: 24px;
		z-index: 20;
	}

	/* Custom input styles to match design */
	:global(.login-form .input-wrapper) {
		@apply bg-gray-100 dark:bg-slate-700 border-0 rounded-xl;
	}

	:global(.login-form .input) {
		@apply bg-transparent text-gray-900 dark:text-gray-100;
		@apply placeholder-gray-500 dark:placeholder-gray-400;
	}

	:global(.login-form .checkbox-wrapper) {
		@apply bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 rounded;
	}

	:global(.login-form .checkbox-wrapper.checked) {
		@apply bg-blue-500 border-blue-500;
	}
</style>
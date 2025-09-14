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

<main class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 p-8">
	<!-- Theme toggle -->
	<div class="absolute top-6 right-6 z-20">
		<ThemeToggle />
	</div>

	<!-- Login form -->
	<div class="relative z-10">
		<form class="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 w-100 border border-white/20" onsubmit={handleLogin}>
			<!-- Logo -->
			<div class="flex justify-center mb-6">
				<Logo size="md" />
			</div>

			<!-- Header -->
			<div class="text-center mb-8">
				<h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Login to Account</h1>
				<p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Please enter your email and password to continue</p>
			</div>

			<!-- Email field -->
			<div class="mb-6">
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
			<div class="mb-6">
				<div class="flex items-center justify-between mb-2">
					<label for="password" class="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
					<button
						type="button"
						class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
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
			<div class="mb-6">
				<StyledCheckbox
					bind:checked={rememberPassword}
					label="Remember Password"
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
					Sign In
				</Button>
			</div>

			<!-- Create account link -->
			<div class="text-center flex items-center justify-center gap-1">
				<span class="text-sm text-gray-600 dark:text-gray-400">Don't have an account?</span>
				<button
					type="button"
					class="text-sm text-blue-500 font-medium underline hover:text-blue-600 transition-colors duration-200"
					onclick={handleCreateAccount}
					disabled={loading}
				>
					Create Account
				</button>
			</div>
		</form>
	</div>
</main>

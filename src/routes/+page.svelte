<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
</script>

<svelte:head>
	<title>FinTrack - Financial Tracking Made Simple</title>
	<meta name="description" content="Take control of your finances with FinTrack" />
</svelte:head>

<main
	class="min-h-screen bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700"
>
	<!-- Theme toggle -->
	<div class="absolute top-6 right-6">
		<ThemeToggle />
	</div>

	<!-- Content -->
	<div class="flex items-center justify-center min-h-screen px-6">
		<div class="text-center">
			<h1 class="text-4xl md:text-6xl font-bold text-white mb-4">FinTrack</h1>
			<p class="text-xl text-white/90 mb-8 max-w-md">
				Take control of your finances with our comprehensive tracking solution
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button variant="secondary" size="lg" onclick={() => (window.location.href = '/login')}>
					Login
				</Button>

				<Button variant="outline" size="lg" class="!border-white/30 !text-white hover:!bg-white/10">
					Demo
				</Button>
			</div>

			<!-- Quick links for development -->
			<div class="mt-12 space-y-2">
				<h2 class="text-lg font-semibold text-white/80 mb-4">Development Links</h2>
				<div class="flex flex-wrap gap-4 justify-center">
					<a
						href="/login"
						data-sveltekit-preload-data
						class="text-white/70 hover:text-white underline">Login Page</a
					>
					<a
						href="/demo"
						data-sveltekit-preload-data
						class="text-white/70 hover:text-white underline">Component Demo</a
					>
					<a
						href="/api/db-test"
						data-sveltekit-preload-data
						class="text-white/70 hover:text-white underline">Database Test</a
					>
				</div>
			</div>
		</div>
	</div>
</main>

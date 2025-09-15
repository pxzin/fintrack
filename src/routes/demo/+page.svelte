<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';

	let loading = $state(false);

	const toggleLoading = () => {
		loading = !loading;
	};
</script>

<svelte:head>
	<title>Button Demo - FinTrack</title>
</svelte:head>

<div class="min-h-screen bg-neutral-50 p-8">
	<div class="max-w-4xl mx-auto">
		<header class="mb-8">
			<h1 class="text-3xl font-bold text-neutral-900 mb-2">Button Component Demo</h1>
			<p class="text-neutral-600">Based on FinTrack Figma Design System</p>
		</header>

		<!-- Variants -->
		<section class="mb-8">
			<h2 class="text-xl font-semibold text-neutral-900 mb-4">Variants</h2>
			<div class="flex flex-wrap gap-4">
				<Button variant="primary">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="success">Success</Button>
				<Button variant="danger">Danger</Button>
				<Button variant="ghost">Ghost</Button>
			</div>
		</section>

		<!-- Sizes -->
		<section class="mb-8">
			<h2 class="text-xl font-semibold text-neutral-900 mb-4">Sizes</h2>
			<div class="flex items-center gap-4">
				<Button size="sm" variant="primary">Small</Button>
				<Button size="md" variant="primary">Medium</Button>
				<Button size="lg" variant="primary">Large</Button>
			</div>
		</section>

		<!-- With Icons -->
		<section class="mb-8">
			<h2 class="text-xl font-semibold text-neutral-900 mb-4">With Icons</h2>
			<div class="flex flex-wrap gap-4">
				<Button variant="primary" icon="plus">Add Transaction</Button>
				<Button variant="success" icon="check" iconPosition="right">Completed</Button>
				<Button variant="secondary" icon="download">Export</Button>
				<Button variant="danger" icon="trash-2">Delete</Button>
				<Button variant="ghost" icon="settings">Settings</Button>
			</div>
		</section>

		<!-- States -->
		<section class="mb-8">
			<h2 class="text-xl font-semibold text-neutral-900 mb-4">States</h2>
			<div class="flex flex-wrap gap-4">
				<Button variant="primary" disabled>Disabled</Button>
				<Button variant="primary" {loading} onclick={toggleLoading}>
					{loading ? 'Loading...' : 'Toggle Loading'}
				</Button>
				<Button variant="success" icon="save" loading>Saving...</Button>
			</div>
		</section>

		<!-- Full Width -->
		<section class="mb-8">
			<h2 class="text-xl font-semibold text-neutral-900 mb-4">Full Width</h2>
			<div class="max-w-sm">
				<Button variant="primary" fullWidth icon="log-in">Sign In</Button>
			</div>
		</section>

		<!-- Financial Actions (Real Use Cases) -->
		<section class="mb-8">
			<h2 class="text-xl font-semibold text-neutral-900 mb-4">FinTrack Use Cases</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<Button variant="primary" icon="plus" fullWidth>Add Account</Button>
				<Button variant="primary" icon="credit-card" fullWidth>New Transaction</Button>
				<Button variant="success" icon="trending-up" fullWidth>Add Income</Button>
				<Button variant="danger" icon="trending-down" fullWidth>Add Expense</Button>
				<Button variant="secondary" icon="transfer" fullWidth>Transfer Money</Button>
				<Button variant="ghost" icon="eye" fullWidth>View Details</Button>
			</div>
		</section>

		<!-- Color Showcase -->
		<section class="mb-8">
			<h2 class="text-xl font-semibold text-neutral-900 mb-4">Figma Color Palette</h2>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
				<div class="p-4 rounded-lg bg-primary-500 text-white">
					<div class="font-semibold">Primary</div>
					<div class="text-primary-100">#4F83FF</div>
				</div>
				<div class="p-4 rounded-lg bg-success-500 text-white">
					<div class="font-semibold">Success</div>
					<div class="text-success-100">#10B981</div>
				</div>
				<div class="p-4 rounded-lg bg-processing-500 text-white">
					<div class="font-semibold">Processing</div>
					<div class="text-processing-100">#8B5CF6</div>
				</div>
				<div class="p-4 rounded-lg bg-info-500 text-white">
					<div class="font-semibold">Info</div>
					<div class="text-info-100">#06B6D4</div>
				</div>
			</div>
		</section>

		<!-- Interactive Examples -->
		<section>
			<h2 class="text-xl font-semibold text-neutral-900 mb-4">Interactive Examples</h2>
			<div class="bg-white p-6 rounded-lg shadow-card border border-neutral-200">
				<h3 class="font-medium text-neutral-900 mb-4">Quick Actions</h3>
				<div class="flex flex-wrap gap-3">
					<Button variant="primary" size="sm" icon="plus">Income</Button>
					<Button variant="danger" size="sm" icon="minus">Expense</Button>
					<Button variant="secondary" size="sm" icon="repeat">Transfer</Button>
					<Button variant="ghost" size="sm" icon="more-horizontal">More</Button>
				</div>
			</div>
		</section>
	</div>
</div>

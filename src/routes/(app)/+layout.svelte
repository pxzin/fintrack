<script lang="ts">
	import EmailVerificationAlert from '$lib/components/EmailVerificationAlert.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import { layoutState } from '$lib/stores/layout.svelte.js';
	import type { LayoutData } from './$types';

	const { children, data } = $props<{ children: any; data: LayoutData }>();
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
	<!-- Email verification alert for unverified users -->
	<EmailVerificationAlert user={data.user} />

	<!-- Navigation Header -->
	<Navbar />

	<!-- Main Layout -->
	<div class="flex">
		<!-- Sidebar -->
		<Sidebar />

		<!-- Main Content -->
		<main
			class="flex-1 transition-all duration-300 ease-in-out"
			class:ml-64={layoutState.sidebarOpen && !layoutState.sidebarCollapsed}
			class:ml-16={layoutState.sidebarOpen && layoutState.sidebarCollapsed}
			class:ml-0={!layoutState.sidebarOpen}
		>
			<div class="p-6 pt-20">
				{@render children?.()}
			</div>
		</main>
	</div>
</div>

<style>
	@media (max-width: 768px) {
		main {
			margin-left: 0 !important;
		}
	}
</style>

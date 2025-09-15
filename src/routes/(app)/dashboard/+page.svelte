<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import OrderedList from '$lib/components/ui/OrderedList.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();

	// Mock data based on the image
	let orderItems = $state([
		{
			id: '00001',
			name: 'Christine Brooks',
			address: 'Electric',
			date: '05 Feb 2019',
			type: 'Electric',
			status: 'Completed' as const
		},
		{
			id: '00002',
			name: 'Rosie Pearson',
			address: 'Book',
			date: '29 Jul 2019',
			type: 'Book',
			status: 'Processing' as const
		},
		{
			id: '00003',
			name: 'Darrell Caldwell',
			address: 'Medicine',
			date: '15 Aug 2019',
			type: 'Medicine',
			status: 'Rejected' as const
		},
		{
			id: '00004',
			name: 'Gilbert Johnston',
			address: '768 Destiny Lake Suite 600',
			date: '05 Feb 2019',
			type: 'Mobile',
			status: 'Completed' as const
		},
		{
			id: '00005',
			name: 'Alan Cain',
			address: '042 Mylene Throughway',
			date: '29 Jul 2019',
			type: 'Watch',
			status: 'Processing' as const
		},
		{
			id: '00006',
			name: 'Alfred Murray',
			address: '543 Weimann Mountain',
			date: '15 Aug 2019',
			type: 'Medicine',
			status: 'Completed' as const
		},
		{
			id: '00007',
			name: 'Maggie Sullivan',
			address: 'New Scottieberg',
			date: '21 Dec 2019',
			type: 'Watch',
			status: 'Processing' as const
		},
		{
			id: '00008',
			name: 'Rosie Todd',
			address: 'New Jon',
			date: '30 Apr 2019',
			type: 'Medicine',
			status: 'On Hold' as const
		},
		{
			id: '00009',
			name: 'Dollie Hines',
			address: '124 Lyla Forge Suite 975',
			date: '09 Jan 2019',
			type: 'Book',
			status: 'In Transit' as const
		}
	]);

	let showExampleModal = $state(false);

	function openModal() {
		showExampleModal = true;
	}
</script>

<svelte:head>
	<title>{$LL.dashboard.title()} - FinTrack</title>
</svelte:head>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{$LL.dashboard.title()}</h1>
			<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
				Bem-vindo, {data.user.full_name}!
			</p>
		</div>
		<button
			type="button"
			onclick={openModal}
			class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
		>
			Open Example Modal
		</button>
	</div>

	<!-- Dashboard Cards -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		<div
			class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
		>
			<div class="flex items-center">
				<div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
					<svg
						class="w-6 h-6 text-blue-600 dark:text-blue-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
						/>
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
					<p class="text-2xl font-bold text-gray-900 dark:text-gray-100">$45,231.89</p>
				</div>
			</div>
		</div>

		<div
			class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
		>
			<div class="flex items-center">
				<div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
					<svg
						class="w-6 h-6 text-green-600 dark:text-green-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
						/>
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
					<p class="text-2xl font-bold text-gray-900 dark:text-gray-100">+2350</p>
				</div>
			</div>
		</div>

		<div
			class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
		>
			<div class="flex items-center">
				<div class="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
					<svg
						class="w-6 h-6 text-yellow-600 dark:text-yellow-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
						/>
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-600 dark:text-gray-400">Subscriptions</p>
					<p class="text-2xl font-bold text-gray-900 dark:text-gray-100">+12,234</p>
				</div>
			</div>
		</div>

		<div
			class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
		>
			<div class="flex items-center">
				<div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
					<svg
						class="w-6 h-6 text-purple-600 dark:text-purple-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
						/>
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-600 dark:text-gray-400">Sales</p>
					<p class="text-2xl font-bold text-gray-900 dark:text-gray-100">+573</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Order Lists Component -->
	<OrderedList bind:items={orderItems} />
</div>

<!-- Example Modal -->
<Modal
	bind:open={showExampleModal}
	title="Example Modal"
	subtitle="This is a reusable modal component"
	size="md"
>
	<div class="space-y-4">
		<p class="text-gray-700 dark:text-gray-300">
			This modal demonstrates the reusable Modal component that was created based on the design from
			the image.
		</p>
		<p class="text-gray-700 dark:text-gray-300">Features:</p>
		<ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
			<li>Responsive design</li>
			<li>Dark mode support</li>
			<li>Configurable sizes</li>
			<li>Close on overlay click or ESC key</li>
			<li>Accessible with ARIA attributes</li>
		</ul>
	</div>

	<div
		slot="footer"
		class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3"
	>
		<button
			type="button"
			onclick={() => (showExampleModal = false)}
			class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
		>
			Cancel
		</button>
		<button
			type="button"
			onclick={() => (showExampleModal = false)}
			class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
		>
			Confirm
		</button>
	</div>
</Modal>

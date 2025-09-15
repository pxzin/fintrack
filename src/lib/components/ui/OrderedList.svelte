<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import LL from '$i18n/i18n-svelte';

	interface OrderItem {
		id: string;
		name: string;
		address?: string;
		date: string;
		type: string;
		status: 'Completed' | 'Processing' | 'Rejected' | 'On Hold' | 'In Transit';
	}

	interface FilterOptions {
		date: string;
		orderType: string;
		status: string;
	}

	let {
		items = $bindable<OrderItem[]>([]),
		title = 'Order Lists',
		showFilters = true,
		itemsPerPage = 10
	} = $props<{
		items?: OrderItem[];
		title?: string;
		showFilters?: boolean;
		itemsPerPage?: number;
	}>();

	const dispatch = createEventDispatcher();

	let currentPage = $state(1);
	let filters = $state<FilterOptions>({
		date: '',
		orderType: '',
		status: ''
	});

	let showStatusModal = $state(false);
	let selectedStatuses = $state<string[]>([]);

	const statusOptions = [
		{ value: 'Completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
		{ value: 'Processing', label: 'Processing', color: 'bg-purple-100 text-purple-800' },
		{ value: 'Rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
		{ value: 'On Hold', label: 'On Hold', color: 'bg-yellow-100 text-yellow-800' },
		{ value: 'In Transit', label: 'In Transit', color: 'bg-blue-100 text-blue-800' }
	];

	const orderTypeOptions = [
		{ value: 'Electric', label: 'Electric' },
		{ value: 'Book', label: 'Book' },
		{ value: 'Medicine', label: 'Medicine' },
		{ value: 'Mobile', label: 'Mobile' },
		{ value: 'Watch', label: 'Watch' }
	];

	// Computed values
	let filteredItems = $derived(() => {
		return items.filter((item: OrderItem) => {
			const matchesDate = !filters.date || item.date.includes(filters.date);
			const matchesType = !filters.orderType || item.type === filters.orderType;
			const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(item.status);

			return matchesDate && matchesType && matchesStatus;
		});
	});

	let paginatedItems = $derived(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredItems().slice(startIndex, startIndex + itemsPerPage);
	});

	let totalPages = $derived(() => Math.ceil(filteredItems().length / itemsPerPage));

	function resetFilters() {
		filters = { date: '', orderType: '', status: '' };
		selectedStatuses = [];
		currentPage = 1;
	}

	function applyStatusFilter() {
		showStatusModal = false;
		currentPage = 1;
	}

	function getStatusColor(status: string): string {
		const statusOption = statusOptions.find((s) => s.value === status);
		return statusOption?.color || 'bg-gray-100 text-gray-800';
	}

	function goToPage(page: number) {
		if (page >= 1 && page <= totalPages()) {
			currentPage = page;
		}
	}
</script>

<div
	class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
>
	<!-- Header -->
	<div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
		<h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
	</div>

	<!-- Filters -->
	{#if showFilters}
		<div
			class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
		>
			<div class="flex flex-wrap items-center gap-4">
				<!-- Filter Icon -->
				<div class="flex items-center text-gray-600 dark:text-gray-400">
					<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
						/>
					</svg>
					<span class="text-sm font-medium">Filter By</span>
				</div>

				<!-- Date Filter -->
				<div class="relative">
					<input
						type="date"
						bind:value={filters.date}
						class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>

				<!-- Order Type Filter -->
				<div class="relative">
					<select
						bind:value={filters.orderType}
						class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						<option value="">Order Type</option>
						{#each orderTypeOptions as option (option.value)}
							<option value={option.value}>{option.label}</option>
						{/each}
					</select>
				</div>

				<!-- Order Status Filter -->
				<div class="relative">
					<button
						type="button"
						onclick={() => (showStatusModal = true)}
						class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center space-x-2"
					>
						<span>Order Status</span>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>
				</div>

				<!-- Reset Filter -->
				<button
					type="button"
					onclick={resetFilters}
					class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium flex items-center space-x-1"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
					<span>Reset Filter</span>
				</button>
			</div>
		</div>
	{/if}

	<!-- Table -->
	<div class="overflow-x-auto">
		<table class="w-full">
			<thead class="bg-gray-50 dark:bg-gray-700/50">
				<tr>
					<th
						class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
					>
						ID
					</th>
					<th
						class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
					>
						NAME
					</th>
					<th
						class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
					>
						ADDRESS
					</th>
					<th
						class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
					>
						DATE
					</th>
					<th
						class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
					>
						TYPE
					</th>
					<th
						class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
					>
						STATUS
					</th>
				</tr>
			</thead>
			<tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
				{#each paginatedItems() as item (item.id)}
					<tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
						<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
							{item.id}
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
							{item.name}
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
							{item.address || '-'}
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
							{item.date}
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
							{item.type}
						</td>
						<td class="px-6 py-4 whitespace-nowrap">
							<span
								class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {getStatusColor(
									item.status
								)}"
							>
								{item.status}
							</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Pagination -->
	{#if totalPages() > 1}
		<div
			class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between"
		>
			<div class="text-sm text-gray-500 dark:text-gray-400">
				Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(
					currentPage * itemsPerPage,
					filteredItems().length
				)} of {filteredItems().length}
			</div>
			<div class="flex items-center space-x-2">
				<button
					type="button"
					onclick={() => goToPage(currentPage - 1)}
					disabled={currentPage === 1}
					class="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<button
					type="button"
					onclick={() => goToPage(currentPage + 1)}
					disabled={currentPage === totalPages()}
					class="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>
		</div>
	{/if}
</div>

<!-- Status Filter Modal -->
{#if showStatusModal}
	<div class="fixed inset-0 z-50 overflow-y-auto">
		<div
			class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
		>
			<!-- Background overlay -->
			<button
				type="button"
				class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
				onclick={() => (showStatusModal = false)}
				aria-label="Close modal"
			></button>

			<!-- Modal panel -->
			<div
				class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white dark:bg-gray-800 rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
			>
				<div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
					<h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Select Order Status</h3>
				</div>

				<div class="px-6 py-4">
					<div class="space-y-3">
						{#each statusOptions as status (status.value)}
							<label class="flex items-center">
								<input
									type="checkbox"
									bind:group={selectedStatuses}
									value={status.value}
									class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<span
									class="ml-3 inline-flex px-2 py-1 text-xs font-semibold rounded-full {status.color}"
								>
									{status.label}
								</span>
							</label>
						{/each}
					</div>

					<p class="mt-4 text-xs text-gray-500 dark:text-gray-400">
						*You can choose multiple Order status
					</p>
				</div>

				<div
					class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3"
				>
					<button
						type="button"
						onclick={() => (showStatusModal = false)}
						class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
					>
						Cancel
					</button>
					<button
						type="button"
						onclick={applyStatusFilter}
						class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
					>
						Apply Now
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

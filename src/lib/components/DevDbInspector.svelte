<script lang="ts">
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';

	interface DbData {
		success: boolean;
		data: Record<string, any[]>;
		counts: Record<string, number>;
		timestamp: string;
	}

	let isOpen = $state(false);
	let isLoading = $state(false);
	let dbData: DbData | null = $state(null);
	let selectedTable = $state('users');
	let autoRefresh = $state(false);
	let refreshInterval: ReturnType<typeof setInterval> | null = null;

	const tables = ['users', 'sessions', 'email_verification_tokens', 'accounts', 'categories', 'transactions'];

	async function fetchDbData(table = 'all') {
		if (!dev) return;

		isLoading = true;
		try {
			const response = await fetch(`/api/db-inspect?table=${table}&limit=50`);
			if (response.ok) {
				dbData = await response.json();
			}
		} catch (error) {
			console.error('Failed to fetch database data:', error);
		} finally {
			isLoading = false;
		}
	}

	function toggleAutoRefresh() {
		autoRefresh = !autoRefresh;
		if (autoRefresh) {
			refreshInterval = setInterval(() => {
				fetchDbData();
			}, 3000);
		} else {
			if (refreshInterval) {
				clearInterval(refreshInterval);
				refreshInterval = null;
			}
		}
	}

	function formatValue(value: any): string {
		if (value === null) return 'NULL';
		if (typeof value === 'string' && value.length > 50) {
			return value.substring(0, 50) + '...';
		}
		if (typeof value === 'number' && value > 1000000000) {
			// Likely a timestamp
			const date = new Date(value * 1000);
			return `${value} (${date.toLocaleString()})`;
		}
		return String(value);
	}

	function getTableColor(tableName: string): string {
		const colors: Record<string, string> = {
			users: 'bg-blue-100 dark:bg-blue-900',
			sessions: 'bg-green-100 dark:bg-green-900',
			email_verification_tokens: 'bg-yellow-100 dark:bg-yellow-900',
			accounts: 'bg-purple-100 dark:bg-purple-900',
			categories: 'bg-pink-100 dark:bg-pink-900',
			transactions: 'bg-indigo-100 dark:bg-indigo-900'
		};
		return colors[tableName] || 'bg-gray-100 dark:bg-gray-900';
	}

	onMount(() => {
		if (dev) {
			fetchDbData();
		}

		// Cleanup on unmount
		return () => {
			if (refreshInterval) {
				clearInterval(refreshInterval);
			}
		};
	});
</script>

<!-- Only show in development -->
{#if dev}
	<!-- Toggle Button -->
	<button
		type="button"
		class="fixed bottom-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium transition-colors"
		onclick={() => {
			isOpen = !isOpen;
			if (isOpen && !dbData) fetchDbData();
		}}
	>
		🗄️ DB
	</button>

	<!-- Inspector Panel -->
	{#if isOpen}
		<div class="fixed bottom-16 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-2xl w-[900px] max-h-[600px] overflow-hidden">
			<!-- Header -->
			<div class="bg-red-600 text-white px-4 py-3 flex items-center justify-between">
				<div class="flex items-center gap-2">
					<h3 class="font-semibold">🗄️ Database Inspector</h3>
					{#if dbData?.timestamp}
						<span class="text-xs opacity-75">
							Updated: {new Date(dbData.timestamp).toLocaleTimeString()}
						</span>
					{/if}
				</div>
				<div class="flex items-center gap-2">
					<button
						type="button"
						class="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
						onclick={() => toggleAutoRefresh()}
					>
						{autoRefresh ? '⏸️ Stop' : '🔄 Auto'}
					</button>
					<button
						type="button"
						class="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
						onclick={() => fetchDbData()}
						disabled={isLoading}
					>
						{isLoading ? '⏳' : '🔄'}
					</button>
					<button
						type="button"
						class="text-white hover:text-gray-300 text-xl leading-none"
						onclick={() => (isOpen = false)}
					>
						×
					</button>
				</div>
			</div>

			<!-- Content -->
			<div class="p-4 overflow-auto max-h-[500px]">
				{#if isLoading && !dbData}
					<div class="text-center py-8 text-gray-600 dark:text-gray-400">
						⏳ Loading database data...
					</div>
				{:else if dbData}
					<!-- Table Counts Summary -->
					<div class="mb-4">
						<h4 class="text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100">📊 Record Counts:</h4>
						<div class="grid grid-cols-3 gap-2 text-xs">
							{#each tables as table}
								<div class="flex justify-between p-2 rounded {getTableColor(table)}">
									<span class="font-medium">{table}:</span>
									<span class="font-mono">{dbData.counts[table] || 0}</span>
								</div>
							{/each}
						</div>
					</div>

					<!-- Table Selector -->
					<div class="mb-4">
						<label class="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100" for="table-selector">
							📋 Select Table:
						</label>
						<select
							id="table-selector"
							bind:value={selectedTable}
							class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm"
							onchange={() => fetchDbData(selectedTable)}
						>
							{#each tables as table}
								<option value={table}>{table} ({dbData.counts[table] || 0})</option>
							{/each}
						</select>
					</div>

					<!-- Selected Table Data -->
					{#if dbData.data[selectedTable]?.length > 0}
						{@const sampleRecord = dbData.data[selectedTable][0]}
						{@const columns = Object.keys(sampleRecord)}

						<div class="mb-4">
							<h4 class="text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100">
								🗂️ {selectedTable} ({dbData.data[selectedTable].length} records)
							</h4>

							<div class="overflow-x-auto">
								<table class="w-full text-xs border dark:border-gray-600">
									<thead>
										<tr class="bg-gray-100 dark:bg-gray-700">
											{#each columns as column}
												<th class="border dark:border-gray-600 px-2 py-1 text-left font-medium">
													{column}
												</th>
											{/each}
										</tr>
									</thead>
									<tbody>
										{#each dbData.data[selectedTable] as record, i}
											<tr class="border-b dark:border-gray-600 {i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'}">
												{#each columns as column}
													<td class="border dark:border-gray-600 px-2 py-1 font-mono text-xs max-w-[150px] truncate" title={String(record[column])}>
														{#if column === 'password_hash'}
															<span class="text-gray-400">***hidden***</span>
														{:else if column === 'email_verified'}
															<span class="px-1 py-0.5 rounded text-xs {record[column] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
																{record[column] ? '✅' : '❌'}
															</span>
														{:else}
															{formatValue(record[column])}
														{/if}
													</td>
												{/each}
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					{:else}
						<div class="text-center py-8 text-gray-500 dark:text-gray-400">
							📭 No records found in {selectedTable}
						</div>
					{/if}

					<!-- Raw Data (collapsed by default) -->
					<details class="mt-4">
						<summary class="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
							🔍 Raw JSON Data
						</summary>
						<pre class="mt-2 bg-gray-100 dark:bg-gray-900 p-3 rounded text-xs overflow-auto max-h-40 text-gray-800 dark:text-gray-200">
{JSON.stringify(dbData.data[selectedTable], null, 2)}
						</pre>
					</details>
				{:else}
					<div class="text-center py-8 text-gray-500 dark:text-gray-400">
						❌ Failed to load database data
					</div>
				{/if}
			</div>
		</div>
	{/if}
{/if}

<style>
	/* Custom scrollbar for the content area */
	.overflow-auto::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	.overflow-auto::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 4px;
	}

	.overflow-auto::-webkit-scrollbar-thumb {
		background: #c1c1c1;
		border-radius: 4px;
	}

	.overflow-auto::-webkit-scrollbar-thumb:hover {
		background: #a1a1a1;
	}
</style>
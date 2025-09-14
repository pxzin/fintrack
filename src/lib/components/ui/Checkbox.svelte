<script lang="ts">
	interface Props {
		checked?: boolean;
		label?: string;
		id?: string;
		disabled?: boolean;
		class?: string;
	}

	let {
		checked = $bindable(false),
		label,
		id,
		disabled = false,
		class: className = '',
		...restProps
	}: Props = $props();

	let focused = $state(false);
</script>

<div class="flex items-center {className}">
	<label class="flex items-center cursor-pointer select-none {disabled ? 'cursor-not-allowed opacity-60' : ''}" for={id}>
		<div class="relative flex items-center justify-center w-4 h-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-all {checked ? 'bg-blue-500 border-blue-500' : ''} {focused ? 'ring-2 ring-blue-100 dark:ring-blue-900/30' : ''} {disabled ? 'cursor-not-allowed' : 'hover:border-blue-400'}">
			<input
				bind:checked
				{id}
				{disabled}
				type="checkbox"
				class="absolute opacity-0 w-full h-full cursor-pointer {disabled ? 'cursor-not-allowed' : ''}"
				onfocus={() => focused = true}
				onblur={() => focused = false}
				{...restProps}
			/>
			{#if checked}
				<div class="text-white">
					<i class="i-lucide-check w-3 h-3"></i>
				</div>
			{/if}
		</div>

		{#if label}
			<span class="ml-2 text-sm text-gray-700 dark:text-gray-300">{label}</span>
		{/if}
	</label>
</div>

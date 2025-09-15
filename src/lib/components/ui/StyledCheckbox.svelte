<script lang="ts">
	interface Props {
		checked?: boolean;
		label?: string;
		id?: string;
		disabled?: boolean;
		class?: string;
	}

	/* eslint-disable prefer-const */
	let {
		checked = $bindable(false),
		label,
		id,
		disabled = false,
		class: className = '',
		...restProps
	}: Props = $props();
	/* eslint-enable prefer-const */
</script>

<div class="flex items-center gap-2 {className}">
	<div
		class="relative w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 cursor-pointer transition-all flex-shrink-0 {checked
			? 'bg-blue-500 border-blue-500'
			: 'hover:border-gray-400'} {disabled ? 'opacity-60 cursor-not-allowed' : ''}"
	>
		<input
			bind:checked
			type="checkbox"
			{id}
			{disabled}
			class="absolute opacity-0 w-full h-full m-0 cursor-pointer {disabled
				? 'cursor-not-allowed'
				: ''}"
			{...restProps}
		/>
		{#if checked}
			<div
				class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
			>
				<svg
					width="12"
					height="9"
					viewBox="0 0 12 9"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1 4.5L4.5 8L11 1"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
		{/if}
	</div>

	{#if label}
		<label
			for={id}
			class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer select-none whitespace-nowrap {disabled
				? 'opacity-60 cursor-not-allowed'
				: ''}"
		>
			{label}
		</label>
	{/if}
</div>

<script lang="ts">
	interface Props {
		type?: 'text' | 'email' | 'password' | 'number';
		placeholder?: string;
		value?: string;
		label?: string;
		id?: string;
		required?: boolean;
		disabled?: boolean;
		class?: string;
	}

	let {
		type = 'text',
		placeholder = '',
		value = $bindable(''),
		label,
		id,
		required = false,
		disabled = false,
		class: className = '',
		...restProps
	}: Props = $props();

	let inputElement: HTMLInputElement | undefined = $state();
	let focused = $state(false);
	let filled = $derived(value && value.length > 0);
</script>

<div class="input-field {className}">
	{#if label}
		<label for={id} class="input-label">
			{label}
		</label>
	{/if}
	
	<div class="input-wrapper" class:focused class:filled class:disabled>
		<input
			bind:this={inputElement}
			bind:value
			{type}
			{placeholder}
			{id}
			{required}
			{disabled}
			class="input"
			onfocus={() => focused = true}
			onblur={() => focused = false}
			{...restProps}
		/>
	</div>
</div>

<style>
	.input-field {
		@apply w-full;
	}

	.input-label {
		@apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2;
	}

	.input-wrapper {
		@apply relative bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors;
	}

	.input-wrapper:hover {
		@apply border-gray-300 dark:border-gray-600;
	}

	.input-wrapper.focused {
		@apply border-primary-500 ring-2 ring-primary-100 dark:ring-primary-900/30;
	}

	.input-wrapper.disabled {
		@apply opacity-60 cursor-not-allowed;
	}

	.input {
		@apply w-full px-4 py-3 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-0 rounded-lg focus:outline-none;
	}

	.input::placeholder {
		@apply text-gray-400 dark:text-gray-500;
	}

	.input:disabled {
		@apply cursor-not-allowed;
	}
</style>
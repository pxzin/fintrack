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

<div class="checkbox-field {className}">
	<label class="checkbox-label" class:disabled for={id}>
		<div class="checkbox-wrapper" class:checked class:focused class:disabled>
			<input
				bind:checked
				{id}
				{disabled}
				type="checkbox"
				class="checkbox-input"
				onfocus={() => focused = true}
				onblur={() => focused = false}
				{...restProps}
			/>
			{#if checked}
				<div class="checkbox-icon">
					<i class="i-lucide-check w-3 h-3"></i>
				</div>
			{/if}
		</div>
		
		{#if label}
			<span class="checkbox-text">{label}</span>
		{/if}
	</label>
</div>

<style>
	.checkbox-field {
		@apply flex items-center;
	}

	.checkbox-label {
		@apply flex items-center cursor-pointer select-none;
	}

	.checkbox-label.disabled {
		@apply cursor-not-allowed opacity-60;
	}

	.checkbox-wrapper {
		@apply relative flex items-center justify-center w-4 h-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-all;
	}

	.checkbox-wrapper:hover:not(.disabled) {
		@apply border-primary-400;
	}

	.checkbox-wrapper.focused {
		@apply ring-2 ring-primary-100 dark:ring-primary-900/30;
	}

	.checkbox-wrapper.checked {
		@apply bg-primary-500 border-primary-500;
	}

	.checkbox-wrapper.disabled {
		@apply cursor-not-allowed;
	}

	.checkbox-input {
		@apply absolute opacity-0 w-full h-full cursor-pointer;
	}

	.checkbox-input:disabled {
		@apply cursor-not-allowed;
	}

	.checkbox-icon {
		@apply text-white;
	}

	.checkbox-text {
		@apply ml-2 text-sm text-gray-700 dark:text-gray-300;
	}
</style>
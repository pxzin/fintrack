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
		width: 100%;
	}

	.input-label {
		display: block;
		font-size: 14px;
		font-weight: 500;
		color: #111827;
		margin-bottom: 8px;
	}

	.input-wrapper {
		position: relative;
		background: #f3f4f6;
		border-radius: 12px;
		border: 0;
		transition: all 0.2s;
	}

	.input-wrapper:hover {
		background: #e5e7eb;
	}

	.input-wrapper.focused {
		background: #f3f4f6;
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
	}

	.input-wrapper.disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.input {
		width: 100%;
		padding: 12px 16px;
		background: transparent;
		color: #111827;
		border: 0;
		border-radius: 12px;
		outline: none;
		font-size: 14px;
	}

	.input::placeholder {
		color: #9ca3af;
	}

	.input:disabled {
		cursor: not-allowed;
	}
</style>
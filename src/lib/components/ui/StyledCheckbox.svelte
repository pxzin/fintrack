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

	let checkboxElement: HTMLInputElement | undefined = $state();
</script>

<div class="checkbox-container {className}">
	<div class="checkbox-wrapper" class:checked class:disabled>
		<input
			bind:this={checkboxElement}
			bind:checked
			type="checkbox"
			{id}
			{disabled}
			class="checkbox-input"
			{...restProps}
		/>
		{#if checked}
			<div class="checkbox-check">
				<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 4.5L4.5 8L11 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
		{/if}
	</div>
	
	{#if label}
		<label for={id} class="checkbox-label" class:disabled>
			{label}
		</label>
	{/if}
</div>

<style>
	.checkbox-container {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.checkbox-wrapper {
		position: relative;
		width: 20px;
		height: 20px;
		border: 2px solid #d1d5db;
		border-radius: 4px;
		background: white;
		cursor: pointer;
		transition: all 0.2s ease;
		flex-shrink: 0;
	}

	.checkbox-wrapper:hover {
		border-color: #9ca3af;
	}

	.checkbox-wrapper.checked {
		background: #3b82f6;
		border-color: #3b82f6;
	}

	.checkbox-wrapper.disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.checkbox-input {
		position: absolute;
		opacity: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		cursor: pointer;
	}

	.checkbox-input:disabled {
		cursor: not-allowed;
	}

	.checkbox-check {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.checkbox-label {
		font-size: 14px;
		font-weight: 500;
		color: #111827;
		cursor: pointer;
		user-select: none;
		white-space: nowrap;
	}

	.checkbox-label.disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
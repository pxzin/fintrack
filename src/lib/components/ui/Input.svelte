<script lang="ts">
	interface Props {
		type?: 'text' | 'email' | 'password' | 'number';
		placeholder?: string;
		value?: string;
		label?: string;
		id?: string;
		name?: string;
		required?: boolean;
		disabled?: boolean;
		class?: string;
		autocomplete?: HTMLInputElement['autocomplete'];
		'data-form-type'?: string;
	}

	let {
		type = 'text',
		placeholder = '',
		value = $bindable(''),
		label,
		id,
		name,
		required = false,
		disabled = false,
		class: className = '',
		autocomplete,
		'data-form-type': dataFormType,
		...restProps
	}: Props = $props();

	let focused = $state(false);
</script>

<div class="w-full {className}">
	{#if label}
		<label for={id} class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
			{label}
		</label>
	{/if}

	<div
		class="relative bg-gray-100 dark:bg-slate-700 rounded-xl border-0 transition-all hover:bg-gray-200 dark:hover:bg-slate-600 {focused
			? 'bg-gray-100 dark:bg-slate-700 ring-2 ring-blue-500/20'
			: ''} {disabled ? 'opacity-60 cursor-not-allowed' : ''}"
	>
		<input
			bind:value
			{type}
			{placeholder}
			{id}
			{name}
			{required}
			{disabled}
			{autocomplete}
			data-form-type={dataFormType}
			class="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-gray-100 border-0 rounded-xl outline-none text-sm placeholder-gray-500 dark:placeholder-gray-400 {disabled
				? 'cursor-not-allowed'
				: ''}"
			onfocus={() => (focused = true)}
			onblur={() => (focused = false)}
			{...restProps}
		/>
	</div>
</div>

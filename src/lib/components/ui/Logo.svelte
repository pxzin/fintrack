<script lang="ts">
	interface Props {
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	}

	let { size = 'md', class: className = '' }: Props = $props();

	const sizeClasses = {
		sm: 'text-lg',
		md: 'text-2xl',
		lg: 'text-3xl'
	};
</script>

<div
	class="font-bold font-sans tracking-tight inline-flex items-center {sizeClasses[
		size
	]} {className}"
>
	<span class="bg-gradient-to-br from-blue-500 to-indigo-500 bg-clip-text text-transparent"
		>Fin</span
	><span class="text-gray-900 dark:text-white">Track</span>
</div>

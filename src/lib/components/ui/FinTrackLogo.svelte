<script lang="ts">
	let { size = 'md', showText = true } = $props<{
		size?: 'sm' | 'md' | 'lg';
		showText?: boolean;
	}>();

	const sizeClasses = {
		sm: 'w-6 h-6',
		md: 'w-8 h-8',
		lg: 'w-12 h-12'
	};

	const textSizeClasses = {
		sm: 'text-lg',
		md: 'text-2xl',
		lg: 'text-3xl'
	};
</script>

<div class="flex items-center space-x-2">
	<!-- Logo Icon -->
	<div
		class="relative {sizeClasses[
			size as keyof typeof sizeClasses
		]} flex items-center justify-center"
	>
		<svg
			viewBox="0 0 32 32"
			class="w-full h-full text-blue-600 dark:text-blue-400"
			fill="currentColor"
		>
			<!-- Finance/Chart inspired logo -->
			<path
				d="M4 28h24M6 24V16M10 24V12M14 24V8M18 24V14M22 24V10M26 24V6"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				fill="none"
			/>
			<circle cx="6" cy="16" r="1.5" fill="currentColor" />
			<circle cx="10" cy="12" r="1.5" fill="currentColor" />
			<circle cx="14" cy="8" r="1.5" fill="currentColor" />
			<circle cx="18" cy="14" r="1.5" fill="currentColor" />
			<circle cx="22" cy="10" r="1.5" fill="currentColor" />
			<circle cx="26" cy="6" r="1.5" fill="currentColor" />
		</svg>
	</div>

	<!-- Logo Text -->
	{#if showText}
		<span
			class="font-bold text-blue-600 dark:text-blue-400 {textSizeClasses[
				size as keyof typeof textSizeClasses
			]}"
		>
			FinTrack
		</span>
	{/if}
</div>

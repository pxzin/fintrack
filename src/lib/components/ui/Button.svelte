<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements'
	
	interface Props extends HTMLButtonAttributes {
		variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
		size?: 'sm' | 'md' | 'lg'
		loading?: boolean
		disabled?: boolean
		icon?: string
		iconPosition?: 'left' | 'right'
		fullWidth?: boolean
	}
	
	let {
		variant = 'primary',
		size = 'md',
		loading = false,
		disabled = false,
		icon,
		iconPosition = 'left',
		fullWidth = false,
		class: className = '',
		children,
		...restProps
	}: Props = $props()
	
	const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
	
	const variantClasses = {
		primary: 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white focus:ring-primary-500',
		secondary: 'bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-neutral-900 focus:ring-neutral-500',
		success: 'bg-success-500 hover:bg-success-600 active:bg-success-700 text-white focus:ring-success-500',
		danger: 'bg-danger-500 hover:bg-danger-600 active:bg-danger-700 text-white focus:ring-danger-500',
		ghost: 'bg-transparent hover:bg-neutral-100 active:bg-neutral-200 text-neutral-700 focus:ring-neutral-500'
	}
	
	const sizeClasses = {
		sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
		md: 'px-4 py-2 text-base rounded-lg gap-2',
		lg: 'px-6 py-3 text-lg rounded-lg gap-2.5'
	}
	
	const iconSizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-5 h-5', 
		lg: 'w-6 h-6'
	}
	
	const combinedClasses = [
		baseClasses,
		variantClasses[variant],
		sizeClasses[size],
		fullWidth ? 'w-full' : '',
		className
	].filter(Boolean).join(' ')
</script>

<button
	class={combinedClasses}
	disabled={disabled || loading}
	{...restProps}
>
	{#if loading}
		<div class="animate-spin {iconSizeClasses[size]} border-2 border-current border-t-transparent rounded-full"></div>
	{:else if icon && iconPosition === 'left'}
		<div class="i-lucide-{icon} {iconSizeClasses[size]}"></div>
	{/if}
	
	{@render children?.()}
	
	{#if !loading && icon && iconPosition === 'right'}
		<div class="i-lucide-{icon} {iconSizeClasses[size]}"></div>
	{/if}
</button>
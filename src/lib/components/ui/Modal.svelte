<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface ModalProps {
		open?: boolean;
		title?: string;
		subtitle?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
		showCloseButton?: boolean;
		closeOnOverlayClick?: boolean;
		closeOnEscape?: boolean;
	}

	let {
		open = $bindable(false),
		title,
		subtitle,
		size = 'md',
		showCloseButton = true,
		closeOnOverlayClick = true,
		closeOnEscape = true
	} = $props();

	const dispatch = createEventDispatcher();

	// Size classes
	const sizeClasses = {
		sm: 'sm:max-w-sm',
		md: 'sm:max-w-lg',
		lg: 'sm:max-w-2xl',
		xl: 'sm:max-w-4xl',
		full: 'sm:max-w-full sm:m-4'
	};

	function closeModal() {
		open = false;
		dispatch('close');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (closeOnEscape && event.key === 'Escape') {
			closeModal();
		}
	}

	function handleOverlayClick() {
		if (closeOnOverlayClick) {
			closeModal();
		}
	}
</script>

{#if open}
	<!-- Modal backdrop -->
	<div
		class="fixed inset-0 z-50 overflow-y-auto"
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? 'modal-title' : undefined}
		tabindex="-1"
		onkeydown={handleKeydown}
	>
		<div
			class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
		>
			<!-- Background overlay -->
			<div
				class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
				onclick={handleOverlayClick}
			></div>

			<!-- This element is to trick the browser into centering the modal contents. -->
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
				>&#8203;</span
			>

			<!-- Modal panel -->
			<div
				class="inline-block w-full text-left align-bottom transition-all transform bg-white dark:bg-gray-800 rounded-lg shadow-xl sm:my-8 sm:align-middle {sizeClasses[
					size as keyof typeof sizeClasses
				]}"
			>
				<!-- Header -->
				{#if title || showCloseButton}
					<div
						class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700"
					>
						<div>
							{#if title}
								<h3 id="modal-title" class="text-lg font-medium text-gray-900 dark:text-gray-100">
									{title}
								</h3>
							{/if}
							{#if subtitle}
								<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
									{subtitle}
								</p>
							{/if}
						</div>
						{#if showCloseButton}
							<button
								type="button"
								onclick={closeModal}
								class="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						{/if}
					</div>
				{/if}

				<!-- Content -->
				<div class="px-6 py-4">
					<slot />
				</div>

				<!-- Footer -->
				<slot name="footer" />
			</div>
		</div>
	</div>
{/if}

<script lang="ts">
	interface Props {
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	}

	let {
		size = 'md',
		class: className = ''
	}: Props = $props();

	const sizeClasses = {
		sm: 'text-lg',
		md: 'text-2xl',
		lg: 'text-3xl'
	};
</script>

<div class="logo {sizeClasses[size]} {className}">
	<span class="logo-fin">Fin</span><span class="logo-track">Track</span>
</div>

<style>
	.logo {
		font-weight: 700;
		font-family: system-ui, -apple-system, sans-serif;
		letter-spacing: -0.02em;
		display: inline-flex;
		align-items: center;
	}

	.text-lg {
		font-size: 18px;
	}

	.text-2xl {
		font-size: 24px;
	}

	.text-3xl {
		font-size: 30px;
	}

	.logo-fin {
		color: #3b82f6;
		background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.logo-track {
		color: #111827;
	}

	/* Fallback para navegadores que não suportam background-clip */
	@supports not (-webkit-background-clip: text) {
		.logo-fin {
			color: #3b82f6;
		}
	}
</style>
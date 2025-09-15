<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { goto } from '$app/navigation';

	let initLoading = $state(false);
	let initMessage = $state('');

	async function initDatabase() {
		initLoading = true;
		initMessage = '';

		try {
			const response = await fetch('/api/init', {
				method: 'POST'
			});

			const result = await response.json();

			if (result.success) {
				initMessage = '✅ ' + result.message;
			} else {
				initMessage = '❌ ' + result.error;
			}
		} catch (error) {
			initMessage = '❌ Erro: ' + String(error);
		} finally {
			initLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Teste - FinTrack</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center px-4">
	<div class="max-w-md w-full">
		<div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 text-center">
			<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
				🧪 Página de Teste
			</h1>

			<p class="text-gray-600 dark:text-gray-400 mb-6">
				Esta é uma rota <strong>desprotegida</strong> que pode ser acessada sem autenticação.
			</p>

			<div class="space-y-3">
				<Button
					variant="primary"
					class="w-full"
					onclick={initDatabase}
					disabled={initLoading}
					loading={initLoading}
				>
					{initLoading ? 'Inicializando...' : 'Inicializar Banco de Dados'}
				</Button>

				{#if initMessage}
					<div class="p-3 {initMessage.startsWith('✅') ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'} border rounded-lg">
						<p class="text-sm">{initMessage}</p>
					</div>
				{/if}

				<Button
					variant="secondary"
					class="w-full"
					onclick={() => goto('/login')}
				>
					Ir para Login
				</Button>

				<Button
					variant="secondary"
					class="w-full"
					onclick={() => goto('/dashboard')}
				>
					Tentar acessar Dashboard (protegido)
				</Button>
			</div>

			<div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
				<h3 class="text-blue-800 dark:text-blue-400 font-medium mb-2">📝 Informações:</h3>
				<ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1 text-left">
					<li>• Esta página é acessível sem login</li>
					<li>• O dashboard requer autenticação</li>
					<li>• Use: email@email.com / mudar123</li>
				</ul>
			</div>
		</div>
	</div>
</div>
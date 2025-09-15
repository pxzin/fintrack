<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{$LL.dashboard.title()} - FinTrack</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-slate-900">
	<div class="container mx-auto px-4 py-8">
		<!-- Header -->
		<header class="mb-8">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-3xl font-bold text-gray-900 dark:text-white">
						{$LL.dashboard.title()}
					</h1>
					<p class="text-gray-600 dark:text-gray-400 mt-1">
						Bem-vindo, {data.user.full_name}!
					</p>
				</div>

				<form action="/logout" method="POST" use:enhance>
					<Button variant="secondary" type="submit">
						{$LL.auth.logout()}
					</Button>
				</form>
			</div>
		</header>

		<!-- Content -->
		<div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
				🎉 Autenticação funcionando!
			</h2>

			<div class="space-y-3 text-gray-600 dark:text-gray-400">
				<p><strong>Email:</strong> {data.user.email}</p>
				<p><strong>Nome:</strong> {data.user.full_name}</p>
				<p><strong>ID:</strong> {data.user.id}</p>
				<p><strong>Criado em:</strong> {data.user.created_at.toLocaleString('pt-BR')}</p>
			</div>

			<div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
				<h3 class="text-green-800 dark:text-green-400 font-medium mb-2">✅ Sistema de autenticação implementado:</h3>
				<ul class="text-sm text-green-700 dark:text-green-300 space-y-1">
					<li>• Login com email/senha funcionando</li>
					<li>• Sessões seguras com cookies HttpOnly</li>
					<li>• Proteção de rotas implementada</li>
					<li>• Logout funcional</li>
					<li>• Hash de senhas com Argon2</li>
				</ul>
			</div>
		</div>
	</div>
</div>
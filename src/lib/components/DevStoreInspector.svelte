<script lang="ts">
  import { onMount } from 'svelte';
  import { devStores } from '$lib/stores/index';
  import { dev } from '$app/environment';

  let open = false;
  let storeValues: Record<string, any> = {};
  const unsubscribers: Array<() => void> = [];
  let pollInterval: number | null = null;

  // Subscribes em stores e trata funções/valores
  function initDevStores() {
    // limpar estado anterior
    storeValues = {};
    unsubscribers.splice(0, unsubscribers.length);

    for (const [key, entry] of Object.entries(
      devStores as Record<string, any>
    )) {
      try {
        if (entry && typeof entry.subscribe === 'function') {
          const unsub = entry.subscribe((v: any) => {
            storeValues = { ...storeValues, [key]: v };
          });
          if (typeof unsub === 'function') unsubscribers.push(unsub);
        } else if (typeof entry === 'function') {
          // call to get current value
          storeValues = { ...storeValues, [key]: entry() };
        } else {
          storeValues = { ...storeValues, [key]: entry };
        }
      } catch (err) {
        storeValues = { ...storeValues, [key]: `error: ${String(err)}` };
      }
    }

    // polling para funções/valores que podem mudar
    if (pollInterval) clearInterval(pollInterval);
    pollInterval = setInterval(() => {
      for (const [key, entry] of Object.entries(
        devStores as Record<string, any>
      )) {
        if (!(entry && typeof entry.subscribe === 'function')) {
          try {
            const val = typeof entry === 'function' ? entry() : entry;
            storeValues = { ...storeValues, [key]: val };
          } catch (e) {
            // ignore polling errors
          }
        }
      }
    }, 1000) as unknown as number;
  }

  function cleanup() {
    for (const u of unsubscribers) {
      try {
        u();
      } catch {}
    }
    unsubscribers.splice(0, unsubscribers.length);
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
  }

  onMount(() => {
    initDevStores();
    return cleanup;
  });
</script>

{#if dev}
  <button
    class="fixed left-4 bottom-4 z-[9999] bg-[#4F83FF] text-white rounded-lg px-4 py-2 text-sm shadow-md hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#4F83FF]/50"
    on:click={() => (open = !open)}
    aria-label="Abrir painel de stores"
  >
    🛠️ Stores
  </button>

  {#if open}
    <div
      class="fixed left-4 bottom-16 z-[9999] w-[90vw] max-w-[480px] max-h-[60vh] overflow-auto bg-white/95 dark:bg-[#0B1220]/95 backdrop-blur-sm rounded-lg shadow-2xl p-4 text-sm"
    >
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-base font-semibold text-[#4F83FF]">Stores (Dev)</h2>
        <button
          class="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-300"
          on:click={() => {
            storeValues = {};
          }}
          title="Clear">Limpar</button
        >
      </div>
      <div class="space-y-3">
        {#each Object.entries(storeValues) as [key, value]}
          <section
            class="border border-gray-100 dark:border-[#1f2937] rounded-md p-2 bg-white dark:bg-[#071028]"
          >
            <div class="flex items-center justify-between mb-1">
              <h3 class="text-sm font-medium text-gray-800 dark:text-gray-100">
                {key}
              </h3>
              <button
                class="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-300"
                on:click={() =>
                  navigator.clipboard?.writeText(JSON.stringify(value))}
                >Copiar</button
              >
            </div>
            <pre
              class="whitespace-pre-wrap text-xs text-gray-700 dark:text-gray-200">{JSON.stringify(
                value,
                null,
                2
              )}</pre>
          </section>
        {/each}
      </div>
    </div>
  {/if}
{/if}

<!-- styles handled by UnoCSS utility classes -->

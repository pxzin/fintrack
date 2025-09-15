<script lang="ts">
  import { onMount } from 'svelte';
  import { devStores } from '$lib/stores/index';
  import { dev } from '$app/environment';

  let open = false;
  let storeValues: Record<string, any> = {};
  let storeMeta: Record<string, string> = {};
  let expanded: Record<string, boolean> = {};
  const DEFAULT_DEPTH = 2;
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
        // exported-state-like (Svelte 5): object com .value
        if (entry && typeof entry === 'object' && 'value' in entry) {
          // se também tem subscribe, use para reatividade
          if (typeof (entry as any).subscribe === 'function') {
            const unsub = (entry as any).subscribe(() => {
              storeValues = { ...storeValues, [key]: (entry as any).value };
            });
            if (typeof unsub === 'function') unsubscribers.push(unsub);
            storeValues = { ...storeValues, [key]: (entry as any).value };
            storeMeta[key] = 'exported-state (subscribable)';
          } else {
            storeValues = { ...storeValues, [key]: (entry as any).value };
            storeMeta[key] = 'exported-state';
          }
        } else if (entry && typeof entry.subscribe === 'function') {
          const unsub = entry.subscribe((v: any) => {
            storeValues = { ...storeValues, [key]: v };
          });
          if (typeof unsub === 'function') unsubscribers.push(unsub);
          storeMeta[key] = 'store';
        } else if (typeof entry === 'function') {
          storeValues = { ...storeValues, [key]: entry() };
          storeMeta[key] = 'function';
        } else {
          storeValues = { ...storeValues, [key]: entry };
          storeMeta[key] = 'value';
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
        // skip entries with subscribe (inclui exported-state com subscribe)
        if (
          entry &&
          (typeof entry.subscribe === 'function' ||
            (typeof entry === 'object' &&
              'value' in entry &&
              typeof (entry as any).subscribe === 'function'))
        ) {
          continue;
        }
        try {
          const val =
            typeof entry === 'function'
              ? entry()
              : entry && 'value' in entry
                ? (entry as any).value
                : entry;
          storeValues = { ...storeValues, [key]: val };
          if (!storeMeta[key]) {
            storeMeta[key] =
              typeof entry === 'function'
                ? 'function'
                : entry && 'value' in entry
                  ? 'exported-state'
                  : 'value';
          }
        } catch (e) {
          // ignore polling errors
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

  // Serializa objeto com limite de profundidade e evita ciclos
  function renderLimited(
    obj: any,
    depth: number,
    seen = new WeakSet(),
    current = 0
  ): string {
    if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
    if (seen.has(obj)) return '"[Circular]"';
    if (current >= depth) {
      try {
        return JSON.stringify(obj);
      } catch {
        return '"[Object]"';
      }
    }
    seen.add(obj);
    const entries = Array.isArray(obj)
      ? obj.map((v) => renderLimited(v, depth, seen, current + 1))
      : Object.fromEntries(
          Object.entries(obj).map(([k, v]) => [
            k,
            renderLimited(v, depth, seen, current + 1),
          ])
        );
    try {
      return JSON.stringify(entries, null, 2);
    } finally {
      seen.delete(obj);
    }
  }
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
              <div class="flex items-center gap-2">
                <h3
                  class="text-sm font-medium text-gray-800 dark:text-gray-100"
                >
                  {key}
                </h3>
                <span class="text-xs text-gray-500 dark:text-gray-300"
                  >{storeMeta[key]}</span
                >
              </div>
              <button
                class="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-300"
                on:click={() =>
                  navigator.clipboard?.writeText(JSON.stringify(value))}
                >Copiar</button
              >
            </div>
            <div class="flex items-center justify-between mb-2">
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Depth: {DEFAULT_DEPTH}
              </div>
              <button
                class="text-xs text-gray-500"
                on:click={() => (expanded[key] = !expanded[key])}
                >{expanded[key] ? 'Colapsar' : 'Expandir'}</button
              >
            </div>
            <pre
              class="whitespace-pre-wrap text-xs text-gray-700 dark:text-gray-200">{renderLimited(
                value,
                expanded[key] ? Infinity : DEFAULT_DEPTH
              )}</pre>
          </section>
        {/each}
      </div>
    </div>
  {/if}
{/if}

<!-- styles handled by UnoCSS utility classes -->

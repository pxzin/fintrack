<script lang="ts">
  import '../app.css';
  import 'virtual:uno.css';
  import favicon from '$lib/assets/favicon.svg';
  import { browser } from '$app/environment';
  import { themeState } from '$lib/stores/theme.svelte.js';
  import { initLocale } from '$lib/stores/locale.svelte.js';
  import { onMount } from 'svelte';

  let { children } = $props();

  // Initialize theme and locale on mount
  onMount(async () => {
    if (browser) {
      // Initialize locale
      await initLocale();

      // Theme is already initialized in the store constructor
      // but we ensure the class is applied correctly
      const isDark = themeState.isDark;
      document.documentElement.classList.toggle('dark', isDark);
    }
  });
  import DevStoreInspector from '$lib/components/DevStoreInspector.svelte';
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<DevStoreInspector />
{@render children?.()}

// Exporta todas as stores automaticamente
import { theme, resolvedTheme, themeState } from './theme.svelte';
import { getLocale } from './locale.svelte';

// Registro usado pelo DevStoreInspector. Cada entry pode ser:
// - um objeto com .subscribe (Svelte store / exported state wrapper)
// - uma função que retorna o valor atual (ex: getLocale)
// - um valor qualquer
export const devStores = {
  theme,
  resolvedTheme,
  themeState,
  getLocale,
};

// Re-exportações normais para uso do app
export { themeState, theme, resolvedTheme, getLocale };

// Adicione novas stores ao registro `devStores` quando necessário:
// ex: import { otherState } from './other.svelte'
// devStores.otherState = otherState

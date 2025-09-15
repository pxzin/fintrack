import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

// exported state must not be reassigned; use objects and mutate .value
export let theme = $state<{ value: Theme }>({ value: 'system' });
export let resolvedTheme = $state<{ value: 'light' | 'dark' }>({
  value: 'light',
});

function updateResolvedFromTheme() {
  if (theme.value === 'system') {
    resolvedTheme.value = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
  } else {
    resolvedTheme.value = theme.value as 'light' | 'dark';
  }
}

export function setTheme(t: Theme) {
  theme.value = t;
  if (browser) {
    try {
      localStorage.setItem('theme', t);
    } catch {}
  }
  if (browser) updateResolvedFromTheme();
  applyTheme();
}

export function toggleTheme() {
  const newTheme = resolvedTheme.value === 'dark' ? 'light' : 'dark';
  setTheme(newTheme as Theme);
}

function applyTheme() {
  if (!browser) return;
  const root = document.documentElement;
  if (resolvedTheme.value === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

// Inicialização em ambiente browser
if (browser) {
  try {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (
      saved &&
      (saved === 'light' || saved === 'dark' || saved === 'system')
    ) {
      theme.value = saved;
    }
  } catch {}

  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const mqHandler = () => updateResolvedFromTheme();
  mq.addEventListener('change', mqHandler);

  updateResolvedFromTheme();
  applyTheme();
}

// Compat layer: objeto themeState para não quebrar código existente
export const themeState = {
  get isDark() {
    return resolvedTheme.value === 'dark';
  },
  setTheme,
  toggle: toggleTheme,
  // expose raw exported states (the objects) for advanced use
  themeRef: () => theme,
  resolvedRef: () => resolvedTheme,
};

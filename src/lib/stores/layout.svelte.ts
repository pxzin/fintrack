// Layout state using Svelte 5 $state
export const layoutState = $state({
	sidebarOpen: true,
	sidebarCollapsed: false, // New: para modo recolhido apenas com ícones
	isMobile: false
});

// Helper functions
export function toggleSidebar() {
	if (layoutState.isMobile) {
		// Em mobile, só abre/fecha completamente
		layoutState.sidebarOpen = !layoutState.sidebarOpen;
	} else {
		// Em desktop, cicla entre: aberto → recolhido → fechado → aberto
		if (layoutState.sidebarOpen && !layoutState.sidebarCollapsed) {
			// Aberto → recolhido
			layoutState.sidebarCollapsed = true;
		} else if (layoutState.sidebarOpen && layoutState.sidebarCollapsed) {
			// Recolhido → fechado
			layoutState.sidebarOpen = false;
			layoutState.sidebarCollapsed = false;
		} else {
			// Fechado → aberto
			layoutState.sidebarOpen = true;
			layoutState.sidebarCollapsed = false;
		}
	}
}

export function setSidebarOpen(open: boolean) {
	layoutState.sidebarOpen = open;
	if (!open) {
		layoutState.sidebarCollapsed = false;
	}
}

export function setSidebarCollapsed(collapsed: boolean) {
	if (collapsed) {
		layoutState.sidebarOpen = true;
		layoutState.sidebarCollapsed = true;
	} else {
		layoutState.sidebarCollapsed = false;
	}
}

export function setMobile(mobile: boolean) {
	layoutState.isMobile = mobile;
	// Reset sidebar state quando muda para mobile
	if (mobile) {
		layoutState.sidebarCollapsed = false;
	}
}

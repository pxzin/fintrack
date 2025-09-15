// Layout state using Svelte 5 $state
export const layoutState = $state({
	sidebarOpen: true,
	isMobile: false
});

// Helper functions
export function toggleSidebar() {
	layoutState.sidebarOpen = !layoutState.sidebarOpen;
}

export function setSidebarOpen(open: boolean) {
	layoutState.sidebarOpen = open;
}

export function setMobile(mobile: boolean) {
	layoutState.isMobile = mobile;
}

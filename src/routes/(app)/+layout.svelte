<script lang="ts">
	import EmailVerificationAlert from '$lib/components/EmailVerificationAlert.svelte';
	import type { LayoutData } from './$types';

	const { children, data } = $props<{ children: any; data: LayoutData }>();
</script>

<!-- Email verification alert for unverified users -->
<EmailVerificationAlert user={data.user} />

<!-- Main content -->
{@render children?.()}

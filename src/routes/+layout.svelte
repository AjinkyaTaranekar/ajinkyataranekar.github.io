<script lang="ts">
	import '../app.css';
	import { trackClick } from '$lib/utils/analytics';

	let { children } = $props();
</script>

<svelte:document onclick={trackClick} />

{@render children?.()}

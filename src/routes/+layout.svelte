<script>
	import { toast } from '$lib/state/toast.svelte';
	import Toast from '$lib/components/admin/Toast.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Toast 
    visible={toast.show} 
    message={toast.message} 
    onExited={() => toast.show = false} 
/>
{@render children()}

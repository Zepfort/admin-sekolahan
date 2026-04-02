<script>
    import Sidebar from '$lib/components/admin/Sidebar.svelte';
    import Navbar from '$lib/components/admin/Navbar.svelte';

    import './layout.css'

	let { children, data } = $props();
    let user = $derived(data.user ?? {name: "Guest", initials: "G"});
</script>

<div class="flex min-h-screen bg-zinc-100 dark:bg-zinc-950">
	<Sidebar />

	<div class="flex-1 flex flex-col">
		<header class="h-16 border-b border-zinc-800 flex items-center px-8 text-white">
            <Navbar name={user.name} initials={user.initials}/>
		</header>

		<main class="p-8 text-zinc-300">

			{@render children()}
		</main>
	</div>
</div>
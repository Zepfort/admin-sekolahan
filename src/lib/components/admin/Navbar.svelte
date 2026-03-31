<script>
	import { enhance } from '$app/forms';
    
    let { name, initials } = $props();
	let isOpen = $state(false);

	function toggleDropdown() {
		isOpen = !isOpen;
	}
</script>

<header class="w-full h-16 border-b border-zinc-400 bg-gray-100 text-gray-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-gray-100 flex items-center justify-between px-8  relative">
	<div class="w-full flex justify-between">
        <div class="flex items-center gap-4">
            <span class="text-zinc-500 text-sm">Welcome to the Admin Dashboard</span>
        </div>
    
        <div class="relative">
            <button 
                onclick={toggleDropdown}
                class="flex items-center gap-2 hover:bg-zinc-900 p-2 rounded-lg transition-colors"
            >
                <div class="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold text-black">
                    {initials}
                </div>
                <span class="text-sm font-medium">{name}</span>
            </button>
    
            {#if isOpen}
                <div class="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl py-2 z-50">
                    <a href="/admin/profile" class="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white">
                        My Profile
                    </a>
                    
                    <hr class="my-1 border-zinc-800" />
    
                    <form method="POST" action="/logout" use:enhance>
                        <button 
                            type="submit" 
                            class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300"
                        >
                            Logout
                        </button>
                    </form>
                </div>
            {/if}
        </div>
    </div>
</header>
<script>
    import Icon from '@iconify/svelte';
    import { fade, fly } from 'svelte/transition';

    let { message = '', type = 'success', visible = false, onExited } = $props();

    // Auto-close setelah 3 detik
    $effect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onExited();
            }, 3000);
            return () => clearTimeout(timer);
        }
    });
</script>

{#if visible}
    <div 
        in:fly={{ y: 20, duration: 300 }} 
        out:fade={{ duration: 300 }}
        class="fixed top-6 right-6 z-99 flex items-center gap-3 rounded-lg border-2 border-green-600 bg-zinc-900 p-4 shadow-2xl shadow-emerald-500/10"
    >
        <div class="rounded-full bg-emerald-500/10 p-1 text-emerald-500">
            <Icon icon="lucide:check-circle" class="h-5 w-5" />
        </div>
        <p class="text-sm font-bold text-green-700">{message}</p>
    </div>
{/if}
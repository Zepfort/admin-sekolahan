<script>
    import Icon from '@iconify/svelte';
    let { open = false, title, message, onConfirm, onCancel } = $props();
</script>

{#if open}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div class="w-full max-w-md scale-100 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl transition-all">
            <div class="flex items-center gap-4 text-rose-500 mb-4">
                <div class="rounded-full bg-rose-500/10 p-3">
                    <Icon icon="lucide:alert-triangle" class="h-6 w-6" />
                </div>
                <h3 class="text-xl font-bold text-white">{title}</h3>
            </div>
            
            <p class="mb-6 text-zinc-400">{message}</p>

            <div class="flex justify-end gap-3">
                <button 
                    type="button"
                    onclick={onCancel}
                    class="px-4 py-2 text-sm rounded bg-gray-700 hover:bg-gray-600 text-zinc-200 hover:text-white transition"
                >
                    Batal
                </button>
                <button 
                    type="button"
                    onclick={onConfirm}
                    class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-gray-100 transition-colors hover:bg-rose-700"
                >
                    Ya, Hapus
                </button>
            </div>
        </div>
    </div>
{/if}
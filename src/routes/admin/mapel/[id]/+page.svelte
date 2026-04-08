<script>
    import Icon from '@iconify/svelte';
    import { toast } from '$lib/state/toast.svelte.js';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import ModalConfirm from '$lib/components/admin/ModalConfirm.svelte';
    import { applyAction, enhance } from '$app/forms';

    let { data } = $props();
    const mapel = $derived(data.mapel);
    const mapelId = $page.params.id;

    let deleteForm;
    let showModal = $state(false);
    let selectedMapelId = $state(null);
    let selectedMapelName = $state('');

    function confirmDelete(id, name) {
        selectedMapelId = id;
        selectedMapelName = name;
        showModal = true;
    }

    function executeDelete() {
        showModal = false;
        setTimeout(() => {
            deleteForm.requestSubmit();
        }, 10);
    }
</script>

<div class="p-8">
    <form 
        method="POST"
        bind:this={deleteForm}
        action="/admin/mapel?/delete"
        use:enhance={() => {
            return async ({result}) => {
                if (result.type === 'success') {
                    toast.send(`Mapel ${mapel.nama_mapel} berhasil dihapus!`);
                    goto('/admin/mapel', { invalidateAll: true});
                }

                await applyAction(result);
            }
        }}
    >
    <input type="hidden" name="id" value={selectedMapelId}/>
    </form>
        <ModalConfirm
        open={showModal}
        title="Hapus Kelas"
        message="Apakah kamu yakin menghapus {selectedMapelName}? Jadwal yang berkatian dengan mapel akan kehilangan mapel."
        onConfirm={executeDelete}
        onCancel={() => (showModal = false)}
    />
    <div class="mb-6 flex items-start">
        <a
            href="/admin/mapel"
            class="flex w-fit items-center px-2 text-sm text-zinc-400 transition-colors duration-100 hover:text-gray-100"
        >
            <Icon icon="famicons:arrow-back" class="h-6 w-6" />
            Kembali ke Daftar Mapel
        </a>
    </div>    

    <div class="min-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <div class="flex items-center justify-between border-b border-zinc-800 p-6">
            <h1 class="text-xl font-bold text-white">Detail Mapel</h1>
        </div>

        <div class="space-y-6 p-6">
            <div class="grid grid-cols-[120px_1fr] items-start gap-x-4 gap-y-4">
                <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Kode Mapel</span>
                <p class="font-medium text-zinc-200">{mapel.kode_mapel}</p>
    
                <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Nama Mapel</span>
                <p class="text-zinc-200 font-medium">{mapel.nama_mapel}</p>
            </div>
        </div>
    </div>

    <div class="flex justify-end gap-6 py-6">
        <a href="/admin/mapel/{mapelId}/edit"
            class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-gray-100 transition-colors hover:bg-blue-800"
        >
            <Icon icon="lucide:pencil" class="h-5 w-5" />
            Edit Mapel
        </a>
        <button
            type="button"
            onclick={() => confirmDelete(mapel.id, mapel.nama_mapel)}
            class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-gray-100 transition-colors hover:bg-rose-700"
        >
            <Icon icon="lucide:trash-2" class="h-5 w-5" />
            Hapus Mapel
        </button>
    </div>
</div>
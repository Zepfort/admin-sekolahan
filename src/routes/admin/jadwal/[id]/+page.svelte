<script>
    import Icon from '@iconify/svelte';
    import { toast } from '$lib/state/toast.svelte.js';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import ModalConfirm from '$lib/components/admin/ModalConfirm.svelte';
    import { enhance } from '$app/forms';

    let { data } = $props();
    const jadwal = $derived(data.jadwal);
    const jadwalId = $page.params.id;

    let deleteForm;
    let showModal = $state(false);
    let selectedJadwalId = $state(null);
    let selectedJadwalName = $state('');

    function confirmDelete(id, name) {
        selectedJadwalId = id;
        selectedJadwalName = name;
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
        action="/admin/jadwal?/delete" 
        use:enhance={() => {
            return async ({ result }) => {
                if (result.type === 'success') {
                    toast.send(`Jadwal berhasil dihapus!`);
                    goto('/admin/jadwal', { invalidateAll: true });
                } 
            };
        }}
    >
        <input type="hidden" name="id" value={selectedJadwalId}>  
    </form>

    <ModalConfirm
        open={showModal}
        title="Hapus Jadwal"
        message="Apakah kamu yakin menghapus jadwal {selectedJadwalName}?"
        onConfirm={executeDelete}
        onCancel={() => (showModal = false)}
    />

    <div class="mb-6 flex items-start">
        <a
            href="/admin/jadwal"
            class="flex w-fit items-center px-2 text-sm text-zinc-400 transition-colors duration-100 hover:text-white"
        >
            <Icon icon="famicons:arrow-back" class="h-6 w-6" />
            Kembali ke Daftar Jadwal
        </a>
    </div>

    <div class="min-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <div class="flex items-center justify-between border-b border-zinc-800 p-6">
            <h1 class="text-xl font-bold text-white">Detail Jadwal Pelajaran</h1>
        </div>

        <div class="space-y-6 p-6">
            <div class="grid grid-cols-[180px_1fr] items-start gap-x-4 gap-y-6">  
                
                <span class="text-xs mt-2 font-semibold tracking-wider text-zinc-500 uppercase">Kelas</span>
                <div class="flex items-center gap-6 mt-2">
                    <p class="font-medium text-zinc-200">{jadwal.nama_kelas}</p>
                    <p class="text-xs text-zinc-300">Kode: {jadwal.kode_kelas}</p>
                </div>
                
                <span class="text-xs mt-2 font-semibold tracking-wider text-zinc-500 uppercase">Mata Pelajaran</span>
                <div class="flex items-center gap-6 mt-2">
                    <p class="font-medium text-zinc-200">{jadwal.nama_mapel}</p>
                    <p class="text-xs text-zinc-300">Kode: {jadwal.kode_mapel}</p>
                </div>

                <span class="text-xs mt-2 font-semibold tracking-wider text-zinc-500 uppercase">Guru Pengampu</span>
                <p class="text-zinc-200 mt-2">{jadwal.nama_guru}</p>

                <div class="col-span-2 border-t border-zinc-800 my-2"></div>

                <span class="text-xs mt-2 font-semibold tracking-wider text-zinc-500 uppercase">Hari</span>
                <p class="text-zinc-200 mt-2 capitalize font-medium">{jadwal.hari}</p>

                <span class="text-xs mt-2 font-semibold tracking-wider text-zinc-500 uppercase">Jam Pelajaran</span>
                <p class="text-zinc-200 mt-2 font-mono bg-zinc-950 w-fit px-2 py-1 rounded border border-zinc-800">
                    {jadwal.jam_pelajaran}
                </p>

            </div>
        </div>
    </div>

    <div class="flex justify-end gap-6 py-6">
        <a href="/admin/jadwal/{jadwalId}/edit"
            class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-gray-100 transition-colors hover:bg-blue-800"
        >
            <Icon icon="lucide:pencil" class="h-5 w-5" />
            Edit Jadwal
        </a>
        <button
            type="button"
            onclick={() => confirmDelete(jadwal.id, `${jadwal.nama_mapel} - ${jadwal.nama_kelas}`)}
            class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-gray-100 transition-colors hover:bg-rose-700"
        >
            <Icon icon="lucide:trash-2" class="h-5 w-5" />
            Hapus Jadwal
        </button>
    </div>
</div>
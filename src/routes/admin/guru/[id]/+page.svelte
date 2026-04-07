<script>
    import Icon from '@iconify/svelte';
    import { toast } from '$lib/state/toast.svelte.js';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import ModalConfirm from '$lib/components/admin/ModalConfirm.svelte';
    import { enhance } from '$app/forms';

    let { data } = $props();
    const guru = $derived(data.guru);
    const guruId = $page.params.id;

    let deleteForm;
    let showModal = $state(false);
    let selectedGuruId = $state(null);
    let selectedGuruName = $state('');

    function confirmDelete(id, name) {
        selectedGuruId = id;
        selectedGuruName = name;
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
        action="/admin/guru?/delete" 
        use:enhance={() => {
            return async ({ result }) => {
                if (result.type === 'success') {
                    toast.send(`Guru ${guru.nama} berhasil dihapus!`);
                    goto('/admin/guru', { invalidateAll: true });
                } 
            };
        }}
    >
        <input type="hidden" name="id" value={selectedGuruId}>  
    </form>

    <ModalConfirm
        open={showModal}
        title="Hapus Guru"
        message="Apakah kamu yakin menghapus {selectedGuruName}? Data akun user terkait juga akan terhapus."
        onConfirm={executeDelete}
        onCancel={() => (showModal = false)}
    />

    <div class="mb-6 flex items-start">
        <a
            href="/admin/guru"
            class="flex w-fit items-center px-2 text-sm text-zinc-400 transition-colors duration-100 hover:text-white"
        >
            <Icon icon="famicons:arrow-back" class="h-6 w-6" />
            Kembali ke Daftar Guru
        </a>
    </div>

    <div class="min-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <div class="flex items-center justify-between border-b border-zinc-800 p-6">
            <h1 class="text-xl font-bold text-white">Detail Guru</h1>
            </div>

        <div class="space-y-6 p-6">
            <div class="grid grid-cols-[150px_1fr] items-start gap-x-4 gap-y-4">
                <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Nama Lengkap</span>
                <p class="font-medium text-zinc-200">{guru.nama}</p>

                <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">NIP</span>
                <p class="text-zinc-200 font-mono">{guru.nip}</p>

                <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Email</span>
                <p class="text-zinc-200">{guru.email}</p>

                <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Jenis Kelamin</span>
                <p class="text-zinc-200 capitalize">{guru.gender}</p>

                <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Tempat, Tgl Lahir</span>
                <p class="text-zinc-200">{guru.tempat_lahir}, {guru.tgl_lahir}</p>

                <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">No. Telepon</span>
                <p class="text-zinc-200">{guru.phone_number}</p>

                <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Pendidikan</span>
                <p class="text-zinc-200">{guru.pendidikan}</p>

                <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Alamat</span>
                <p class="text-zinc-200 leading-relaxed">{guru.alamat}</p>
            </div>
        </div>
    </div>

    <div class="flex justify-end gap-6 py-6 ">
        <a href="/admin/guru/{guruId}/edit"
            class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-gray-100 transition-colors hover:bg-blue-800"
        >
            <Icon icon="lucide:pencil" class="h-5 w-5" />
            Edit Guru
        </a>
        <button
            type="button"
            onclick={() => confirmDelete(guru.id, guru.nama)}
            class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-gray-100 transition-colors hover:bg-rose-700"
        >
            <Icon icon="lucide:trash-2" class="h-5 w-5" />
            Hapus Guru
        </button>
    </div>
</div>
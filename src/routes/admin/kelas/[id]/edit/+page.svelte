<script>
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import { enhance, applyAction } from '$app/forms';
	import { toast } from '$lib/state/toast.svelte.js';

	const kelasId = $page.params.id;
	let { data } = $props();

	let kelas = $state({ ...data.kelas });
</script>

<div class="p-8">
	<div class="mb-6 flex items-start">
		<a
			href="/admin/kelas/{kelasId}"
			class="flex w-fit items-center px-2 text-sm text-zinc-400 transition-colors duration-100 hover:text-white"
		>
			<Icon icon="famicons:arrow-back" class="h-6 w-6" />
			Batal dan Kembali
		</a>
	</div>

	<div class="min-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
		<div class="flex items-center justify-between border-b border-zinc-800 p-6">
			<h1 class="text-xl font-bold text-gray-100">Edit Profil Kelas: {kelas.nama_kelas}</h1>
		</div>


        <div class="p-6">
            <form
                method="POST"
                use:enhance={() => {
                    return async ({ result }) => {
                        if (result.type === 'redirect') {
                            toast.send('Data kelas berhasil diperbarui!');
                        } else if (result.type === 'failure') {
                            toast.send(result.data?.message || 'Gagal memperbarui data', 'error');
                        }
    
                        await applyAction(result);
                    };
                }}
            >
                <div class="grid grid-cols-[150px_1fr] items-center gap-x-4 gap-y-4">
                     <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Kode Kelas</span>
                    <input 
                            name="kode_kelas" 
                            type="text" 
                            bind:value={kelas.kode_kelas} 
                            class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-emerald-700 outline-none"
                        />
    
                        <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Nama Kelas</span>
                        <input 
                            name="nama_kelas" 
                            type="text" 
                            bind:value={kelas.nama_kelas} 
                            class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-emerald-700 outline-none"
                        />
                </div>
                 <div class="flex justify-end gap-6 pt-8">
                        <button
                            type="submit"
                            class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-emerald-700 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
                        >
                            <Icon icon="lucide:save" class="h-5 w-5" />
                            Update Data Kelas
                        </button>
                    </div>
            </form>
        </div>
	</div>
</div>

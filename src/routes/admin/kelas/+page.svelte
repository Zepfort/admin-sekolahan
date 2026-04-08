<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
    import { toast } from '$lib/state/toast.svelte.js';
	import ModalConfirm from '$lib/components/admin/ModalConfirm.svelte';
	import Icon from '@iconify/svelte';

	let { data } = $props(); 
	const kelases = $derived(data.kelas); 

	// State kontrol modal
	let showModal = $state(false);
	let selectedKelasId = $state(null);
	let selectedKelasName = $state('');

	let deleteForm;

	function confrimDelete(id, nama) {
		selectedKelasId = id;
		selectedKelasName = nama;
		showModal = true;
	}

	function executeDelete() {
		showModal = false;
		deleteForm.requestSubmit();
	}
</script>

<div class="p-6">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold text-white">Daftar Kelas</h1>
		<a
			href="/admin/kelas/create"
			class="flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-gray-100 transition hover:bg-emerald-700"
		>
			<Icon icon="lucide:plus" class="h-6 w-6" />
			Tambah Kelas
		</a>
	</div>

	<div class="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900">		

        <form 
            method="POST" 
            action="?/delete" 
            bind:this={deleteForm} 
            use:enhance = {() => {
                return async ({ result }) => {
					if (result.type === 'success') {
					toast.send(`Kelas ${selectedKelasName} berhasil dihapus!`);
						
						goto('/admin/kelas', { invalidateAll: true });
                    } 
                };
            }}>
            <input type="hidden" name="id" value={selectedKelasId} />
        </form>

		<ModalConfirm
			open={showModal}
			title="Hapus Kelas"
			message="Apakah kamu yakin menghapus {selectedKelasName}? Jadwal yang berkatian dengan kelas akan kehilangan kelas."
			onConfirm={executeDelete}
			onCancel={() => (showModal = false)}
		/>
		<table class="w-full text-left text-zinc-300">
			<thead class="bg-emerald-900 text-xs text-zinc-100 uppercase">
				<tr>
					<th class="px-6 py-4">Kode Kelas</th>
					<th class="px-6 py-4">Nama Kelas</th>
					<th class="px-6 py-4">Detail</th>
					<th class="flex justify-center px-6 py-4">Aksi</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-zinc-800">
				{#each kelases as kelas, i (kelas.id)}
					<tr
						class="transition-colors hover:bg-zinc-600/60 {i % 2 === 0
							? 'bg-zinc-900'
							: 'bg-zinc-950'}"
					>
						<td class="px-6 py-4 font-medium text-white">{kelas.kode_kelas}</td>
						<td class="px-6 py-4">{kelas.nama_kelas}</td>
						<td class="px-6 py-4">
							<a
								href="/admin/kelas/{kelas.id}"
								class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-emerald-800 px-3 py-1.5 text-xs font-medium text-gray-100 transition hover:bg-green-900"
							>
								<Icon icon="bx:detail" class="h-5 w-5" />
								Detail
							</a>
						</td>
						<td class="flex justify-center gap-4 px-4 py-4">
							<a
								href="/admin/kelas/{kelas.id}/edit"
								class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-blue-700 px-3 py-1.5 text-xs font-medium text-gray-100 transition-colors hover:bg-blue-800"
							>
								<Icon icon="lucide:pencil" class="h-5 w-5" />
								Edit
							</a>
							<button
								type="button"
								onclick={() => confrimDelete(kelas.id, kelas.nama_kelas)}
								class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-gray-100 transition-colors hover:bg-rose-700"
							>
								<Icon icon="lucide:trash-2" class="h-5 w-5" />
								Hapus
							</button>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="5" class="px-6 py-10 text-center text-zinc-500 italic">
							Belum ada data kelas.
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
    import { toast } from '$lib/state/toast.svelte.js';
	import ModalConfirm from '$lib/components/admin/ModalConfirm.svelte';
	import Icon from '@iconify/svelte';

	let { data } = $props(); 
	const gurus = $derived(data.guru); 

	// State kontrol modal
	let showModal = $state(false);
	let selectedGuruId = $state(null);
	let selectedGuruName = $state('');

	let deleteForm;

	function confrimDelete(id, nama) {
		selectedGuruId = id;
		selectedGuruName = nama;
		showModal = true;
	}

	function executeDelete() {
		showModal = false;
		deleteForm.requestSubmit();
	}
</script>

<div class="p-6">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold text-white">Daftar Guru</h1>
		<a
			href="/admin/guru/create"
			class="flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-gray-100 transition hover:bg-emerald-700"
		>
			<Icon icon="lucide:plus" class="h-6 w-6" />
			Tambah Guru
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
					toast.send(`User ${selectedGuruName} berhasil dihapus!`);
						
						goto('/admin/guru', { invalidateAll: true });
                    } 
                };
            }}>
            <input type="hidden" name="id" value={selectedGuruId} />
        </form>

		<ModalConfirm
			open={showModal}
			title="Hapus Pengguna"
			message="Apakah kamu yakin menghapus {selectedGuruName}?"
			onConfirm={executeDelete}
			onCancel={() => (showModal = false)}
		/>
		<table class="w-full text-left text-zinc-300">
			<thead class="bg-emerald-900 text-xs text-zinc-100 uppercase">
				<tr>
					<th class="px-6 py-4">NIP</th>
					<th class="px-6 py-4">Nama</th>
					<th class="px-6 py-4">Gender</th>
					<th class="px-6 py-4">Email</th>
					<th class="px-6 py-4">Pendidikan</th>
					<th class="px-6 py-4">Detail</th>
					<th class="flex justify-center px-6 py-4">Aksi</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-zinc-800">
				{#each gurus as guru, i (guru.id)}
					<tr
						class="transition-colors hover:bg-zinc-600/60 {i % 2 === 0
							? 'bg-zinc-900'
							: 'bg-zinc-950'}"
					>
						<td class="px-6 py-4 font-medium text-white">{guru.nip}</td>
						<td class="px-6 py-4">{guru.nama}</td>
						<td class="px-6 py-4">{guru.gender}</td>
						<td class="px-6 py-4">{guru.email}</td>
						<td class="px-6 py-4">{guru.pendidikan}</td>
						<td class="px-6 py-4">
							<a
								href="/admin/guru/{guru.id}"
								class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-emerald-800 px-3 py-1.5 text-xs font-medium text-gray-100 transition hover:bg-green-900"
							>
								<Icon icon="bx:detail" class="h-5 w-5" />
								Detail
							</a>
						</td>
						<td class="flex justify-center gap-4 px-4 py-4">
							<a
								href="/admin/guru/{guru.id}/edit"
								class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-blue-700 px-3 py-1.5 text-xs font-medium text-gray-100 transition-colors hover:bg-blue-800"
							>
								<Icon icon="lucide:pencil" class="h-5 w-5" />
								Edit
							</a>
							<button
								type="button"
								onclick={() => confrimDelete(guru.id, guru.nama)}
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
							Belum ada data user.
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

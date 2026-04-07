<script>
	import Icon from '@iconify/svelte';;
	import { toast } from '$lib/state/toast.svelte.js';
    import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ModalConfirm from '$lib/components/admin/ModalConfirm.svelte';
	import { enhance } from '$app/forms';

	let { data } = $props();
	const user = $derived(data.user);

    const userId = $page.params.id;

	const roleStyles = {
		admin: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
		guru: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
		default: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
	};

	let deleteForm;

	let showModal = $state(false);
	let selectedUserId = $state(null);
	let selectedUserName = $state('');

	function confrimDelete(id, name) {
		selectedUserId = id;
		selectedUserName = name;
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
		action="/admin/users?/delete" 
		use:enhance = {() => {
                return async ({ result }) => {
					if (result.type === 'success') {
					toast.send(`User ${user.name} berhasil dihapus!`);
						
						goto('/admin/users', { invalidateAll: true });
                    } 
                };
            }}
	>
		<input type="hidden" name="id" value={selectedUserId}>	
	</form>

	<ModalConfirm
		open={showModal}
		title="Hapus Pengguna"
		message="Apakah kamu yakin menghapus {selectedUserName}?. Tindakan tidak dapat dibatalkan."
		onConfirm={executeDelete}
		onCancel={() => (showModal = false)}
	/>

	<div class="mb-6 flex items-start">
		<a
			href="/admin/users"
			class="flex w-fit items-center px-2 text-sm text-zinc-400 transition-colors duration-100 hover:text-white"
		>
			<Icon icon="famicons:arrow-back" class="h-6 w-6" />
			Kembali ke Daftar User
		</a>
	</div>

	<div class="min-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
		<div class="flex items-center justify-between border-b border-zinc-800 p-6">
			<h1 class="text-xl font-bold text-white">Detail Pengguna</h1>
			<span
				class="rounded-full px-3 py-1 text-lg font-semibold
                        {roleStyles[user.type] || roleStyles.default}"
			>
				{user.type}
			</span>
		</div>

		<div class="space-y-4 p-6">DD
			<div class="grid grid-cols-[120px_1fr] items-center gap-x-4 gap-y-3">
				<span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
					Nama Lengkap
				</span>
				<p class="font-medium text-zinc-200">
					{user.name}
				</p>

				<span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase"> Username </span>
				<p class="text-zinc-200">
					@{user.username}
				</p>

				<span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase"> Email </span>
				<p class="text-zinc-200">
					{user.email}
				</p>
			</div>
		</div>
	</div>
    <div class="flex justify-end gap-6 py-6 ">
        <a  href="./{userId}/edit"
            class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-blue-700 px-3 py-1.5 text-xs font-medium text-gray-100 transition-colors hover:bg-blue-800"
        >
            <Icon icon="lucide:pencil" class="h-5 w-5" />
            Edit
        </a>
		<button
			type="button"
			onclick={() => confrimDelete(user.id, user.name)}
			class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-gray-100 transition-colors hover:bg-rose-700"
		>
			<Icon icon="lucide:trash-2" class="h-5 w-5" />
			Hapus
		</button>
    </div>
</div>

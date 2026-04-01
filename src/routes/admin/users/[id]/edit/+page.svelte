<script>
	import Icon from "@iconify/svelte";
    import { page } from '$app/stores';

    const userId = $page.params.id;
	let { data } = $props()
	let user = $state({ ...data.user });
	
</script>

<div class="p-8">
	<div class="mb-6 flex items-start">
		<a
			href="/admin/users/{userId}"
			class="flex w-fit items-center px-2 text-sm text-zinc-400 transition-colors duration-100 hover:text-white"
		>
			<Icon icon="famicons:arrow-back" class="h-6 w-6" />
			Kembali ke Daftar User
		</a>
	</div>

	<div class="min-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
		<div class="flex items-center justify-between border-b border-zinc-800 p-6">
			<h1 class="text-xl font-bold text-white">Edit Profil: {user.name}</h1>
		</div>

		<div class="space-y-4 p-6">
        <form id="edit-form" method="POST">
            <input type="hidden" name="type" value={user.type} />
			<div class="grid grid-cols-[120px_1fr] items-center gap-x-4 gap-y-3">
				<span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
					Nama Lengkap
				</span>
				<input 
                    name="name" 
                    type="text" 
                    bind:value={user.name} 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none"
                />

				<span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase"> Username </span>
				<input 
                    name="username" 
                    type="text" 
                    bind:value={user.username} 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none"
                />

				<span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase"> Email </span>
				<input 
                    name="email" 
                    type="email" 
                    bind:value={user.email} 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none"
                />
			</div>
            <div class="flex justify-end gap-6 py-6 ">
                <button
                    type="submit"
                    form="edit-form"
                    class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-blue-700 px-3 py-1.5 text-xs font-medium text-gray-100 transition-colors hover:bg-blue-800"
                >
                    <Icon icon="lucide:save" class="h-5 w-5" />
                    Simpan
                </button>
            </div>
        </form>
		</div>
	</div>
    
</div>
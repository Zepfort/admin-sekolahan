<script>
    let { data } = $props();
    
    const users = $derived(data.users);

    const roleStyles = {
        admin: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
        guru: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        default: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
    };
</script>

<div class="p-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-white">Daftar Pengguna</h1>
        <button class="bg-emerald-600 hover:bg-emerald-700 text-gray-100 px-4 py-2 rounded-lg transition cursor-pointer">
            Tambah User
        </button>
    </div>

    <div class="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900">
        <table class="w-full text-left text-zinc-300">
            <thead class="bg-emerald-900 text-zinc-100 uppercase text-xs">
                <tr>
                    <th class="px-6 py-4">Nama</th>
                    <th class="px-6 py-4">Username</th>
                    <th class="px-6 py-4">Email</th>
                    <th class="px-6 py-4">Role</th>
                    <th class="px-6 py-4">Aksi</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-zinc-800">
                {#each users as user, i (user.id)}
                    <tr class="hover:bg-zinc-600/60 transition-colors {i % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-950'}">
                        <td class="px-6 py-4 font-medium text-white">{user.name}</td>
                        <td class="px-6 py-4">{user.username}</td>
                        <td class="px-6 py-4">{user.email}</td>
                        <td class="px-6 py-4">
                            <span class="px-2 py-1 rounded text-xs font-medium {roleStyles[user.type] || roleStyles.default}">
                                {user.type}
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <button class="text-blue-400 hover:underline mr-3">Edit</button>
                            <button class="text-red-400 hover:underline">Hapus</button>
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
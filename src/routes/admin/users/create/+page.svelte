<script>
import Icon from "@iconify/svelte";
    
    let user = $state({
        name: '',
        username: '',
        email: '',
        type: 'guru' // default
    });
</script>

<div class="p-8">
    <form method="POST" class="bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-400 dark:border-zinc-800 overflow-hidden">
        <div class="p-6 border-b border-zinc-400 dark:border-zinc-800">
            <h1 class="text-xl font-bold text-gray-800 dark:text-gray-100">Tambah User Baru</h1>
        </div>

        <div class="p-6 space-y-4">
            <div class="grid grid-cols-[120px_1fr] items-center gap-4">
                <span class="text-xs font-semibold text-zinc-500 uppercase">Nama</span>
                <input 
                    name="name" 
                    bind:value={user.name} 
                    type="text" 
                    required 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none" 
                />

                <span class="text-xs font-semibold text-zinc-500 uppercase">Username</span>
                <input 
                    name="username" 
                    bind:value={user.username} 
                    type="text" 
                    required 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none" 
                />

                <span class="text-xs font-semibold text-zinc-500 uppercase">Email</span>
                <input 
                    name="email" 
                    bind:value={user.email} 
                    type="email" 
                    required 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none" 
                />

                <span class="text-xs font-semibold text-zinc-500 uppercase">Password</span>
                <input 
                    name="password" 
                    bind:value={user.password} 
                    type="password" 
                    required 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none" 
                />



                <span class="text-xs font-semibold text-zinc-500 uppercase">Role</span>
                <select 
                    name="type" 
                    bind:value={user.type} 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none"
                >
                    <option value="admin">Admin</option>
                    <option value="guru">Guru</option>
                    <option value="siswa">Siswa</option>
                </select>
            </div>
        </div>

        <div class="p-6 bg-zinc-900/50 flex justify-end gap-3">
            <a href="/admin/users" class="px-4 py-2 text-sm rounded bg-gray-700 hover:bg-gray-600 text-zinc-200 hover:text-white transition">Batal</a>
            <button type="submit" class="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded text-sm font-medium text-gray-100 flex items-center gap-2 cursor-pointer">
                <Icon icon="lucide:user-plus" /> Simpan User
            </button>
        </div>
    </form>
</div>
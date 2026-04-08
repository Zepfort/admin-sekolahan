<script>
	import { enhance, applyAction } from "$app/forms";
    import { toast } from '$lib/state/toast.svelte.js';
    import Icon from "@iconify/svelte";
    
    let { data } = $props();
    const kelases = $derived(data.kelases);
    
    let siswa = $state({
        nis: '',
        nama: '',
        gender: 'laki-laki',
        email: '',
        kelas_id: '',
        tempatLahir: '',
        tglLahir: '',
        phoneNumber: '',
        nama_ortu: '',
        alamat: '',
    });
</script>

<div class="p-8">
    <form 
        method="POST" 
        class="bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-400 dark:border-zinc-800 overflow-hidden"
        use:enhance={() => {
        return async ({ result }) => {
            if (result.type === 'redirect') {
                toast.send("Siswa berhasil ditambahkan!");
            }
            await applyAction(result); 
        };
    }}
        >
        <div class="p-6 border-b border-zinc-400 dark:border-zinc-800">
            <h1 class="text-xl font-bold text-gray-800 dark:text-gray-100">Tambah Siswa Baru</h1>
        </div>

        <div class="p-6 space-y-4">
            <div class="grid grid-cols-[120px_1fr] items-center gap-4">
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">NIS</span>
                <input 
                    name="nis" 
                    bind:value={siswa.nis} 
                    type="text" 
                    required 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none" 
                />
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">Nama</span>
                <input 
                    name="nama" 
                    bind:value={siswa.nama} 
                    type="text" 
                    required 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none" 
                />
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">Email</span>
                <input 
                    name="email" 
                    bind:value={siswa.email} 
                    type="email" 
                    required 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none" 
                />
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">Gender</span>
                <select 
                    name="gender" 
                    bind:value={siswa.gender} 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none"
                >
                    <option value="laki-laki">Laki-laki</option>
                    <option value="perempuan">Perempuan</option>
                </select>
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">Kelas</span>
                <select 
                    name="kelas_id" 
                    bind:value={siswa.kelas_id} 
                    required
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 outline-none"
                >
                    <option value="" disabled selected>Pilih Kelas</option>
                    {#each kelases as k (k.id)}
                        <option value={k.id}>{k.nama_kelas}</option>
                    {/each}
                </select>
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">Tempat Lahir</span>
                <input 
                name="tempat_lahir" 
                bind:value={siswa.tempatLahir} 
                type="text" 
                required 
                class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none" 
                />
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">Tanggal Lahir</span>
                <input 
                    name="tgl_lahir" 
                    bind:value={siswa.tglLahir} 
                    type="date" 
                    required 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none" 
                />
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">Nomor Telepon</span>
                <input 
                    name="phone_number" 
                    bind:value={siswa.phoneNumber} 
                    type="text" 
                    required 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none" 
                />
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">Nama Orangtua</span>
                <input 
                    name="nama_ortu" 
                    bind:value={siswa.nama_ortu} 
                    type="text" 
                    required 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none" 
                />
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">Alamat</span>
                <textarea 
                    name="alamat" 
                    bind:value={siswa.alamat} 
                    type="text" 
                    required 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none" 
                ></textarea>
            
            </div>
        </div>

        <div class="p-6 bg-zinc-900/50 flex justify-end gap-3">
            <a href="/admin/guru" class="px-4 py-2 text-sm rounded bg-gray-700 hover:bg-gray-600 text-zinc-200 hover:text-white transition">Batal</a>
            <button type="submit" class="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded text-sm font-medium text-gray-100 flex items-center gap-2 cursor-pointer">
                <Icon icon="lucide:user-plus" /> Simpan User
            </button>
        </div>
    </form>
</div>
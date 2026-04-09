<script>
	import { enhance, applyAction } from "$app/forms";
    import { toast } from '$lib/state/toast.svelte.js';
    import Icon from "@iconify/svelte";
    
    let { data } = $props();
    const kelases = $derived(data.kelases);
    const mapels = $derived(data.mapels);
    const gurus = $derived(data.gurus);

    const daftarWaktu = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:20", "10:50", "11:20", "11:50", "12:20", "12:50"];

    let jamMulai = $state("");
    let jamSelesai = $state("");
    const opsiJamSelesai = $derived(
        daftarWaktu.filter(waktu => waktu > jamMulai)
    );
    
    let jadwal = $state({
        kelas_id: '',
        mapel_id: '',
        guru_id: '',
        jam_pelajaran: '',
        hari: '',
    });
</script>

<div class="p-8">
    <form 
        method="POST" 
        class="bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-400 dark:border-zinc-800 overflow-hidden"
        use:enhance={() => {
        return async ({ result }) => {
            if (result.type === 'redirect') {
                toast.send("Jadwal berhasil ditambahkan!");
            }
            await applyAction(result); 
        };
    }}
        >
        <div class="p-6 border-b border-zinc-400 dark:border-zinc-800">
            <h1 class="text-xl font-bold text-gray-800 dark:text-gray-100">Tambah Jadwal Baru</h1>
        </div>

        <div class="p-6 space-y-4">
            <div class="grid grid-cols-[120px_1fr] items-center gap-4">
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">Kelas</span>
                <select 
                    name="kelas_id" 
                    bind:value={jadwal.kelas_id} 
                    required
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 outline-none"
                >
                    <option value="" disabled selected>Pilih Kelas</option>
                    {#each kelases as k (k.id)}
                        <option value={k.id}>{k.nama_kelas}</option>
                    {/each}
                </select>
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">Mapel</span>
                <select 
                    name="mapel_id" 
                    bind:value={jadwal.mapel_id} 
                    required
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 outline-none"
                >
                    <option value="" disabled selected>Pilih Mapel</option>
                    {#each mapels as m (m.id)}
                        <option value={m.id}>{m.nama_mapel}</option>
                    {/each}
                </select>
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">Guru</span>
                <select 
                    name="guru_id" 
                    bind:value={jadwal.guru_id} 
                    required
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 outline-none"
                >
                    <option value="" disabled selected>Pilih Guru</option>
                    {#each gurus as g (g.id)}
                        <option value={g.id}>{g.nama}</option>
                    {/each}
                </select>
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">Hari</span>
                <select 
                    name="hari" 
                    bind:value={jadwal.hari} 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none"
                >
                    <option value="" disabled selected>Pilih Hari</option>
                    <option value="senin">Senin</option>
                    <option value="selasa">Selasa</option>
                    <option value="rabu">Rabu</option>
                    <option value="kamis">Kamis</option>
                    <option value="jumat">Jumat</option>
                    <option value="sabut">Sabtu</option>
                </select>
                
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">Jam Pelajaran</span>
                <div class="flex gap-6">
                    <select 
                        name="jam_mulai"
                        bind:value={jamMulai} 
                        class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none"
                    >
                        <option value="" disabled selected>Pilih Waktu Mulai</option>
                        {#each daftarWaktu as waktu (waktu)}
                                <option value={waktu}>{waktu}</option>
                        {/each}
                    </select>
    
                    <select 
                        name="jam_selesai"
                        bind:value={jamSelesai} 
                        disabled={!jamMulai} 
                        class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none"
                    >
                        <option value="" disabled selected>Pilih Waktu Selesai</option>
                        {#each opsiJamSelesai as waktu (waktu)}
                            <option value={waktu}>{waktu}</option>
                        {/each}
                    </select>
                </div>
                
                
            
            </div>
        </div>

        <div class="p-6 bg-zinc-900/50 flex justify-end gap-3">
            <a href="/admin/jadwal" class="px-4 py-2 text-sm rounded bg-gray-700 hover:bg-gray-600 text-zinc-200 hover:text-white transition">Batal</a>
            <button type="submit" class="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded text-sm font-medium text-gray-100 flex items-center gap-2 cursor-pointer">
                <Icon icon="lucide:user-plus" /> Simpan Jadwal
            </button>
        </div>
    </form>
</div>
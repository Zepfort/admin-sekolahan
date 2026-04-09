<script>
    import Icon from "@iconify/svelte";
    import { page } from '$app/stores';
    import { enhance, applyAction } from "$app/forms";
    import { toast } from "$lib/state/toast.svelte.js";

    const jadwalId = $page.params.id;
    let { data } = $props();

    // Data Master 
    let jadwal = $state({ 
        kelas_id: data.jadwal?.kelas_id || '',
        mapel_id: data.jadwal?.mapel_id || '',
        guru_id: data.jadwal?.guru_id || '',
        hari: data.jadwal?.hari || '',
        jam_pelajaran: data.jadwal?.jam_pelajaran || ''
     }); // dari layout

    const kelases = $derived(data.kelases || []);
    const mapels = $derived(data.mapels || []);
    const gurus = $derived(data.gurus || []);

    const daftarWaktu = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:20", "10:50", "11:20", "11:50", "12:20", "12:50"];
    
    // pemisahan jam_pelajaran binding select
    let jamMulai = $state(jadwal.jam_pelajaran?.split(' - ')[0] || "");
    let jamSelesai = $state(jadwal.jam_pelajaran?.split(' - ')[1] || "");

    const opsiJamSelesai = $derived(
        daftarWaktu.filter(waktu => waktu > jamMulai)
    );
</script>

<div class="p-8">
    <div class="mb-6 flex items-start">
        <a
            href="/admin/jadwal/{jadwalId}"
            class="flex w-fit items-center px-2 text-sm text-zinc-400 transition-colors duration-100 hover:text-white"
        >
            <Icon icon="famicons:arrow-back" class="h-6 w-6" />
            Batal dan Kembali
        </a>
    </div>

    <div class="min-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <div class="flex items-center justify-between border-b border-zinc-800 p-6">
            <h1 class="text-xl font-bold text-gray-100">Edit Jadwal Pelajaran</h1>
        </div>

        <div class="p-6">
            <form 
                method="POST"
                use:enhance={() => {
                    return async ({ result }) => {
                        if (result.type === 'redirect') {
                            toast.send("Jadwal berhasil diperbarui!");
                        } else if (result.type === 'failure') {
                            toast.send(result.data?.message || "Gagal memperbarui data", "error");
                        }
                        await applyAction(result);
                    };
                }}
            >
                <div class="grid grid-cols-[150px_1fr] items-center gap-x-4 gap-y-4">
                    <h2 class="col-span-2 text-sm font-bold text-blue-500 border-b border-zinc-800 pb-2 mb-2">Relasi Entitas</h2>
                    
                    <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Kelas</span>
                    <select 
                        name="kelas_id" 
                        bind:value={jadwal.kelas_id} 
                        required
                        class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-700 outline-none"
                    >
                        {#each kelases as k (k.id)}
                            <option value={k.id}>{k.nama_kelas} ({k.kode_kelas})</option>
                        {/each}
                    </select>

                    <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Mata Pelajaran</span>
                    <select 
                        name="mapel_id" 
                        bind:value={jadwal.mapel_id} 
                        required
                        class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-700 outline-none"
                    >
                        {#each mapels as m (m.id)}
                            <option value={m.id}>{m.nama_mapel}</option>
                        {/each}
                    </select>

                    <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Guru</span>
                    <select 
                        name="guru_id" 
                        bind:value={jadwal.guru_id} 
                        required
                        class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-700 outline-none"
                    >
                        {#each gurus as g (g.id)}
                            <option value={g.id}>{g.nama}</option>
                        {/each}
                    </select>

                    <h2 class="col-span-2 text-sm font-bold text-blue-500 border-b border-zinc-800 pb-2 mt-4 mb-2">Waktu Pelajaran</h2>

                    <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Hari</span>
                    <select 
                        name="hari" 
                        bind:value={jadwal.hari}
                        class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-700 outline-none"
                    >
                        <option value="senin">Senin</option>
                        <option value="selasa">Selasa</option>
                        <option value="rabu">Rabu</option>
                        <option value="kamis">Kamis</option>
                        <option value="jumat">Jumat</option>
                        <option value="sabtu">Sabtu</option>
                    </select>

                    <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Jam Pelajaran</span>
                    <div class="flex gap-4">
                        <select 
                            name="jam_mulai" 
                            bind:value={jamMulai}
                            class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-700 outline-none"
                        >
                            {#each daftarWaktu as waktu (waktu)}
                                <option value={waktu}>{waktu}</option>
                            {/each}
                        </select>
                        
                        <div class="flex items-center text-zinc-500 px-1">s/d</div>

                        <select 
                            name="jam_selesai" 
                            bind:value={jamSelesai}
                            class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-700 outline-none"
                        >
                            {#each opsiJamSelesai as waktu (waktu)}
                                <option value={waktu}>{waktu}</option>
                            {/each}
                        </select>
                    </div>
                </div>

                <div class="flex justify-end gap-6 pt-8">
                    <button
                        type="submit"
                        class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-blue-700 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800"
                    >
                        <Icon icon="lucide:save" class="h-5 w-5" />
                        Update Jadwal Pelajaran
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
    import { enhance, applyAction } from "$app/forms";
    import { toast } from "$lib/state/toast.svelte";
    import Icon from "@iconify/svelte";;

    let mapel = $state({
        kodeMapel: '',
        namaMapel: '',
    });
</script>

<div class="p-8">
    <form 
        method="POST"
        class="bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-400 dark:border-zinc-800 overflow-hidden"
        use:enhance={() => {
            return async ({ result }) => {
                if (result.type === 'redirect') {
                    toast.send("Mapel berhasil ditambahkan!");
                }
                await applyAction(result);
            }
        }}
        >
        <div class="p-6 border-b border-zinc-400 dark:border-zinc-800">
            <h1 class="text-xl font-bold text-gray-800 dark:text-gray-100">Tambah Mapel Baru</h1>
        </div>

        <div class="p-6 space-y-4">
            <div class="grid grid-cols-[120px_1fr] items-center gap-4">
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">Kode Mapel</span>
                <input 
                    name="kode_mapel" 
                    bind:value={mapel.kodeMapel} 
                    type="text" 
                    required 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none" 
                />
                <span class="text-xs font-semibold dark:text-gray-300 uppercase">Nama Mapel</span>
                <input 
                    name="nama_mapel" 
                    bind:value={mapel.namaMapel} 
                    type="text" 
                    required 
                    class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none" 
                />
            </div>
        </div>

        <div class="p-6 bg-zinc-900/50 flex justify-end gap-3">
             <a href="/admin/mapel" class="px-4 py-2 text-sm rounded bg-gray-700 hover:bg-gray-600 text-zinc-200 hover:text-white transition">Batal</a>
            <button type="submit" class="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded text-sm font-medium text-gray-100 flex items-center gap-2 cursor-pointer">
                <Icon icon="mdi:google-classroom" /> Simpan Mapel
            </button>
        </div>
    </form>
</div>
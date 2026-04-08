<script>
    import Icon from "@iconify/svelte";
    import { page } from '$app/stores';
    import { enhance, applyAction } from "$app/forms";
    import { toast } from "$lib/state/toast.svelte.js";

    const siswaId = $page.params.id;
    let { data } = $props();
    
    let siswa = $state({ ...data.siswa });
    const kelases = $derived(data.kelases);
</script>

<div class="p-8">
    <div class="mb-6 flex items-start">
        <a
            href="/admin/siswa/{siswaId}"
            class="flex w-fit items-center px-2 text-sm text-zinc-400 transition-colors duration-100 hover:text-white"
        >
            <Icon icon="famicons:arrow-back" class="h-6 w-6" />
            Batal dan Kembali
        </a>
    </div>

    <div class="min-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <div class="flex items-center justify-between border-b border-zinc-800 p-6">
            <h1 class="text-xl font-bold text-gray-100">Edit Profil Siswa: {siswa.nama}</h1>
        </div>

        <div class="p-6">
            <form 
                method="POST"
                use:enhance={() => {
                    return async ({ result }) => {
                        if (result.type === 'redirect') {
                            toast.send("Data siswa berhasil diperbarui!");
                        } else if (result.type === 'failure') {
                            toast.send(result.data?.message || "Gagal memperbarui data", "error");
                        }
                        await applyAction(result);
                    };
                }}>
                
                <div class="grid grid-cols-[150px_1fr] items-center gap-x-4 gap-y-4">
                    <h2 class="col-span-2 text-sm font-bold text-emerald-500 border-b border-zinc-800 pb-2 mt-4 mb-2">Data Pribadi Siswa</h2>

                    <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">NIS</span>
                    <input name="nis" type="text" bind:value={siswa.nis} class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-emerald-700 outline-none" />

                                        <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Nama Lengkap</span>
                    <input name="nama" type="text" bind:value={siswa.nama} class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-emerald-700 outline-none" />

                    <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Email</span>
                    <input name="email" type="email" bind:value={siswa.email} class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-emerald-700 outline-none" />

                    <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Kelas</span>
                    <select name="kelas_id" bind:value={siswa.kelas_id} class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-emerald-700 outline-none">
                        <option value="" disabled>Pilih Kelas</option>
                        {#each kelases as k (k.id)}
                            <option value={k.id}>{k.nama_kelas}</option>
                        {/each}
                    </select>

                    <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Gender</span>
                    <select name="gender" bind:value={siswa.gender} class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-emerald-700 outline-none">
                        <option value="laki-laki">Laki-laki</option>
                        <option value="perempuan">Perempuan</option>
                    </select>

                    <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Tempat Lahir</span>
                    <input name="tempat_lahir" type="text" bind:value={siswa.tempat_lahir} class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-emerald-700 outline-none" />

                    <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Tanggal Lahir</span>
                    <input name="tgl_lahir" type="date" bind:value={siswa.tgl_lahir} class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-emerald-700 outline-none" />

                    <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Nama Orang Tua</span>
                    <input name="nama_ortu" type="text" bind:value={siswa.nama_ortu} class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-emerald-700 outline-none" />

                    <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">No. Telepon</span>
                    <input name="phone_number" type="text" bind:value={siswa.phone_number} class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-emerald-700 outline-none" />

                    <span class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Alamat</span>
                    <textarea name="alamat" bind:value={siswa.alamat} rows="3" class="w-full text-gray-100 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-emerald-700 outline-none"></textarea>
                </div>

                <div class="flex justify-end gap-6 pt-8">
                    <button
                        type="submit"
                        class="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-emerald-700 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
                    >
                        <Icon icon="lucide:save" class="h-5 w-5" />
                        Update Data Siswa
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
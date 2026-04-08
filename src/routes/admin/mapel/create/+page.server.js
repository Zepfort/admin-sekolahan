import { apiRequest } from "$lib/server/api";
import { redirect, fail } from "@sveltejs/kit";

/**@type {import('./$types').Actions} */
export const actions = {
    default: async ({request, locals, fetch}) => {
        const formData = await request.formData();
        const token = locals.user?.token;

        const data = Object.fromEntries(formData);

        const payload = {
            ...data
        }

        if (!data.nama_mapel || data.nama_mapel.trim() === '') {
            return fail(400, { message: "Nama mapel wajib diisi!" });
        }

        try {
            await apiRequest(fetch, {
                method: "POST",
                resource: "mapel",
                payload,
                token
            });

            throw redirect(303, '/admin/mapel')
        } catch (error) {
            if (error.status === 303) throw error;

            console.error("Gagal simpan mapel:", error);
            return fail(error.status || 500, {
                message: error.body?.message || "Gagal menyimpan data mapel. Periksa kembali inputan Anda!"
            })
        }   
    }
}
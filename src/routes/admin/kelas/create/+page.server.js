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

        if (!data.nama_kelas || data.nama_kelas.trim() === '') {
            return fail(400, { message: "Nama kelas wajib diisi!" });
        }

        try {
            await apiRequest(fetch, {
                method: "POST",
                resource: "kelas",
                payload,
                token
            });

            throw redirect(303, '/admin/kelas')
        } catch (error) {
            if (error.status === 303) throw error;

            console.error("Gagal simpan kelas:", error);
            return fail(error.status || 500, {
                message: error.body?.message || "Gagal menyimpan data kelas. Periksa kembali inputan Anda!"
            })
        }   
    }
}
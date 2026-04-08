import { apiRequest } from "$lib/server/api";
import { redirect, fail } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, locals }) {
    const token = locals.user?.token;

    const resKelas = await apiRequest(fetch, { resource: "kelas", token });

    return {
        kelases: Array.isArray(resKelas) ? resKelas : []
    };
}

/**@type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals, fetch}) => {
        const formData = await request.formData();
        const token = locals.user?.token;

        const data = Object.fromEntries(formData);

        const payload = {
            ...data,
            kelas_id: data.kelas_id,
        };

        try {
            await apiRequest(fetch, {
                method: 'POST',
                resource: 'siswa',
                payload,
                token
            });
            
            throw redirect(303, '/admin/siswa')
        } catch (error) {
            if (error.status === 303) throw error; 

            console.error("Gagal simpan siswa:", error);
            return fail(error.status || 500, { 
                message: error.body?.message || 'Gagal menyimpan data siswa. Periksa kembali inputan Anda!' 
            });
        }


    }
}
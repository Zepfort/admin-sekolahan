import { apiRequest } from "$lib/server/api";
import { redirect, fail } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, locals }) {
    const token = locals.user?.token;

    const resKelas = await apiRequest(fetch, { resource: "kelas", token });
    const resMapels = await apiRequest(fetch, { resource: "mapel", token });
    const resGurus = await apiRequest(fetch, { resource: "guru", token });

    return {
        kelases: Array.isArray(resKelas) ? resKelas : [],
        mapels: Array.isArray(resMapels) ? resMapels : [],
        gurus: Array.isArray(resGurus) ? resGurus : [],
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
            mapel_id: data.mapel_id,
            guru_id: data.guru_id,
            jam_pelajaran: `${data.jam_mulai} - ${data.jam_selesai}`
        };

        try {
            await apiRequest(fetch, {
                method: 'POST',
                resource: 'jadwal',
                payload,
                token
            });
            
            throw redirect(303, '/admin/jadwal')
        } catch (error) {
            if (error.status === 303) throw error; 

            console.error("Gagal simpan jadwal:", error);
            return fail(error.status || 500, { 
                message: error.body?.message || 'Gagal menyimpan data jadwal. Periksa kembali inputan Anda!' 
            });
        }


    }
}
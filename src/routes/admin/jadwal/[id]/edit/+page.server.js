import { apiRequest } from "$lib/server/api";
import { redirect, fail } from "@sveltejs/kit";

/**@type {import(./$types).Actions} */
export const actions = {
    default: async ({ request, params, fetch, locals}) => {
        const formData = await request.formData()   ;
        const {id} = params;
        const token = locals.user?.token;

        const data = Object.fromEntries(formData);

        if (!data.jam_mulai || !data.jam_selesai) {
            return fail(400, {message: "Jam mulai dan jam selesai harus diisi!"});
        }

        try {
            await apiRequest(fetch, {
                method: 'PUT',
                resource: 'jadwal',
                id: id,
                payload: {
                    kelas_id: data.kelas_id,
                    mapel_id: data.mapel_id,
                    guru_id: data.guru_id,
                    hari: data.hari,
                    jam_pelajaran: `${data.jam_mulai} - ${data.jam_selesai}`
                },
                token
            })
        } catch (error) {
            if (error.status === 303) throw error;
            return fail(error.status || 500, {
                message: error.body?.message || "Gagal memperbarui data jadwal"
            })
        }

        throw redirect(303, `/admin/jadwal/${id}`);
    }
};
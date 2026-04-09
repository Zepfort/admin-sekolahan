import { apiRequest } from '$lib/server/api';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, locals }) {
    const token = locals.user?.token;

    const [resJadwal, resKelas, resMapel, resGuru] = await Promise.all([
        apiRequest(fetch, {resource: "jadwal", token}),
        apiRequest(fetch, {resource: "kelas", token}),
        apiRequest(fetch, {resource: "mapel", token}),
        apiRequest(fetch, {resource: "guru", token})
    ]);

    const jadwals = Array.isArray(resJadwal) ? resJadwal : [];
    const kelases = Array.isArray(resKelas) ? resKelas : [];
    const mapels = Array.isArray(resMapel) ? resMapel : [];
    const gurus = Array.isArray(resGuru) ? resGuru : [];

    const normalizedJadwal = jadwals.map(jadwal => {
        const mapelTerkait = mapels.find(m => m.id == jadwal.mapel_id);
        const kelasTerkait = kelases.find(k => k.id == jadwal.kelas_id);
        const guruTerkait = gurus.find(g => g.id == jadwal.guru_id);
        return {
            ...jadwal,
            nama_mapel: mapelTerkait ? mapelTerkait.nama_mapel : "Tanpa Mapel!",
            nama_kelas: kelasTerkait ? kelasTerkait.nama_kelas : "Tanpa Kelas!",
            nama_guru: guruTerkait ? guruTerkait.nama : "Tanpa Guru!",

        };
    });

    return {
        jadwal: normalizedJadwal
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    delete: async ({ request, fetch, locals }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const token = locals.user?.token;

        if (!id) return fail(400, { message: 'ID tidak ditemukan' });

        try {
            await apiRequest(fetch, {
                method: 'DELETE',
                resource: 'jadwal',
                id,
                token
            });

            return { success: true };
        } catch (err) {
            console.error(err);
            return fail(err.status || 500, { 
                message: err.body?.message || 'Gagal menghapus data jadwal!' 
            });
        }
    }
};
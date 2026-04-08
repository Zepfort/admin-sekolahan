import { apiRequest } from '$lib/server/api';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, locals }) {
    const token = locals.user?.token;

    const [siswas, kelases] = await Promise.all([
        apiRequest(fetch, {resource: "siswa", token}),
        apiRequest(fetch, {resource: "kelas", token})
    ]);

    const normalizedSiswas = siswas.map(siswa => {
        const kelasTerkait = kelases.find(k => k.id === siswa.kelas_id);
        return {
            ...siswa,
            nama_kelas: kelasTerkait ? kelasTerkait.nama_kelas : "Tanpa Kelas"
        };
    });

    return {
        siswa: normalizedSiswas
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
                resource: 'siswa',
                id,
                token
            });

            return { success: true };
        } catch (err) {
            console.error(err);
            return fail(err.status || 500, { 
                message: err.body?.message || 'Gagal menghapus data siswa' 
            });
        }
    }
};
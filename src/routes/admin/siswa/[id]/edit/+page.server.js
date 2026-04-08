import { apiRequest } from '$lib/server/api';
import { redirect, fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, locals }) {
    const token = locals.user?.token;

    const resKelas = await apiRequest(fetch, { resource: "kelas", token });

    return {
        kelases: Array.isArray(resKelas) ? resKelas : []
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, params, fetch, locals }) => {
        const formData = await request.formData();
        const { id } = params;
        const token = locals.user?.token;
        const data = Object.fromEntries(formData);
        
        try {
            await apiRequest(fetch, {
                method: 'PUT',
                resource: 'siswa',
                id: id,
                payload: {
                    ...data,
                },
                token
            });
        } catch (error) {
            if (error.status === 303) throw error;
            return fail(error.status || 500, { 
                message: error.body?.message || 'Gagal memperbarui data siswa' 
            });
        }

        throw redirect(303, `/admin/siswa/${id}`);
    }
};
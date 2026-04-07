// src/routes/admin/guru/+page.server.js
import { apiRequest } from '$lib/server/api';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, locals }) {
    const token = locals.user?.token;

    // Cukup panggil helper apiRequest dengan resource 'guru'
    const gurus = await apiRequest(fetch, {
        resource: 'guru',
        token
    });

    return {
        guru: gurus
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
                resource: 'guru',
                id,
                token
            });

            return { success: true };
        } catch (err) {
            console.error(err);
            return fail(err.status || 500, { 
                message: err.body?.message || 'Gagal menghapus data guru' 
            });
        }
    }
};
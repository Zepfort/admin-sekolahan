import { apiRequest } from "$lib/server/api";
import { redirect, fail } from "@sveltejs/kit";

/**@type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, params, fetch, locals }) => {
        const formData = await request.formData();
        const { id } = params;
        const token = locals.user?.token;

        const data = Object.fromEntries(formData);

        const payload = {
            ...data
        }
        try {
            await apiRequest(fetch, {
                method: 'PUT',
                resource: 'mapel',
                id,
                payload,
                token
            });


        } catch (error) {
            if (error.status === 303) throw error;
            return fail(error.status || 500, { message: 'Gagal memperbarui data' });
        }

        throw redirect(303, `/admin/mapel/${id}`);
    }
}
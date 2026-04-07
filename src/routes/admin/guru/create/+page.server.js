import { apiRequest } from "$lib/server/api";
import { redirect, fail } from "@sveltejs/kit";

/**@type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals, fetch}) => {
        const formData = await request.formData();
        const token = locals.user?.token;

        const data = Object.fromEntries(formData);

        const payload = {
            ...data,
            name: data.nama,
            type: 'guru'
        };

        try {
            await apiRequest(fetch, {
                method: 'POST',
                resource: 'guru',
                payload,
                token
            });
            
            throw redirect(303, '/admin/guru')
        } catch (error) {
            if (error.status === 303) throw error; 

            console.error("Gagal simpan guru:", error);
            return fail(error.status || 500, { 
                message: error.body?.message || 'Gagal menyimpan data guru. Periksa kembali inputan Anda.' 
            });
        }


    }
}
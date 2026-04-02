import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const actions = {
	default: async ({ request, params, locals, fetch }) => {
        const formData = await request.formData();
		const token = locals.user?.token;
		const { id } = params;

        const updateData = {
                name: formData.get('name'),
                username: formData.get('username'),
                email: formData.get('email'),
                type: formData.get('type')
            };

        try {
            const response = await fetch(`http://sekolahan.test/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            const resultApi = await response.json();

            if (response.ok) {
                redirect(303, `/admin/users/${params.id}`);
            } else {
                return { success: false, message: resultApi.message };
            }


        } catch (err) {
            if (err.status === 303 || err.status === 302) throw err;
            
            console.error("Catch Error:", err);
            throw error(500, 'Gagal mengedit data user!');
        }
	}
};

import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params, locals }) {
    const token = locals.user?.token;
    const { id } = params; // Mengambil 'id' dari folder [id]

    try {
        const response = await fetch(`http://sekolahan.test/api/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw error(response.status, 'User tidak ditemukan');
        }

        const result = await response.json();

        const item = result.collection?.items?.[0];
        console.log(item.data)

        if (!item) {
            throw error(404, 'User tidak ditemukan atau strukturnya data salah');
        }

        const userData = item.data.reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
        }, {});
        return {
           user: {
                ...userData,
                links: item._links || []
            }
        };
    } catch (err) {
        console.error(err);
        throw error(500, 'Gagal mengambil detail user');
    }
}

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
            console.log("Respons dari API Pusat:", resultApi);

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

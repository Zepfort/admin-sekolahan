import { error } from '@sveltejs/kit';

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
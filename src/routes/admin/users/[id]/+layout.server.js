import { error } from '@sveltejs/kit';

export async function load({ fetch, params, locals }) {
    const token = locals.user?.token;
    const { id } = params;

    try {
        const response = await fetch(`http://sekolahan.test/api/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw error(response.status, 'User tidak ditemukan');

        const result = await response.json();
        const item = result.collection?.items?.[0];

        const userData = item.data.reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
        }, {});

        return {
            user: { ...userData, links: item._links || [] }
        };
    } catch (error) {
        console.error(error);
        throw error(500, 'Gagal mengambil data');
    }
}
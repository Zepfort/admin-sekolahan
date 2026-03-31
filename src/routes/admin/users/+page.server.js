/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, locals }) {
    const token = locals.user?.token;

    try {
        const response = await fetch('http://sekolahan.test/api/users', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            return { users: [], error: 'Gagal mengambil data user' };
        }

        const result = await response.json();
        const collection = result.collection;

        if (!collection || !collection.items) {
            console.error('Format Collection+JSON tidak ditemukan:', result);
            return { users: [] };
        }

        const users = collection.items.map(item => {
            const dataArray = item.data || [];
            const mappedData = dataArray.reduce((acc, field) => {
                acc[field.name] = field.value;
                return acc;
            }, {});

            return {
                ...mappedData,
                links: item._links,
                self_href: item.href
            };
        });
        return { users };
    } catch (error) {
        console.error(error);
        return { users: [], error: 'Server error' };
    }
}
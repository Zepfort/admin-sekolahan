import { error } from '@sveltejs/kit';

/**
 * @param {typeof fetch} fetch - Fungsi fetch
 * @param {Object} options - Opsi untuk request
 */

export const apiRequest = async (fetch, {
    method = 'GET',
    resource = '',
    id = '',
    payload = '',
    token = ''
}) => {
    const baseUrl = 'http://sekolahan.test/api';
    const url = `${baseUrl}/${resource}${id ? `/${id}` : ''}`;

    const headers = {
        'Authorization' : `Bearer ${token}`,
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    };

    try {
        const response = await fetch(url, {
            method,
            headers,
            body: payload ? JSON.stringify(payload) : null
        });

        if (!response.ok) {
            const result = await response.json();
            throw error(response.status, result.message || 'Gagal melakukan operasi API');
        }

        const result = await response.json();
        const collection = result.collection;

        //  NORMALISASI DATA (Collection+JSON)
        if (collection && collection.items) {

            const items = Array.isArray(collection.items) ? collection.items : [collection.items];
            const normalizedItems = items.map(item => {
                const mappedData = item.data.reduce((acc, field) => {
                    acc[field.name] = field.value;
                    return acc;
                }, {});

                return {
                    ...mappedData,
                    _links: item._links, 
                    _href: item.href
                };
            });

            return (method !== 'GET' || id) ? normalizedItems[0] : normalizedItems;
        }

        return result;
    } catch (err) {
        if (err.status) throw err;

        console.error(`API Error (${url}):`, err);
        throw error(500, 'Terjadi kesalahan koneksi ke server API');
    }
}
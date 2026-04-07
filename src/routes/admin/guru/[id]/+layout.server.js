import { apiRequest } from '$lib/server/api';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, params, locals }) {
    const { id } = params;
    const token = locals.user?.token;

    const guruData = await apiRequest(fetch, {
        resource: 'guru',
        id: id,
        token: token
    });

    return {
        guru: guruData
    };
}
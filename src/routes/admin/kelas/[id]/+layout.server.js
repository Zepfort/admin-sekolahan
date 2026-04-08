import { apiRequest } from "$lib/server/api";

/**@type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, params, locals}) {
    const { id } = params;
    const token = locals.user?.token;

    const kelasData = await apiRequest(fetch, {
        resource: 'kelas',
        id: id,
        token: token
    });

    console.log(kelasData)
    return {
        kelas: kelasData
    }
}
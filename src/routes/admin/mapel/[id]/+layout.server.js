import { apiRequest } from "$lib/server/api";

/**@type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, params, locals}) {
    const { id } = params;
    const token = locals.user?.token;

    const mapelData = await apiRequest(fetch, {
        resource: 'mapel',
        id: id,
        token: token
    });

    console.log(mapelData)
    return {
        mapel: mapelData
    }
}
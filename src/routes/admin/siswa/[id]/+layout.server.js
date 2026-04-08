import { apiRequest } from '$lib/server/api';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, params, locals }) {
    const { id } = params;
    const token = locals.user?.token;

    const [siswaData, kelases] = await Promise.all([
        apiRequest(fetch, { resource: 'siswa', id, token }),
        apiRequest(fetch, { resource: 'kelas', token })
    ]);

    const kelasTerkait = Array.isArray(kelases) 
        ? kelases.find(k => k.id === siswaData.kelas_id) 
        : null;

    return {
        siswa: {
            ...siswaData,
            nama_kelas: kelasTerkait ? kelasTerkait.nama_kelas : 'Tanpa Kelas'
        }
    };
}
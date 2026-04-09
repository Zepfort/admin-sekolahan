import { apiRequest } from '$lib/server/api';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch,params, locals }) {
    const token = locals.user?.token;
    const { id } = params;

    const [resJadwal, resKelas, resMapel, resGuru] = await Promise.all([
        apiRequest(fetch, {resource: "jadwal", id: id,token}),
        apiRequest(fetch, {resource: "kelas", token}),
        apiRequest(fetch, {resource: "mapel", token}),
        apiRequest(fetch, {resource: "guru", token})
    ]);

    const jadwalData = Array.isArray(resJadwal) ? resJadwal[0] : resJadwal;
    const kelases = Array.isArray(resKelas) ? resKelas : [];
    const mapels = Array.isArray(resMapel) ? resMapel : [];
    const gurus = Array.isArray(resGuru) ? resGuru : [];

    if (!jadwalData) return { jadwal: null };

    const mapelTerkait = mapels.find(m => m.id == jadwalData.mapel_id);
    const kelasTerkait = kelases.find(k => k.id == jadwalData.kelas_id);
    const guruTerkait = gurus.find(g => g.id == jadwalData.guru_id);

    const normalizedJadwal = {
        ...jadwalData,
        id: jadwalData.id,
        hari: jadwalData.hari,
        jam_pelajaran: jadwalData.jam_pelajaran,
        nama_mapel: mapelTerkait?.nama_mapel || "Tanpa Mapel",
        kode_mapel: mapelTerkait?.kode_mapel || "-",
        nama_kelas: kelasTerkait?.nama_kelas || "Tanpa Kelas",
        kode_kelas: kelasTerkait?.kode_kelas || "-",
        nama_guru: guruTerkait?.nama || "Tanpa Guru"
    };

    return {
        jadwal: normalizedJadwal,
        kelases,
        mapels,  
        gurus   
    };
}
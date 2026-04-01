/** @type {import('@sveltejs/kit').Handle} */

export const handle = async ({ event, resolve }) => {
    const token = event.cookies.get('token');

    if (token) {
        try {
            const response = await fetch('http://sekolahan.test/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                const userData = await response.json();
                event.locals.user = {
                    token,
                    name: userData.data.name, // Sesuaikan dengan key dari API kamu (misal: userData.data.name)
                    email: userData.data.email
                };
            } else {
                event.cookies.delete('token', { path: '/' });
                event.locals.user = null;
            }
        } catch (error) {
            console.error('Gagal mengambil profile:', error);
            event.locals.user = null;
        }

        } else {
        event.locals.user = null;
    }

    if (event.url.pathname.startsWith('/admin') && !token) {
        return new Response(null, {
            status: 303,
            headers: { location: '/login' }
        });
    }

    return await resolve(event);
}
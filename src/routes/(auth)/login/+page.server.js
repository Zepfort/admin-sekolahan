import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({request, fetch, cookies }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        const response = await fetch('http://sekolahan.test/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password})
        });

        const result = await response.json();

        if (!response.ok) {
            const errorMessage = typeof result.message === 'object'
                ? Object.values(result.message)[0]
                : result.message;

            return fail(400, { error: errorMessage});
        }

        cookies.set('token', result.token, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 
        });

        throw redirect(303, '/admin')
    }
}
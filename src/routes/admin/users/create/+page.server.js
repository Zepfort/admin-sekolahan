

/** @type {import('./$types').Actions} */

import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({request, locals, fetch}) => {
        const formData = await request.formData();
        const token = locals.user?.token;

        const payload = {
            name: formData.get('name'),
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            type: formData.get('type')
        }

        let isSuccess = false

        try {
            const response = await fetch('http://sekolahan.test/api/users', {
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json' 
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                isSuccess = true;
            } else {
                const result = await response.json();
                console.error("Gagal tambah user", result);
            }
        } catch (error) {
            if (error.status === 303 ) throw error;
            console.error(error);
            throw error(500, "Terjadi kesalahan server!");
        }

        if (isSuccess) {
            throw redirect(303, '/admin/users');
        }
    }
}
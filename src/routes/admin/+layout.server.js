/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
    const user = locals.user;
    return {
        user: user ? {
            name: user.name,
            initials: user.name
                .split(' ')
                .filter(Boolean)
                .map((n) => n[0])
                .join('')
                .toUpperCase()
        } : null
    };
}
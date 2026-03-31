<script>
	import { enhance } from "$app/forms";
    import Icon from '@iconify/svelte';

    let { form } = $props();
</script>

<div class="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 flex flex-col justify-center items-center p-4">
    <div class="w-full max-w-md bg-zinc-100 dark:bg-zinc-950 border border-zinc-400 rounded-xl p-8 shadow-2xl">
        <div class="flex justify-center ">
            <Icon icon="ri:admin-line" class="w-12 h-12 text-green-500" />
        </div>
        <h1 class="text-2xl font-semibold text-center mb-1">Welcome back Administrator</h1>
        <p class="text-zinc-400 text-center text-sm mb-6">Sign in to your account</p>
        
        <form method="POST" use:enhance>
            {#if form?.error}
                <p class="text-red-500 text-sm mt-2 text-center animate-pulse">
                {form.error}
                </p>
            {/if}

            <div class="mb-4">
                <label for="email" class="block text-sm mb-2">Email</label>
                <input name="email" type="email" placeholder="demo@example.com" required
                class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none" />
            </div>

            <div class="mb-20">
                <div class="flex justify-between mb-2">
                <label for="password" class="block text-sm">Password</label>
            </div>
            <input name="password" type="password" placeholder="••••••••" required
            class="w-full text-gray-800 dark:text-gray-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-700 focus:border focus:border-green-600 outline-none" />

            <div class="flex justify-between mt-4">
                <div class="flex items-center gap-2">
                    <input type="checkbox" name="" id=""/> 
                    <span class="text-gray-100 font-medium text-base">Remember Me</span>
                </div>
                <a href="/forgot" class="text-sm text-green-600 hover:underline duration-150 transition-colors">Forgot password?</a>
            </div>
        </div>

            <button type="submit" class="w-full bg-green-600 text-gray-100 font-medium py-2 rounded-md hover:bg-green-700 transition-colors cursor-pointer">
                Sign in
            </button>
        </form>

        <p class="text-center text-sm text-zinc-300 mt-8">
            Don't have an account? <a href="/register" class="text-green-600 hover:underline">Sign up</a>
        </p>
    </div>
</div>
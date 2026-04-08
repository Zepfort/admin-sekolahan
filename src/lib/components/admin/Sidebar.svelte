<script>
    import { page } from '$app/stores';

    const isActive = (path) => $page.url.pathname === path;
</script>

<nav class="w-64 bg-zinc-950 text-zinc-400 h-screen flex flex-col border-r border-zinc-800">
  <div class="px-6 h-16 text-white font-bold text-xl flex items-center gap-1.5 border-b border-zinc-800">
    <div class="w-6 h-6 bg-emerald-500 rounded-sm"></div>
    <div class="flex flex-col justify-center">
        <a href="/admin" class="font-bold text-base text-gray-100 tracking-wide">SEKOLAHAN</a>
        <p class="text-gray-400 font-normal text-[10px] tracking-widest">DASHBOARD</p>
    </div>
  </div>
  
  <div class="flex-1 px-4 space-y-2 py-6">
    <a  
        href="/admin" 
        class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-100 cursor-pointer
        {isActive('/admin') ? 'bg-green-900/30 text-emerald-500' :  'hover:bg-zinc-800 hover:text-gray-100 '}">
      <span>Dashboard</span>
    </a>
    
    <a 
        href="/admin/users" 
        class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-100 cursor-pointer
        {isActive('/admin/users') ? 'bg-green-900/30 text-emerald-500' :  'hover:bg-zinc-800 hover:text-gray-100 '}">
      <span>Users</span>
    </a>

    <a 
        href="/admin/guru" 
        class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-100 cursor-pointer
        {isActive('/admin/guru') ? 'bg-green-900/30 text-emerald-500' :  'hover:bg-zinc-800 hover:text-gray-100 '}">
      <span>Guru</span>
    </a>

    <a 
        href="/admin/siswa" 
        class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-100 cursor-pointer
        {isActive('/admin/siswa') ? 'bg-green-900/30 text-emerald-500' :  'hover:bg-zinc-800 hover:text-gray-100 '}">
      <span>Siswa</span>
    </a>

    <a 
        href="/admin/kelas" 
        class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-100 cursor-pointer
        {isActive('/admin/kelas') ? 'bg-green-900/30 text-emerald-500' :  'hover:bg-zinc-800 hover:text-gray-100 '}">
      <span>Kelas</span>
    </a>

    <a 
        href="/admin/mapel" 
        class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-100 cursor-pointer
        {isActive('/admin/mapel') ? 'bg-green-900/30 text-emerald-500' :  'hover:bg-zinc-800 hover:text-gray-100 '}">
      <span>Mapel</span>
    </a>
  </div>

</nav>
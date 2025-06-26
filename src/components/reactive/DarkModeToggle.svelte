<script lang="ts">
  import { onMount } from 'svelte';
  
  let isDarkMode: boolean = false;

  onMount(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
    isDarkMode = savedMode !== null ? JSON.parse(savedMode) : prefersDark;
    document.documentElement.classList.toggle('dark', isDarkMode);
  });

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }
</script>

<button
  class="cursor-pointer w-24 p-1 border border-primary-foreground rounded-interactive text-primary-foreground text-xs font-black text-nowrap opacity-60 hover:opacity-100"
  onclick={toggleDarkMode}
  aria-label="Toggle dark mode"
>
  <span class="group-hover:hidden">{isDarkMode ? '☀️' : '🌙'}</span>
  <span class="hidden group-hover:inline">{isDarkMode ? '🌙' : '☀️'}</span>
</button>

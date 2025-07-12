<script lang="ts">
  import CosmeticText from './CosmeticText.svelte';

  let date = new Date().toLocaleDateString("es-ES", {
    year: "numeric", month: "short", day: "numeric"
  }).toUpperCase();
</script>

<CosmeticText text={date} />

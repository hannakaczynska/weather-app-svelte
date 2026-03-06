<script lang="ts">
  import { store } from "$lib/stores/store.svelte";
</script>


<section class="flex flex-col border rounded-lg shadow-md shadow-zinc-500/50 py-[10px] px-[20px]">
  <h3>Location:</h3>
  <div class="flex flex-col items-center gap-[5px]">
  <p>{store.currentCity?.name}</p>
  <p>{store.currentCity?.region}</p>
  <p>{store.currentCity?.subregion}</p>
  <p>{store.currentCity?.country}</p>
</div>
</section>

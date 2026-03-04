<script lang="ts">
  import { store } from "$lib/stores/store.svelte";
</script>


<section>
  <h2>Weather Location:</h2>
  <p>{store.currentCity?.name}</p>
  <p>{store.currentCity?.region}</p>
  <p>{store.currentCity?.subregion}</p>
  <p>{store.currentCity?.country}</p>
</section>

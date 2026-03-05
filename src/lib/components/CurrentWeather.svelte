<script lang="ts">
  import { store } from "$lib/stores/store.svelte";

</script>

<section>
  <h2>Current Weather:</h2>
  <data>Data</data>
  <data>Time</data>
  <div>
    <span>{store.weather?.currentWeather.temperature}</span>
  </div>
  <div>
    <span>{store.weather?.currentWeather.wind}</span>
  </div>
  <div>
    <span>{store.weather?.currentWeather.humidity}</span>
  </div>
</section>


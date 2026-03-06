<script lang="ts">
import { store } from "$lib/stores/store.svelte";
import {getWeatherCondition} from "$lib/utils/weatherUtils";

$: weatherCondition = getWeatherCondition(store.weather?.currentWeather.code);

</script>

<section>
  <h2>Current Weather:</h2>
  <data>Data</data>
  <data>Time</data>
  <img src="/weather/{weatherCondition}.svg" alt="{weatherCondition}" />
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


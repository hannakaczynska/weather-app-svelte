<script>
  import { store } from "$lib/stores/store.svelte";
  import WeatherCard from "$lib/components/WeatherCard.svelte";
  import WeatherLocation from "$lib/components/WeatherLocation.svelte";
  import CurrentWeather from "$lib/components/CurrentWeather.svelte";
  import ForecastWeather from "$lib/components/ForecastWeather.svelte";

$inspect(store);
</script>

<WeatherCard>
{#if store.loading}
  <div class="w-full">
    <h2 class="text-center mt-[50px]">Loading...</h2>
  </div>
{:else}
<div class="w-full flex flex-col gap-[30px]">
  <h2>Weather</h2>
  <WeatherLocation />
  <CurrentWeather />
  <ForecastWeather />
</div>
{/if}
</WeatherCard>

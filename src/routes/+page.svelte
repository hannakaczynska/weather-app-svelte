<script>
  import { store } from "$lib/stores/store.svelte";
  import WeatherCard from "$lib/components/WeatherCard.svelte";
  import WeatherLocation from "$lib/components/WeatherLocation.svelte";
  import CurrentWeather from "$lib/components/CurrentWeather.svelte";
  import ForecastWeather from "$lib/components/ForecastWeather.svelte";
</script>

<WeatherCard>
{#if store.loading}
  <div class="w-full">
    <h2 class="text-center mt-[50px]">Loading...</h2>
  </div>
{:else if store.weather && store.currentCity}
<div class="w-full flex flex-col gap-[30px]">
  <h2>Weather</h2>
  <WeatherLocation />
  <CurrentWeather />
  <ForecastWeather />
</div>
{:else}
  <div class="w-full text-center">
    <h2 class="text-2xl font-semibold mt-[50px] mb-[20px]">Welcome to WeatherApp</h2>
    <p class="text-gray-600 mb-[10px]">Get current weather and 7-day forecasts</p>
    <p class="text-gray-600">Use the search bar above to find your city</p>
  </div>
{/if}
</WeatherCard>



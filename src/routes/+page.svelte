<script>
  import { store } from "$lib/stores/store.svelte";
  import WeatherCard from "$lib/components/WeatherCard.svelte";
  import WeatherLocation from "$lib/components/WeatherLocation.svelte";
  import CurrentWeather from "$lib/components/CurrentWeather.svelte";
  import ForecastWeather from "$lib/components/ForecastWeather.svelte";

$inspect(store);
</script>

<WeatherCard>
  <h1>Title</h1>
  <WeatherLocation />
  <CurrentWeather />
  <ForecastWeather />
</WeatherCard>

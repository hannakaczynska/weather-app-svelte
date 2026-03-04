<script>
  import { getWeather } from "$lib/services/weather";
  import { getGeo } from "$lib/services/geocoding";
  import WeatherCard from "$lib/components/WeatherCard.svelte";
  import WeatherLocation from "$lib/components/WeatherLocation.svelte";
  import CurrentWeather from "$lib/components/CurrentWeather.svelte";
  import ForecastWeather from "$lib/components/ForecastWeather.svelte";

  console.log(getWeather(52.23009, 21.017075));
  console.log(getGeo("Berlin"));
  getGeo("Grodków");
</script>

<WeatherCard>
  <h1>Title</h1>
  <WeatherLocation />
  <CurrentWeather />
  <ForecastWeather />
</WeatherCard>

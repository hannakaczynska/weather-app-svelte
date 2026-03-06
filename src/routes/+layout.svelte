<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import Header from "$lib/components/Header.svelte";
  import { store } from "$lib/stores/store.svelte";
  import { getWeatherDescription } from "$lib/utils/weatherUtils";

  let weatherDescription = $derived(
    getWeatherDescription(store.weather?.currentWeather.code),
  );

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<main class="min-h-screen w-full">
  <picture class="fixed min-h-screen inset-0 -z-10">
    <source srcset="/backgrounds/{weatherDescription}.avif" type="image/avif" />
    <source srcset="/backgrounds/{weatherDescription}.webp" type="image/webp" />
    <img
      src="/backgrounds/{weatherDescription}.jpg"
      alt=""
      class="w-full h-full object-cover"
    />
  </picture>
  <Header />
  {@render children()}
</main>

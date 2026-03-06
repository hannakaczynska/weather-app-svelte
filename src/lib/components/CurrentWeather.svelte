<script lang="ts">
import { store } from "$lib/stores/store.svelte";
import {getWeatherCondition} from "$lib/utils/weatherUtils";

let weatherCondition = $derived(getWeatherCondition(store.weather?.currentWeather.code));
const currentDate = new Date();

const formattedTime = currentDate.toLocaleTimeString('en-US', { 
  hour: '2-digit', 
  minute: '2-digit'
});
</script>

<section class="flex flex-col border rounded-lg shadow-md shadow-zinc-500/50 py-[10px] px-[20px]">
  <h3>Current:</h3>
  <div class="flex flex-row justify-between mt-[10px] w-full">
  <time datetime="{currentDate.toISOString()}">{currentDate.toDateString()}</time>
  <time datetime="{currentDate.toISOString()}">{formattedTime}</time>
</div>
  <img src="/weather/{weatherCondition}.svg" alt="{weatherCondition}" class="w-[200px] lg:w-[300px] self-center" />
  <div class="flex flex-row justify-evenly">
  <div class="flex flex-col gap-[5px] items-center">
  <img src="/celsius.svg" alt="" class="w-[30px] lg:w-[50px]" />
    <span>{store.weather?.currentWeather.temperature}</span>
  </div>
  <div class="flex flex-col gap-[5px] items-center">
  <img src="/wind.svg" alt="" class="w-[30px] lg:w-[50px]" />
    <span>{store.weather?.currentWeather.wind} m/s</span>
  </div>
  <div class="flex flex-col gap-[5px] items-center">
  <img src="/humidity.svg" alt="" class="w-[30px] lg:w-[50px]" />
    <span>{store.weather?.currentWeather.humidity} %</span>
  </div>
</div>
</section>


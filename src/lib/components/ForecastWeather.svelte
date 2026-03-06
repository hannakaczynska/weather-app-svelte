<script lang="ts">
  import { store } from "$lib/stores/store.svelte";
  import {getWeatherCondition} from "$lib/utils/weatherUtils";
  import {formatDate} from "$lib/utils/formatUtils";

</script>

<section>
    <h3 class="text-center mb-[20px]">7 Day Forecast</h3>
    <ul class="flex flex-col gap-[30px] w-full">
        {#each store.weather?.forecast.dates as date, index}
            <li class="flex flex-col w-full items-center border rounded-lg shadow-md shadow-zinc-500/50 py-[20px]">
            <img src="/weather/{getWeatherCondition(store.weather?.forecast.codes[index])}.svg" alt="{getWeatherCondition(store.weather?.forecast.codes[index])}" class="w-[70px] lg:w-[100px]"/>
                <time datetime="{date}" class="text-center">{formatDate(date)}</time>
                <div class="flex flex-row gap-[20px] justify-evenly mt-[10px] w-full">
                <div class="flex flex-col items-center gap-[5px]">
                <img src="/max.svg" alt="" class="w-[20px] lg:w-[30px]" />
                <span>{store.weather?.forecast.maxTemperatures[index]}°C</span>
                </div>
                <div class="flex flex-col items-center gap-[5px]">
                <img src="/min.svg" alt="" class="w-[20px] lg:w-[30px]" />
                <span>{store.weather?.forecast.minTemperatures[index]}°C</span>
                </div>
            </div>
            </li>
        {/each}
    </ul>
</section>
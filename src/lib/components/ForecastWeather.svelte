<script lang="ts">
  import { store } from "$lib/stores/store.svelte";
  import {getWeatherCondition} from "$lib/utils/weatherUtils";
</script>

<section>
    <h2>7 days forecast</h2>
    <ul>
        {#each store.weather?.forcast.dates as date, index}
            <li>
            <img src="/weather/{getWeatherCondition(store.weather?.forcast.codes[index])}.svg" alt="{getWeatherCondition(store.weather?.forcast.codes[index])}" />
                <span>{date}</span>
                <div>
                <img src="/max.svg" alt="" width="20px" />
                <span>{store.weather?.forcast.maxTemperatures[index]}°C</span>
                </div>
                <div>
                <img src="/min.svg" alt="" width="20px" />
                <span>{store.weather?.forcast.minTemperatures[index]}°C</span>
                </div>
            </li>
        {/each}
    </ul>
</section>
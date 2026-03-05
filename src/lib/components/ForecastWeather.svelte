<script lang="ts">
  import { store } from "$lib/stores/store.svelte";
</script>

<section>
    <h2>7 days forecast</h2>
    <ul>
        {#each store.weather?.forcast.dates as date, index}
            <li>
                <span>{date}</span>
                <span>{store.weather?.forcast.maxTemperatures[index]}</span>
                <span>{store.weather?.forcast.minTemperatures[index]}</span>
            </li>
        {/each}
    </ul>
</section>
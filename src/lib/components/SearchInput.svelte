<script lang="ts">
  import type { GeocodingResult } from "$lib/types/geocoding";
  import { setCurrentCity, store } from "$lib/stores/store.svelte";
  import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { getGeo } from "$lib/services/geocoding";

  let cities = $state<GeocodingResult[]>([]);

  let open = $state(false);
  let inputValue = $state("");
  let triggerRef = $state<HTMLButtonElement>(null!);

  let debounceTimer: ReturnType<typeof setTimeout>;

  const getCities = async (city: string) => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
      const res = await getGeo(city);
      return typeof res === "string" ? (cities = []) : (cities = res);
    }, 300);
  };

  const closeAndFocusTrigger = () => {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  };

  const onCitySelect = (city: GeocodingResult) => {
    inputValue = "";
    setCurrentCity(city);
    closeAndFocusTrigger();
  };
</script>

<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="outline"
        class="w-[400px] justify-between"
        role="combobox"
        aria-expanded={open}
      >
        {store.currentCity?.name || "Find city..."}
        <ChevronsUpDownIcon class="opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-[400px] p-0">
    <Command.Root>
      <Command.Input
        placeholder="Search city..."
        bind:value={inputValue}
        oninput={(e) => getCities(e.currentTarget.value)}
      />
      <Command.List>
        {#if cities.length > 0}
          <Command.Group value="cities">
            {#each cities as city (city.id)}
              <Command.Item
                value={city.name}
                onSelect={() => onCitySelect(city)}
              >
                {city.name}{city.region ? `, ${city.region}` : ""}, {city.country}
              </Command.Item>
            {/each}
          </Command.Group>
        {:else if inputValue.trim() !== "" && cities.length === 0}
          <Command.Empty>No city found.</Command.Empty>
        {/if}
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>

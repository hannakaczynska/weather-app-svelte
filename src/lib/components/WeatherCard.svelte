<script lang="ts">
  let { children } = $props();
</script>

<div class="w-[80vw] md:w-[60vw] lg:w-[50vw] bg-white border rounded md:rounded-md lg:rounded-lg mx-auto p-4 lg:p-8 mt-[80px] shadow-[0_0_20px_5px_rgba(0,0,0,0.2)]">
{@render children()}
</div>
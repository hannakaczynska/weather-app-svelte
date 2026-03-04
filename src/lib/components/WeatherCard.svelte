<script lang="ts">
  let { children } = $props();
</script>

<div class="w-[80vw] md:w-[60vw] lg:w-[50vw] border rounded md:rounded-md lg:rounded-lg mx-auto p-4 lg:p-8 mt-[100px]">
{@render children()}
</div>
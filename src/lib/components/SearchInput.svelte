<form>
<label for="city">Find city</label>
<input type="text" bind:value={city} id="city" class="border"/>
<button type="submit">Search</button>
</form>


<script>
    let city = $state('')
</script>
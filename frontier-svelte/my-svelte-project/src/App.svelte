<script>
	import { onMount } from "svelte";
	var records=[];
	onMount(async () => {
	  records = await fetch("https://us-central1-frontier-eb43f.cloudfunctions.net/helloWorld")
	  records = records.json(); 
	  console.log(records);
	});
</script>
	

<main>
	{#await records then records}
		{#each records as r}
		<div>
		<p>{r.a}</p>
		</div>
	  {/each}	
		
			
	{/await}
</main>
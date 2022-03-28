<script>
	import { onMount } from "svelte";
	var records=[];
	onMount(async () => {
	  records = await fetch("https://us-central1-frontier-eb43f.cloudfunctions.net/helloWorld?x=davide")
	  records = records.json(); 
	  console.log(records);
	});
</script>
	

<main>
	{#await records then records}
		
		<div>
		<p>Hello {records.x}</p>
		</div>
	  	
			
	{/await}
</main>
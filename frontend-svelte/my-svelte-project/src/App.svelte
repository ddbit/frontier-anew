<script>
	import { onMount, tick } from "svelte";
import Chart from "./Chart.svelte";
	var response={};
	const ticker = "X:BTCUSD";
	onMount(async () => {
	  response = await fetch("https://us-central1-frontier-eb43f.cloudfunctions.net/stats?ticker="+ticker);
	  response = response.json(); 
	  console.log(response);
	});


</script>

<main>

	{#await response then response}
		<h1>{ticker}</h1>
		<div>
			<p>OPEN  :{response.opening}</p>
			<p>CLOSE :{response.closing}</p>
			<p>RETURN:{response.return}</p>
			<p>STDEV :{response.stdev}</p>
		</div>
		<Chart></Chart>
	  	
			
	{/await}
</main>
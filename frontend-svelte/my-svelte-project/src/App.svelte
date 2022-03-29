<script>
	import { onMount, tick } from "svelte";
    import Chart from "./Chart.svelte";
	import Hello from "./Hello.svelte";
	var response={};

	const ticker = "X:BTCUSD";
	
	onMount(async () => {
	  //response = await fetch("https://us-central1-frontier-eb43f.cloudfunctions.net/stats?ticker="+ticker);
	  response = await fetch("http://localhost:5001/frontier-eb43f/us-central1/stats?ticker="+ticker); 
	  response = response.json(); 

	});


</script>

<main>
	{#await response then response}
		<h1>{ticker}</h1>
		<h2>Last 30 days analysis</h2>
		<div>
			<p>OPEN  :{response.opening}</p>
			<p>CLOSE :{response.closing}</p>
			<p>RETURN:{response.return}</p>
			<p>VOLATILITY :{response.stdev}</p>
		</div>
		
		<Chart points={response.points}></Chart>
	  	
			
	{/await}
</main>
<script>
	import { onMount, tick } from "svelte";
    import Chart from "./Chart.svelte";
	var response={};

	export let ticker;
	
	onMount(async () => {
	  response = await fetch("https://us-central1-frontier-eb43f.cloudfunctions.net/stats?ticker="+ticker);
	  //response = await fetch("http://localhost:5001/frontier-eb43f/us-central1/stats?ticker="+ticker); 
	  response = response.json(); 

	});


</script>

<div class="card">
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
    </div>


    <style>
        .card {
            width: 25%;
			float: left;
            border: 1px solid #aaa;
            border-radius: 2px;
            box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
            padding: 30px;
            margin: 0 0 1em 0;
			min-width:300px;
        }
    </style>
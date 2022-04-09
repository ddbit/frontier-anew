<script>
	import { onMount, tick } from "svelte";
import { dataset_dev } from "svelte/internal";
    import Chart from "./Chart.svelte";
	var response={};
	var x=[];
	export let ticker, name;
	
	onMount(async () => {
	  //response = await fetch("https://us-central1-frontier-eb43f.cloudfunctions.net/stats?ticker="+ticker);
	  response = await fetch("http://localhost:5001/frontier-eb43f/us-central1/history?ticker="+ticker); 
	  response = response.json(); 

	});


</script>

<div class="card">
	{#await response then data}
		<h1>{ticker}</h1>
        <h3>{name}</h3>
		<h4>Last 30 days analysis</h4>
		
		<Chart y={data.prices} x={(data.prices===undefined)?undefined:data.prices.map((v,j)=>j - data.prices.length + 1)}></Chart>
	  	
			
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
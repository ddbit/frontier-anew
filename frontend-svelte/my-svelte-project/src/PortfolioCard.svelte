<script>
	import { onMount, tick } from "svelte";
    import Chart from "./Chart.svelte";
    import {baseurl} from "./config.js";

	var response={};

	export let tickers, weights;
	
	onMount(async () => {
	  response = await fetch(
          baseurl+
          "/portfolio?tickers="+
          tickers+
          "&weights="+
          weights
        );
	  response = response.json();
      response.aum = response.aum.map(
          val=>new Object({"price":val, "time":0})
      );
      console.log(response);

	});


</script>

<div class="card">
	{#await response then response}
		<h1>{tickers}</h1>
        <h3>{weights}</h3>
		<h4>Last 30 days analysis</h4>
		<div>
			<p>Volatility :{response.stdev}</p>
		</div>
		
		<Chart points={response.aum}></Chart>
	  	
			
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
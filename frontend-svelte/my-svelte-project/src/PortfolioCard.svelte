<script>
	import { onMount, tick } from "svelte";
    import {Portfolio} from "./portfolio";

	var portfolio={};

	export let tickers, weights;
	
	onMount(async () => {
	  portfolio = new Portfolio(tickers,weights);
      await portfolio.fetchHistory();
	});


</script>

<div class="card">
	{#await portfolio then p}
		<h1>{p.tickers}</h1>
        <h3>{p.weights}</h3>
		<h4>Last 30 days analysis</h4>
		<div>
			<p>Volatility :{p.stdev}</p>
		</div>
		
	  	
			
	{/await}
    </div>


    <style>
        .card {
            width: 25%;
			float: left;
            border: 1px solid rgb(55, 23, 142);
            background-color: rgb(224, 249, 244);
            border-radius: 2px;
            box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
            padding: 30px;
            margin: 0 0 1em 0;
			min-width:300px;
        }
    </style>
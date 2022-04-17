<script>
	import dataframe from "dataframe-js/lib/dataframe";
import { onMount, tick } from "svelte";
    import Chart from "./Chart.svelte";
	import {baseurl, postfix} from "./config.js"
	var response={};
	var x=[];
	export let ticker, name, chart=false;
	
	onMount(async () => {
	  response = await fetch(baseurl + ticker + postfix); 
	  response = response.json(); 
	});


	let fmt=function(val){
		return String(val*100).substring(0,4);
	}


</script>

	<div class="card">
		{#await response then data}
			<h1>{ticker}</h1>
			<h3>{name}</h3>
			{#if data.prices}
				<h3>{fmt((data.prices[data.prices.length-1] - data.prices[0])/data.prices[0])}</h3>
			{/if}
			<h5>last 30 days</h5>
			{#if chart}
				<Chart y={data.prices} x={(data.prices===undefined)?undefined:data.prices.map((v,j)=>j - data.prices.length + 1)}></Chart>
			{/if}
				
		{/await}

    </div>


    <style>
        .card {
            width: 20%;
			float: left;
            border: 1px solid #aaa;
            border-radius: 10px;
            box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
            padding: 30px;
            margin: 0 0 1em 0;
			min-width:150px;
        }
    </style>
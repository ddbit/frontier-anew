<script>
    import { onMount, afterUpdate } from "svelte";
    import Chart from "./Chart.svelte";
    import { createEventDispatcher } from 'svelte';
    import {calculateGlobalReturns, createPriceDataframe, calculateAUM, createReturnsDataframe} from "./portfolio.js";
    export let  tickers, weights, days;
    var data, withReturns, withWeightedReturns, withAum, table=[], aum=[];

    
	
	//Declare the dispatch
	const dispatch = createEventDispatcher();

    let recalculate= function(){
        
        if(data) {
            withReturns = createReturnsDataframe(data);
            dispatch('returns', withReturns);
            withWeightedReturns = calculateGlobalReturns(withReturns,weights);
            withAum = calculateAUM(withWeightedReturns,100);
            table = withAum.toCollection();
            aum = withAum.toDict().aum;
            //console.log("aum");
            //console.log(aum);
        }
    }

	let fmt=function(val){
		return String(val*100).substring(0,4)+"%";
	}

    onMount (async () => {
        //log("before");
        data = await createPriceDataframe(tickers,days);
        //console.log("after");
    }) ;
    
    afterUpdate(async () => {
		//console.log('the component just updated');
        recalculate();
	});

    const urlParams = new URLSearchParams(window.location.search);
    const isDebug = urlParams.has('debug');

</script>

{#await  data }
    <p>loading ....</p>
{:then data}
    {#if data}
        <h2>Asset under management in portfolio over last {days} days</h2>
        {#key aum}
            <Chart y={aum} x={aum.map((v,j)=>j - aum.length + 1)}></Chart>
        {/key}
        {#if isDebug}
        <table>
            <tr><td>time</td><td>return</td><td>aum</td></tr>
            {#each table as row}
            <tr>
                <td>{row.time}</td> 
                <td>{String(row.return).substring(0,6)}</td>
                <td>{String(row.aum).substring(0,6)}</td>
            </tr>
            <p>
                    
            </p>
            {/each}
        </table>
        {/if}

    {/if}
{/await}
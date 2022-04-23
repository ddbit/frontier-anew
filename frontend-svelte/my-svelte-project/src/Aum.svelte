<script>
    import { onMount, afterUpdate } from "svelte";
    import Chart from "./Chart.svelte";
    import {hello, calculateGlobalReturns, createPriceDataframe, calculateAUM, createReturnsDataframe} from "./portfolio.js";
    export let name, tickers, weights;
    var data, withReturns, withWeightedReturns, withAum, table=[], aum=[];

    let recalculate= function(){
        if(data) {
            withReturns = createReturnsDataframe(data);
            withWeightedReturns = calculateGlobalReturns(withReturns,weights);
            withAum = calculateAUM(withWeightedReturns,1000);
            table = withAum.toCollection();
            console.log("table");
            console.log(table);
            aum = withAum.toDict().aum;

        }
    }

	let fmt=function(val){
		return String(val*100).substring(0,4)+"%";
	}

    onMount (async () => {
        console.log("before");
        data = await createPriceDataframe(tickers,weights);
        console.log("after");
    }) ;
    
    afterUpdate(async () => {
		console.log('the component just updated');
        recalculate();
	});
    

</script>


{#await  data }
    <p>loading ....</p>
{:then data}
    {#if data}

        {#key aum}
            <Chart y={aum} x={aum.map((v,j)=>j - aum.length + 1)}></Chart>
        {/key}
        <table>
            <tr><td>time</td>
            {#each tickers as t}
                <td>{t}</td>
            {/each}
            <td>return</td><td>aum</td></tr>
            {#each table as row}
            <tr>
                <td>{row.time}</td> 
                {#each tickers as t}
                    <td>{fmt(row[t])}</td>
                {/each}
               
                <td>{fmt(row.return)}</td>
                <td>{String(row.aum).substring(0,6)}</td>
            </tr>
            <p>
                    
            </p>
            {/each}
        </table>

    {/if}
{/await}


<style>
	.center {
		margin-left: auto;
		margin-right: auto;
	}
</style>
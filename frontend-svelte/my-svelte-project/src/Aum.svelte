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
            aum = withAum.toDict().aum;
            console.log("aum");
            console.log(aum);
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

<p>{JSON.stringify(hello(name))}</p>
<p>{weights.map(fmt)}</p>
{#await  data }
    <p>loading ....</p>
{:then data}
    <p>data: {data}</p>
    {#if data}
        <p>data is ready</p>
        {#key aum}
            <Chart y={aum} x={aum.map((v,j)=>j - aum.length + 1)}></Chart>
        {/key}
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
{/await}
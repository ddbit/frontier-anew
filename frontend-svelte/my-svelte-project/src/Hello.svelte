<script>
    import { onMount, afterUpdate } from "svelte";
    import {hello, calculateReturns, createDataframe, calculateAUM} from "./hello.js";
    export let name, tickers, weights;
    var data, withReturns, withAum, table=[];

    let recalculate= function(){
        if(data) {
            withReturns = calculateReturns(data,weights);
            withAum = calculateAUM(withReturns,1000);
            table = withAum.toCollection();
        }
    }

	let fmt=function(val){
		return String(val*100).substring(0,4);
	}

    onMount (async () => {
        console.log("before");
        data = await createDataframe(tickers,weights);
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
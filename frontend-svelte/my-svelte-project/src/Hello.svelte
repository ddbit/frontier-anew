<script>
    import { onMount, afterUpdate } from "svelte";
    import {hello, calculateReturns, createDataframe, calculateAUM} from "./hello.js";
    export let name, tickers, weights;
    var data, table=[];
    onMount (async ()=>{
        console.log("before");
        data = await createDataframe(tickers,weights);
        console.log("after");
    }) ;
    
    afterUpdate(async () => {
		console.log('the component just updated');
        if(data) {
            data = calculateReturns(data,weights);
            data = calculateAUM(data,1000);
            data.show();
            table = data.toCollection();
        }
            
	});
    

</script>

<p>{JSON.stringify(hello(name))}</p>
<p>{tickers}</p>
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
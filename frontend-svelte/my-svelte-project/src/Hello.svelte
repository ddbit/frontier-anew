<script>
    import { onMount } from "svelte";
    import {hello, calculateReturns} from "./hello.js";
    export let name, tickers, weights;
    var data;
    onMount (async ()=>{
        console.log("before");
        data = await calculateReturns(tickers,weights);
        console.log("after");
    }) ;
    
    

</script>

<p>{JSON.stringify(hello(name))}</p>
<p>{tickers}</p>
{#await  data }
    <p>loading ....</p>
{:then data}
    <p>data: {data}</p>
{/await}
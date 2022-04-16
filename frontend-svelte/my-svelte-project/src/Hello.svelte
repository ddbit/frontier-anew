<script>
    import { onMount } from "svelte";
    import {hello, load} from "./hello.js";
    export let name,ticker;
    var data,prices;
    onMount (async ()=>{
        console.log("before");
        data = await load(ticker);
        console.log("after");
        prices = data.prices;
    }) ;
    
    

</script>

<p>{JSON.stringify(hello(name))}</p>

{#await  data }
    <p>loading ....</p>
{:then data}
    <p>prices: {prices}</p>
{/await}
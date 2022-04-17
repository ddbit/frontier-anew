<script>
    import AssetCard from "./AssetCard.svelte";
	export let tickers, weights;
    let incr=function(index, delta){
        weights[index]=weights[index]+delta;
        if(weights[index]>1) weights[index]=1;
        if(weights[index]<0) weights[index]=0;
        let sum = weights.reduce((s,k)=>s+k);
        weights = weights.map(x=>x/sum);
    }

    let rebalance=function(){
        weights=weights.map(_=>1/weights.length);
    }
    let fmt=function(val){
		return String(val*100).substring(0,4);
	}
</script>

<div class="portfolio">
    
    <tr>
        {#each tickers as t}
        <td>
            <AssetCard ticker={t}></AssetCard>
        </td>
        {/each}
    </tr>
    <tr>
        {#each weights as w, k}
            <td>
                <center>
                    <button on:click={()=>{incr(k,0.25)}}>+</button>
                    <button on:click={()=>{incr(k,-0.25)}}>-</button>
                    {fmt(w)}
                </center>
            </td>
        {/each}
        
    </tr>
    <tr>
        <td>
            <button on:click={rebalance}>rebalance naive</button>
        </td>
    </tr>
    
</div>


    <style>
        .portfolio {
            width: 100%;
			float: left;
            border: 1px solid rgb(0, 0, 0);
            background-color: rgb(250, 252, 252);
            border-radius: 2px;
            box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
            padding: 30px;
            margin: 0 0 1em 0;
			min-width:300px;
        }
    </style>
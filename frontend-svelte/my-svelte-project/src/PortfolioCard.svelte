<script>
    import AssetCard from "./AssetCard.svelte";
	export let tickers, names, weights;
    let assets={};

    for(let i=0;i<tickers.length;i++){
        assets[tickers[i]] = names[i]; 
    }

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
		return String(val*100).substring(0,4)+"%";
	}

    let comingSoon=function(){
        alert("coming soon");
    };

</script>

<div class="portfolio">
    
        {#each tickers as t, k}
            <div class="card">
                    <span>{t}</span>
                    <span>{assets[t]}</span>  
                    <button on:click={()=>{incr(k,0.25)}}>+</button>
                    <button on:click={()=>{incr(k,-0.25)}}>-</button>
                    {fmt(weights[k])}                   
            </div>
        {/each}

    
</div>
<div>
    <button on:click={rebalance}>rebalance naive</button>
    <button on:click={comingSoon}> lowest volatility </button>
    <button on:click={comingSoon}> highest return </button>
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
            overflow-x: hidden;
            word-wrap: break-word;
        }

        .card {
            width: 30%;
			float: left;
            border: 1px solid #aaa;
            border-radius: 10px;
            box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
            padding: 15px;
            margin: 0 0 1em 0;
			min-width:150px;
        }
    </style>
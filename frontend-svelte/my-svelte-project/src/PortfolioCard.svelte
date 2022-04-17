<script>
    import AssetCard from "./AssetCard.svelte";
	export let tickers, weights;
    

</script>

<div class="portfolio">
    <center>
        <AssetCard ticker="BNO" name="Brent Oil Fund"></AssetCard>
        <AssetCard ticker="IAU" name="iSahres Gold Fund"></AssetCard>
    </center>
</div>


    <style>
        .portfolio {
            width: 100%;
			float: left;
            border: 1px solid rgb(0, 0, 0);
            background-color: rgb(182, 241, 230);
            border-radius: 2px;
            box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
            padding: 30px;
            margin: 0 0 1em 0;
			min-width:300px;
        }
    </style>
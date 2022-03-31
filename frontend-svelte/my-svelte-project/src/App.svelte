<script>
	import AssetCard from "./AssetCard.svelte";
</script>

<main>
	<div style=
		"background-color: lightgrey; border-style:dotted; height:250px; width:100%">
		<h1 style="text-align: center;">
			Efficient Frontier
		</h1>
		
		<center>
			this box is empty for now...
		</center>
	</div>
	<AssetCard ticker="X:BTCUSD"></AssetCard>
	<AssetCard ticker="AAPL"></AssetCard>
	<AssetCard ticker="X:ETHUSD"></AssetCard>
	<AssetCard ticker="MSFT"></AssetCard>
	<br>
	<AssetCard ticker="AMZN"></AssetCard>
	<AssetCard ticker="X"></AssetCard>
</main>
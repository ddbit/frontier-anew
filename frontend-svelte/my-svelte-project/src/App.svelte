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
	<AssetCard ticker="X:BTCUSD" name="Bitcoin"></AssetCard>
	<AssetCard ticker="IAU" name="iShares Gold Fund"></AssetCard>
	<AssetCard ticker="BNO" name="Brent Oil Fund"></AssetCard>
	<AssetCard ticker="AAPL" name="Apple Inc."></AssetCard>
	<br>
</main>
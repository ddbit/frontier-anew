<script>
	import AssetCard from "./AssetCard.svelte";
	import PortfolioCard from "./PortfolioCard.svelte";
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
	<AssetCard ticker="BNO" name="Brent Oil Fund"></AssetCard>
	<AssetCard ticker="IAU" name="iShares Gold Fund"></AssetCard>
	<AssetCard ticker="X:BTCUSD" name="Bitcoin"></AssetCard>
	<PortfolioCard tickers="BNO,IAU,X:BTCUSD" weights="0.4,0.4,0.2"></PortfolioCard>
	<br>
</main>
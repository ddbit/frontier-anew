<script>
	import AssetCard from "./AssetCard.svelte";
import Hello from "./Hello.svelte";
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
	<Hello name="davide" ticker="BNO"></Hello>
	<br>
</main>
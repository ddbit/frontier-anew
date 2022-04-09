<script>
	import AssetCard from "./AssetCard.svelte";
import Chart from "./Chart.svelte";
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
	<Chart y={[100,102,94]} x={[1,2,3]}></Chart>
	<AssetCard ticker="BNO"></AssetCard>
	<br>
</main>
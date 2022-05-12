<script>
	
import Aum from "./Aum.svelte";
import PortfolioCard from "./PortfolioCard.svelte";
let tickers=["BNO","IAU","X:BTCUSD"];
let names = ["Brent Oil Fund","iShares Gold", "Bitcoin"];
let weights=[1/3,1/3,1/3];
</script>

<main>
	<div style=
		"background-color: lightgrey; border-style:dotted; height:100px; width:100%">
		<h1 style="text-align: center;">
			Efficient Frontier
		</h1>

	</div>
	<PortfolioCard 
		names={names}
		tickers={tickers} 
		bind:weights={weights}>
	</PortfolioCard>

	<Aum name="davide" 
			tickers={tickers}
			weights={weights}>
	</Aum>
	<br>
</main>
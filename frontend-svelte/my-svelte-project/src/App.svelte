<script>
	
import Aum from "./Aum.svelte";
import Hello from "./Aum.svelte";
import PortfolioCard from "./PortfolioCard.svelte";
let tickers=["X:BTCUSD","X:BTCUSD"];//["BNO","IAU","X:BTCUSD"];
let weights=[0.5,0.5];//[1/3,1/3,1/3];
</script>

<main>
	<div style=
		"background-color: lightgrey; border-style:dotted; height:100px; width:100%">
		<h1 style="text-align: center;">
			Efficient Frontier
		</h1>

	</div>
	<PortfolioCard 
		tickers={tickers} 
		bind:weights={weights}>
	</PortfolioCard>

	<Aum name="davide" 
			tickers={tickers}
			weights={weights}>
	</Aum>
	<br>
</main>
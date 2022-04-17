<script>
	
import Hello from "./Hello.svelte";
import PortfolioCard from "./PortfolioCard.svelte";
let tickers=["BNO","IAU","X:BTCUSD"];
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
		tickers={tickers} 
		bind:weights={weights}>
	</PortfolioCard>

	<Hello name="davide" 
			tickers={tickers}
			weights={weights}>
	</Hello>
	<br>
</main>
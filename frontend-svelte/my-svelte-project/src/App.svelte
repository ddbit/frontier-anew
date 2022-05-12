<script>
	
import Aum from "./Aum.svelte";
import PortfolioCard from "./PortfolioCard.svelte";
let tickers=["BNO","IAU","X:BTCUSD"];
let names = ["Brent Oil Fund","iShares Gold", "Bitcoin"];
let weights=[1/3,1/3,1/3];

const period = 90;
let to = new Date();
let from = ((date) => {
        date.setDate(to.getDate() - (period===undefined?30:period));
        return date;
       }
)(new Date());

</script>

<main>
	<div style=
		"background-color: lightgrey; border-style:dotted; height:100px; width:100%">
		<h1 style="text-align: center;">
			(not yet) Efficient Frontier
		</h1>
		<p>date range observed {[from.toISOString().substring(0,10),
		 						to.toISOString().substring(0,10)]}</p>
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
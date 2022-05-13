<script>
	
import Aum from "./Aum.svelte";
import PortfolioCard from "./PortfolioCard.svelte";
let tickers=["NSPI","BNO","IAU","X:BTCUSD"];
let names = ["SP500 ETF","Brent Oil Fund","iShares Gold", "Bitcoin"];
let weights=[0.25,0.25,0.25,0.25];

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
	</div>
	<PortfolioCard 
		names={names}
		tickers={tickers} 
		bind:weights={weights}>
	</PortfolioCard>

	<p>date range observed {[from.toISOString().substring(0,10),
		to.toISOString().substring(0,10)]}
	</p>
	<Aum name="davide" 
			tickers={tickers}
			weights={weights}>
	</Aum>
	<br>
	<div style=
		"background-color: lightgrey; height:50px; width:100%">
		<p style="text-align: center;">
			Frontier(c) by Davide Carboni 2022. <a href="https://digitaldavide.me">digitaldavide.me</a> 
		</p>
		<p style="text-align: center;">
			<a href="https://github.com/ddbit/frontier-anew">github</a>
		</p>
	</div>

</main>
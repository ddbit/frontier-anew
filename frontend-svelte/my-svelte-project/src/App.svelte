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
		"background-color: lightgreen; border-style:dotted; height:100px; width:100%">
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
		"background-color: lightgreen; height:120px; width:100%">
		<p style="text-align: center;">
			Frontier(c) by Davide Carboni 2022. <a href="https://digitaldavide.me">digitaldavide.me</a> 
		
			<a href="https://github.com/ddbit/frontier-anew">
				<svg aria-hidden="true" role="img" class="color-fg-default" viewBox="0 0 16 16" width="32" height="32" fill="currentColor" style="display:inline-block;user-select:none;vertical-align:text-bottom;overflow:visible"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
			</a>
		</p>
		<p style="text-align: center;">
			Our privacy and cookie policy is simple: we don't collect your personal data and we use a session cookie.
		</p>

	</div>

</main>
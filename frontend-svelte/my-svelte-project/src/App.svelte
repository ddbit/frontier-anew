<script>
	
import Hello from "./Hello.svelte";
import PortfolioCard from "./PortfolioCard.svelte";
</script>

<main>
	<div style=
		"background-color: lightgrey; border-style:dotted; height:100px; width:100%">
		<h1 style="text-align: center;">
			Efficient Frontier
		</h1>

	</div>
	<PortfolioCard tickers={["BNO","IAU"]} weights={[0.3,0.7]}}></PortfolioCard>

	<Hello name="davide" 
			tickers={["BNO","IAU"]}
			weights={[0.3,0.7]}></Hello>
	<br>
</main>
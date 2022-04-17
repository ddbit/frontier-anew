<script>
	import Hello from "./Hello.svelte";
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
	<Hello name="davide" 
			tickers={["BNO","IAU"]}
			weights={[0.3,0.7]}></Hello>
	<br>
</main>
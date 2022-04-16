<script>

    import { DataFrame } from "dataframe-js";
    import {column, fetchHistory, init} from "./portfolio";
	export let tickers, weights;
    var promise=fetchHistory(tickers,30);

</script>

<div class="card">


	
		<h1>{tickers}</h1>
        <h3>{weights}</h3>
		<h4>Last 30 days analysis</h4>
    {#await promise}
        <p>Data : ...loading</p>
    {:then df}
        <p>Data :{df===undefined?df:df.show()}</p>
 

    {:catch err}
     <p>Promise failed! {err}</p>
	{/await}
    </div>


    <style>
        .card {
            width: 25%;
			float: left;
            border: 1px solid rgb(55, 23, 142);
            background-color: rgb(224, 249, 244);
            border-radius: 2px;
            box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
            padding: 30px;
            margin: 0 0 1em 0;
			min-width:300px;
        }
    </style>
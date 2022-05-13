<script>
	import { scaleLinear } from 'd3-scale';
	//import points from './data.js';
    export let x,y;
	var points;
	var len;

    if (y !== undefined) {
		points=[];
		if(x===undefined) x=y.map((v,j)=>j);
		
		len = y.length;
		for(let i=0;i<len;i++){
			points.push({"x":x[i], "y":y[i]});
		}
		
	}
	console.log("points");
	console.log(points);
	console.log(x);
	console.log(y);
	if(points.length==0)points=[{x:0,y:0}];
	var len = y?y.length:0;
	var lastY = len>0?y[len-1]:undefined;
	var lastX = len>0?x[len-1]:undefined;
	var minY = Math.min.apply(null,y);
	var maxY = Math.max.apply(null,y);
	const yTicks = [y[0],minY, maxY, lastY];
	
    //const yTicks = [30000,50000];
 
	const xTicks =[];// [Math.min.apply(null,x),Math.round(len/2) - len, Math.max.apply(null,x)];
	
	if(lastY) yTicks.push(lastY);

	const padding = { top: 20, right: 15, bottom: 20, left: 25 };

	let width = 500;
	let height = 200;

	$: xScale = scaleLinear()
		.domain([minX, maxX])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([Math.min.apply(null, yTicks), Math.max.apply(null, yTicks)])
		.range([height - padding.bottom, padding.top]);

	$: minX = points[0].x;
	$: maxX = points[points.length - 1].x;
	$: path = `M${points.map(p => `${xScale(p.x)},${yScale(p.y)}`).join('L')}`;
	$: area = `${path}L${xScale(maxX)},${yScale(minY)}L${xScale(minX)},${yScale(minY)}Z`;

	function formatMobile (tick) {
		return "'" + tick.toString().slice(-2);
	}
</script>


<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg>
		<!-- y axis -->
		<g class="axis y-axis" transform="translate(0, {padding.top})">
			{#each yTicks as tick}
				<g class="tick tick-{tick}" transform="translate(0, {yScale(tick) - padding.bottom})">
					<line x2="100%"></line>
					<text y="-4">{tick} {tick === 8 ? ' million sq km' : ''}</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each xTicks as tick}
				<g class="tick tick-{ tick }" transform="translate({xScale(tick)},{height})">
					<line y1="-{height}" y2="-{padding.bottom}" x1="0" x2="0"></line>
					<text y="-2">{width > 380 ? tick : formatMobile(tick)}</text>
				</g>
			{/each}
		</g>

		<!-- data -->
		<path class="path-area" d={area}></path>
		<path class="path-line" d={path}></path>
	</svg>
</div>


<style>
	.chart, h2, p {
		width: 100%;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 200px;
		overflow: visible;
	}

	.tick {
		font-size: .725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #aaa;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #666;
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.path-line {
		fill: none;
		stroke: rgb(0,100,100);
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}

	.path-area {
		fill: rgba(0,100,100,0.2);
	}
</style>


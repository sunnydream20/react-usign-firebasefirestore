import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

/*  */
const Graph = ({ data, color, width, height, mode }) => {
	const svgRef = useRef();

	useEffect(() => {
		if (!Array.isArray(data) || !data.length) return;
		const _data = data.filter(d => Boolean(d.date));

		// const width = svgRef.current.clientWidth;
		// const height = Math.floor(width * 0.37);
		const marginX = 3;
		const marginTop = 3;
		const marginBottom = 3;

		const X = d3.map(_data, (d) => new Date(d.date));
		const Y = d3.map(_data, (d) => d.price);
		const I = d3.map(_data, (_, i) => i);
		const defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
		const D = d3.map(_data, defined);

		let xScale;
		let xDomain;
		if (mode === '1D') {
			if (data.length === 0) {
				xDomain = d3.extent(X);
			} else {
				const arr = data[0].date.split('T');
				const startDate = `${arr[0]}T09:30:00`;
				const endDate = `${arr[0]}T16:00:00`;
				xDomain = [new Date(startDate), new Date(endDate)];
				// construct scales and axes.
			}
			const xRange = [marginX, width - marginX];
			xScale = d3.scaleUtc(xDomain, xRange);
		} else {
			// compute default domains.
			// xDomain = d3.extent(X);
			xScale = d3
				.scaleTime()
				.domain(d3.map(data, (d) => new Date(d.date)))
				.range(d3.range(marginX, width - marginX, (width - marginX) / (data.length - 1)));
		}
		// const yDomain = [0, d3.max(Y)];
		const yDomain = [d3.min(Y), d3.max(Y)];

		const yRange = [height - marginBottom, marginTop];
		const yScale = d3.scaleLinear(yDomain, yRange);

		// construct a line generator.
		const line = d3
			.line()
			.defined((i) => D[i])
			.curve(d3.curveLinear)
			.x((i) => xScale(X[i]))
			.y((i) => yScale(Y[i]));

		svgRef.current.innerHTML = '';
		const svg = d3.select(svgRef.current).append('svg').attr('width', width).attr('height', height).attr('viewBox', [0, 0, width, height]);

		// graph line
		svg
			.append('path')
			.attr('fill', 'none')
			.attr('stroke-width', 2)
			.attr('stroke', `${color}`)
			// .attr('class', 'stroke-[#00FF26]')
			.attr('d', line(I));
	}, [data, color, width, height, mode]);

	// return <svg ref={svgRef} />;
	return <div className="w-full" ref={svgRef} />;
};

export default Graph;

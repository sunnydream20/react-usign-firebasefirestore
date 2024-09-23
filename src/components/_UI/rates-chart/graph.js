import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const getXAxis = (mode, xRange, xScale, xArr) => {
  const date0 = new Date();
  switch (mode) {
    case '3M':
      date0.setMonth(date0.getMonth() - 2);
      return d3
        .axisBottom(d3.scaleLinear([-0.25, 2.25], xRange))
        .tickValues([0, 1, 2])
        .tickFormat((d) => {
          const date = new Date(date0);
          date.setMonth(date.getMonth() + d);
          return d3.timeFormat('%b')(date);
        });
    case '6M':
      date0.setMonth(date0.getMonth() - 5);
      return d3
        .axisBottom(d3.scaleLinear([-0.25, 5.25], xRange))
        .tickValues([0, 1, 2, 3, 4, 5])
        .tickFormat((d) => {
          const date = new Date(date0);
          date.setMonth(date.getMonth() + d);
          return d3.timeFormat('%b')(date);
        });
    case '1Y':
      date0.setMonth(date0.getMonth() - 11);
      return d3
        .axisBottom(d3.scaleLinear([0, 11.5], xRange))
        .tickValues([1, 3, 5, 7, 9, 11])
        .tickFormat((d) => {
          const date = new Date(date0);
          date.setMonth(date.getMonth() + d);
          return d3.timeFormat('%b')(date);
        });
    case '5Y':
      date0.setFullYear(date0.getFullYear() - 4);
      return d3
        .axisBottom(d3.scaleLinear([-0.25, 4.25], xRange))
        .tickValues([0, 1, 2, 3, 4])
        .tickFormat((d) => {
          const date = new Date(date0);
          date.setFullYear(date.getFullYear() + d);
          return d3.timeFormat('%Y')(date);
        });
    case '10Y':
      date0.setFullYear(date0.getFullYear() - 9);
      return d3
        .axisBottom(d3.scaleLinear([-0.75, 9], xRange))
        .tickValues([0, 2, 4, 6, 8])
        .tickFormat((d) => {
          const date = new Date(date0);
          date.setFullYear(date.getFullYear() + d);
          return d3.timeFormat('%Y')(date);
        });
    default:
      // default to 20Y mode
      date0.setFullYear(date0.getFullYear() - 21);
      return d3
        .axisBottom(d3.scaleLinear([-1.5, 22], xRange))
        .tickValues([0, 5, 10, 15, 20])
        .tickFormat((d) => {
          const date = new Date(date0);
          date.setFullYear(date.getFullYear() + d);
          return d3.timeFormat('%Y')(date);
        });
  }
};

const Graph = ({ data, mode, yAxisSuffix = '' }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = svgRef.current.clientWidth;
    const height = Math.floor(width * 0.37);
    const chartWidth = 280; // fixed chart width (box)
    const chartHeight = 92; // fixed chart height (box)
    const marginTop = 2;
    const marginRight = 30;
    const marginBottom = 20;
    const marginLeft = 0;
    const innerWidth = width - marginRight - marginLeft;
    const graphBackground = '#131313';

    let X = d3.map(data, (d) => new Date(d.date));
    let Y = d3.map(data, (d) => Number(d.perc));
    let I = d3.map(data, (_, i) => i);
    const defined = (d, i) => !(isNaN(X[i]) || isNaN(Y[i]));
    const D = d3.map(data, defined);

    const xRange = [0, innerWidth];
    const xScale = d3.scaleTime()
      .domain(X)
      .range(d3.range(marginLeft, innerWidth, (innerWidth) / (data.length - 1)));

    const min = Math.floor(d3.min(Y))
    const max = Math.floor(d3.max(Y))

    // construct scales and axes.
    const yDomain = [min - 0.5, max + 0.75];
    const yRange = [height - marginBottom, marginTop];
    const yScale = d3.scaleLinear(yDomain, yRange);

    const xAxis = getXAxis(mode, xRange, xScale, X).tickSizeOuter(0);

    // construct a line generator.
    const line = d3
      .line()
      .defined((i) => D[i])
      .curve(d3.curveBundle)
      .x((i) => xScale(X[i]))
      .y((i) => yScale(Y[i]));

    svgRef.current.innerHTML = '';
    const svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // add rectangle as background of graph
    svg.append('rect')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('fill', graphBackground);

    // append Y axis
    let tickValues = d3.range(min, max + 1, 2);
    if (mode === '20Y' || tickValues.length < 3) tickValues = d3.range(min, max + 1, 1);
    svg.append("g")
      .attr('transform', `translate(${innerWidth}, 0)`)
      .call(
        d3.axisRight(yScale)
          .tickValues(tickValues)
          .tickFormat(d => d3.format('0')(d) + yAxisSuffix)
          .tickSizeOuter(0)
      )
      .call(g => {
        g.selectAll('.tick line').remove();
        g.selectAll('.domain').remove();
        g.selectAll('.tick text')
          .attr('font-size', 14)
          .attr('font-family', 'Arial')
          .attr('transform', 'translate(-6, 0)');
      })

    // x axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(xAxis)
      .call((g) => g.selectAll('.tick line').remove())
      .call((g) => g.selectAll('.domain').remove())
      .call((g) => g.selectAll('.tick text')
        .attr('font-size', 14)
        .attr('font-family', 'Arial')
        .attr('y', 6)
      );

    // graph line
    svg
      .append('path')
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('stroke', '#2898FF')
      .attr('d', line(I));
  }, [data, mode, yAxisSuffix]);

  // return <svg ref={svgRef} />;
  return (
    <div className='w-full' ref={svgRef} />
  );
};

export default Graph;

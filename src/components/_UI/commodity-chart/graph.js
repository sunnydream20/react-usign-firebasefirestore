import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const getXAxis = (mode, xRange) => {
  const date0 = new Date();
  switch (mode) {
    case '1D':
      return d3
        .axisBottom(d3.scaleLinear([-0.5, 5.5], xRange))
        .tickValues([0, 1, 2, 3, 4, 5])
        .tickFormat((d) => ['10:00', '11:00', '12:00', '1:00', '2:00', '3:00'][d]);
    case '5D':
      let days = Math.max((date0.getDay() + 6) % 7, 4);
      return d3
        .axisBottom(d3.scaleLinear([-0.3, 4.3], xRange))
        .tickValues([0, 1, 2, 3, 4])
        .tickFormat((d) => {
          return ['Mon', 'Tues', 'Wed', 'Thus', 'Fri'][(days + d) % 5];
        });
    case '1M':
      date0.setDate(date0.getDate() - date0.getDay() - 27);
      return d3
        .axisBottom(d3.scaleLinear([0, 28], xRange))
        // .tickValues([0, 7, 14, 21, 28])
        .tickValues([0, 8, 14, 20, 28])
        .tickFormat((d) => {
          const date = new Date(date0);
          date.setDate(date.getDate() + d);
          return d3.timeFormat('%b %e')(date);
        });
    case '3M':
      const ticks4M = [0, -1, -2, -3];
      return d3.axisBottom(d3.scaleLinear([-3.25, 0.25], xRange))
        .tickValues(ticks4M)
        .tickFormat(d => {
          const date = new Date();
          date.setMonth(date.getMonth() + d);
          return d3.timeFormat('%b')(date);
        });
    case '6M':
      const ticks7M = [0, -1, -2, -3, -4, -5, -6];
      return d3.axisBottom(d3.scaleLinear([-6.25, 0.25], xRange))
        .tickValues(ticks7M)
        .tickFormat(d => {
          const currentDate = new Date();
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + d, 1);
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
    default:
      date0.setFullYear(date0.getFullYear() - 5);
      return d3
        .axisBottom(d3.scaleLinear([-0.25, 5.25], xRange))
        .tickValues([0, 1, 2, 3, 4, 5])
        .tickFormat((d) => {
          const date = new Date(date0);
          date.setFullYear(date.getFullYear() + d);
          return d3.timeFormat('%Y')(date);
        });
  }
};
const Graph = ({ data, mode, highlightColor, yAxisSuffix = '' }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = svgRef.current.clientWidth;
    const height = Math.floor(width * 0.37);
    const chartWidth = 305;
    const chartHeight = 92;
    const marginTop = 2;
    const marginRight = 3;
    const marginLeft = 0;
    const marginBottom = 20;
    const innerWidth = width - marginRight - marginLeft;
    const graphBackground = '#1A1A1A';

    const X = d3.map(data, (d) => new Date(d.date));
    const Y = d3.map(data, (d) => d.price);
    const I = d3.map(data, (_, i) => i);
    const defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
    const D = d3.map(data, defined);

    const min = 0;
    const max = Math.floor(d3.max(Y));

    // compute default domains.
    const yDomain = [min - 80, max + 100];
    const yRange = [height - marginBottom, marginTop];
    const yScale = d3.scaleLinear(yDomain, yRange);

    // construct scales and axes.
    const xDomain = d3.extent(X);
    const xRange = [0, innerWidth];
    const xScale = d3.scaleUtc(xDomain, xRange);

    const xAxis = (
      mode === 'MAX' ? d3.axisBottom(xScale).ticks(6) : getXAxis(mode, xRange)
    ).tickSizeOuter(0);

    // construct a line generator.
    const line = d3
      .line()
      .defined((i) => D[i])
      .curve(d3.curveLinear)
      .x((i) => xScale(X[i]))
      .y((i) => yScale(Y[i]));

    svgRef.current.innerHTML = '';

    const svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    svg.append('rect')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('fill', graphBackground);

    let tickValues = d3.range(min, max + 10, 300);
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
        g.selectAll('.tick text').remove();
        g.selectAll('.domain').remove();
      });

    
    svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom-4})`)
      .call(xAxis)
      .call((g) => {
        g.selectAll('.tick line').remove();
        g.selectAll('.domain').remove();
      })
      .call((g) => {
        if (mode === '1M') {
          const ticks = g.selectAll('.tick text').nodes();
          ticks[0].setAttribute('text-anchor', 'start');
          ticks[ticks.length - 1].setAttribute('text-anchor', 'end');
        }
      })
      .call((g) => g
        .selectAll('.tick text')
        .attr('font-size', 14)
        .attr('font-family', 'Roboto')
        .attr('y', 6)
      );
    if (data.length === 0) {
      return;
    }
    const firstX = xScale(X[0]);
    let firstY = yScale(Y[0]);

    if (isNaN(firstX) || isNaN(firstY)) {
      return;
    }
    
    if (isNaN(firstY)) {
      firstY = 0;
    }
    svg
      .append('path')
      .attr('stroke-dasharray', '3, 6')
      .attr('stroke', '#595959')
      .attr('stroke-width', 3)
      .attr('stroke-linecap', 'round')
      .attr('d', `M ${firstX} ${firstY} H ${innerWidth}`);
    svg
      .append('path')
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('stroke', highlightColor)
      .attr('d', line(I));
  }, [data, mode, highlightColor, yAxisSuffix]);

  // return <svg ref={svgRef} />;
  return (
    <div className='w-full commodity-chart' ref={svgRef} />
  )
};

export default Graph;

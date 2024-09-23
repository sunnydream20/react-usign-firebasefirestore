import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { findDisplayMinMax } from '../../../utils/home/utils';

const getXAxis = (mode, xRange, xScale, xArr) => {
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
    default:
      date0.setFullYear(date0.getFullYear() - 4);
      return d3
        .axisBottom(d3.scaleLinear([-0.25, 4.25], xRange))
        .tickValues([0, 1, 2, 3, 4])
        .tickFormat((d) => {
          const date = new Date(date0);
          date.setFullYear(date.getFullYear() + d);
          return d3.timeFormat('%Y')(date);
        });
  }
};


const Graph = ({ data, mode, groupColor }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = svgRef.current.clientWidth;
    const height = Math.floor(width * 0.37);
    const marginTop = 2;
    const marginBottom = 20;
    const marginX = 0;

    const X = d3.map(data, (d) => new Date(d.date));
    const Y = d3.map(data, (d) => d.price);
    const I = d3.map(data, (_, i) => i);
    const defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
    const D = d3.map(data, defined);

    // compute default domains.
    // const xDomain = d3.extent(X);
    let xScale;
    let xDomain;

    const xRange = [0, width - 2 * marginX];
    if (mode === '1D') {
      if (data.length === 0) {
        xDomain = d3.extent(X);
      }
      else {
        const arr = data[0].date.split('T');
        const startDate = `${arr[0]}T09:30:00`;
        const endDate = `${arr[0]}T16:00:00`;
        xDomain = [new Date(startDate), new Date(endDate)];
      }
      xScale = d3.scaleUtc(xDomain, xRange);


    }
    else {
      xScale = d3.scaleTime()
        .domain(d3.map(data, d => new Date(d.date)))
        .range(d3.range(marginX, width - marginX, (width - marginX) / (data.length - 1)))
    }

    const { min, max } = findDisplayMinMax(Y);
    // console.log(`min =>${min}, max => ${max}, ticks => ${tickCounts}`);

    const yDomain = [min, max];

    // construct scales and axes.

    const yRange = [height - marginBottom, marginTop];
    // const xScale = d3.scaleUtc(xDomain, xRange);
    const yScale = d3.scaleLinear(yDomain, yRange);

    const xAxis = (
      mode === 'MAX' ? d3.axisBottom(xScale).ticks(6) : getXAxis(mode, xRange, xScale, X)
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
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])

    // x axis

    svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(xAxis)
      .call((g) => g.selectAll('.tick line').remove())
      .call((g) => {
        if (mode === '1M') {
          const ticks = g.selectAll('.tick text').nodes();
          ticks[0].setAttribute('text-anchor', 'start');
          ticks[ticks.length - 1].setAttribute('text-anchor', 'end');
        }
      })
      .call((g) => g.selectAll('.tick text').attr('font-size', 14).attr('font-family', 'Arial').attr('y', 6));

    // average line and value
    // const averageY = d3.sum(Y) / Y.length;
    // const averageY = d3.max(Y)/2;
    const averageY = (min + max) / 2;
    if (!isNaN(averageY)) {
      svg
        .append('line')
        .attr('stroke', 'currentColor')
        .attr('stroke-dasharray', '3,3')
        .attr('x1', 0)
        .attr('y1', yScale(averageY))
        .attr('x2', width - 2 * marginX)
        .attr('y2', yScale(averageY));

    }

    // graph line
    svg
      .append('path')
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('stroke', groupColor)
      .attr('d', line(I));
  }, [data, mode, groupColor]);

  // return <svg ref={svgRef} />;
  return (
    <div className='w-full font-roboto' ref={svgRef} />
  );
};

export default Graph;

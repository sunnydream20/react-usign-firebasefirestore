import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const getXAxis = (mode, xRange) => {
  const date0 = new Date();
  // eslint-disable-next-line
  const xScale = d3.scaleTime().range(xRange);

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

const Graph = ({ data, mode }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!Array.isArray(data) || !data.length) return;
    const _data = data.filter((d) => Boolean(d.date));

    const width = svgRef.current.clientWidth;
    const height = Math.floor(width * 0.35);
    const chartHeight = 92;
    const marginTop = 2;
    const marginBottom = 15;

    const X = d3.map(_data, (d) => new Date(d.date));
    const Y = d3.map(_data, (d) => d.price);
    const I = d3.map(_data, (_, i) => i);
    const defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
    const D = d3.map(_data, defined);

    // compute default domains.
    const xDomain = d3.extent(X);
    const yDomain = [0, d3.max(Y)];

    // construct scales and axes.
    const xRange = [0, width];
    const yRange = [height - marginBottom, marginTop];
    const xScale = d3.scaleUtc(xDomain, xRange);
    const yScale = d3.scaleLinear(yDomain, yRange);

    const xAxis = (mode === 'MAX' ? d3.axisBottom(xScale).ticks(6) : getXAxis(mode, xRange)).tickSizeOuter(0);

    // construct a line generator.
    const line = d3
      .line()
      .defined((i) => D[i])
      .curve(d3.curveLinear)
      .x((i) => xScale(X[i]))
      .y((i) => yScale(Y[i]));

    svgRef.current.innerHTML = '';
    const svg = d3.select(svgRef.current).append('svg').attr('width', width).attr('height', height).attr('viewBox', [0, 0, width, height]);
    svg.append('rect')
      .attr('width', width)
      .attr('height', chartHeight)
      .attr('fill', '#1A1A1A');
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
      .call((g) => g.selectAll('.tick text').attr('font-size', 14).attr('font-family', 'Roboto').attr('y', 4));

    svg.append('line')
      .attr('x1', xScale(X[0]))
      .attr('y1', yScale(Y[0]))
      .attr('x2', width)
      .attr('y2', yScale(Y[0]))
      .attr('stroke', '#595959')
      .attr('stroke-dasharray', '3, 6')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', '3');
    // graph line
    const path = svg
      .append('path')
      .attr('stroke-linecap', 'round')
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('class', 'stroke-[#00C25A]')
      .attr('d', line(I));

    const tooltip = d3
      .select(svgRef.current)
      .append('div')
      .attr('class', 'tooltip')
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "3px")
      .style("padding", "2px")
      .style('position', 'absolute')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    svg.on('mousemove', (event) => {
      const [x, y] = d3.pointer(event);

      const pathNode = path.node();
      const pathLength = pathNode.getTotalLength();
      let closestPoint = pathNode.getPointAtLength(0);
      let closestDistance = distance(x, y, closestPoint.x, closestPoint.y);

      for (let i = 1; i < pathLength; i++) {
        const point = pathNode.getPointAtLength(i);
        const distanceToMouse = distance(x, y, point.x, point.y);

        if (distanceToMouse < closestDistance) {
          closestPoint = point;
          closestDistance = distanceToMouse;
        }
      }

      tooltip
        .style('left', closestPoint.x + 'px')
        .style('top', closestPoint.y + 'px')
        .text(`Y: ${closestPoint.y.toFixed(2)}`);
    });

    svg.on('mouseenter', () => {
      tooltip.style('opacity', 1);
    });

    svg.on('mouseleave', () => {
      tooltip.style('opacity', 0);
    });
    
    svg.selectAll('.domain').remove();

    function distance(x1, y1, x2, y2) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }, [data, mode]);

  // return <svg ref={svgRef} />;
  return <div className="w-full" ref={svgRef} />;
};

export default Graph;

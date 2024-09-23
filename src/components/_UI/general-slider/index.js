/* eslint-disable react-hooks/exhaustive-deps */
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import './index.css';

const arrowRightBase64Encoded = `PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxNSAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0LjUgNUw3IDAuNjY5ODczTDcgOS4zMzAxM0wxNC41IDVaTTcuNzUgNC4yNUwtNi41NTY3MWUtMDggNC4yNUw2LjU1NjcxZS0wOCA1Ljc1TDcuNzUgNS43NUw3Ljc1IDQuMjVaIiBmaWxsPSIjNjE2MTYxIi8+Cjwvc3ZnPg==`

const SliderType = {
  RELATIVE_STRENGTH_INDEX: 0,
  WILLIAMS_R: 1,
  AVERAGE_DIRECTIONAL_INDEX: 2,
};

const GeneralSlider = ({ title, min = 0, max = 100, average, averageHandler, onChart = false, sliderType = null }) => {
  const svgRef = useRef();
  const xScaleRef = useRef();
  const handlerRef = useRef();

  const getWidthOfXAxis = (innerWidth, index) => {
    var result = 0;

    if (!onChart) {
      switch (index) {
        case 1: {
          result = innerWidth / 2;
          break;
        }
        default:
          result = innerWidth / 4;
      }
    } else {
      if (sliderType === SliderType.RELATIVE_STRENGTH_INDEX) {
        result = innerWidth / 3;
      } else {
        switch (index) {
          case 0: {
            result = sliderType === SliderType.AVERAGE_DIRECTIONAL_INDEX ? 0 : innerWidth / 5;
            break;
          }
          case 1: {
            result = sliderType === SliderType.AVERAGE_DIRECTIONAL_INDEX ? innerWidth / 4 : (innerWidth * 3) / 5;
            break;
          }
          case 2: {
            result = sliderType === SliderType.AVERAGE_DIRECTIONAL_INDEX ? (innerWidth * 3) / 4 : innerWidth / 5;
            break;
          }
          default:
            result = innerWidth / 5;
        }
      }
    }

    return result;
  };

  const getXAxis = (xRange) => {
    return d3.axisBottom(d3.scaleLinear([min, max], xRange)).ticks(0);
  };

  const renderSVG = () => {
    const width = svgRef.current.clientWidth;
    const innerHeight = 14;
    const marginTop = 0;
    const marginBottom = 38;
    const marginX = 12.5;
    const height = innerHeight + marginBottom + marginTop;
    const innerWidth = width - 2 * marginX;

    const xDomain = [min, max];
    const xRange = [0, innerWidth];
    const xScale = d3.scaleLinear(xDomain, xRange);
    xScaleRef.current = xScale;

    svgRef.current.innerHTML = '';
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .append('g')
      .attr('transform', `translate(${marginX}, ${marginTop})`);

    // Add axis
    const xAxis = getXAxis(xRange).tickSizeOuter(0);
    const lineHeight = 4.5;

    svg
      .append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .attr('width', innerWidth)
      .call(xAxis)
      .call((g) => {
        g.select('path.domain').remove();

        g.append('rect')
          .attr('x', 0)
          .attr('y', 9)
          .attr('width', getWidthOfXAxis(innerWidth, 0))
          .attr('height', lineHeight)
          .attr('fill', '#00C25A');

        g.append('rect')
          .attr('x', getWidthOfXAxis(innerWidth, 0))
          .attr('y', 9)
          .attr('width', getWidthOfXAxis(innerWidth, 1))
          .attr('height', lineHeight)
          .attr('fill', '#616161');

        g.append('rect')
          .attr('x', getWidthOfXAxis(innerWidth, 0) + getWidthOfXAxis(innerWidth, 1))
          .attr('y', 9)
          .attr('width', getWidthOfXAxis(innerWidth, 2))
          .attr('height', lineHeight)
          .attr('fill', onChart && sliderType === SliderType.AVERAGE_DIRECTIONAL_INDEX ? '#00C25A' : '#C20033');
      });

    const descPadding = 70;
    const leftDescPadding = 2;
    const rightDescPadding = 7;

    if (sliderType === SliderType.AVERAGE_DIRECTIONAL_INDEX) {
      // Begin description 2 (No Trend)

      const desc2 = svg.append('g').attr('transform', `translate(33.5, ${innerHeight + 27})`);

      desc2
        .append('text')
        .attr('font-size', 14)
        .attr('font-family', 'Arial')
        .attr('fill', '#616161')
        .attr('text-anchor', 'middle')
        .text('No Trend');
    } else {
      // Begin description 1 (Oversold) + desc 1 arrow

      const desc1Icon = svg
        .append('g')
        .attr('transform', `translate(${innerWidth / 2 - descPadding - leftDescPadding - 32}, ${innerHeight + 30}) rotate(180)`);

      desc1Icon.append('svg:image').attr('href', 'data:image/svg+xml;base64,' + arrowRightBase64Encoded).attr('width', 15).attr('height', 15);

      const desc1 = svg.append('g').attr('transform', `translate(${innerWidth / 2 - descPadding - leftDescPadding}, ${innerHeight + 27})`);

      desc1
        .append('text')
        .attr('font-size', 14)
        .attr('font-family', 'Arial')
        .attr('fill', '#616161')
        .attr('text-anchor', 'middle')
        .text('Oversold');
    }

    // Begin description 3 (Overbought) + desc 3 arrow

    const desc3 = svg
      .append('g')
      .attr('transform', `translate(${sliderType === SliderType.AVERAGE_DIRECTIONAL_INDEX ? (innerWidth * 4) / 5 - descPadding + 20 : innerWidth / 2 + descPadding - rightDescPadding}, ${innerHeight + 27})`)
      .attr('display', 'flex')
      .attr('flex-direction', 'row');

    desc3
      .append('text')
      .attr('font-size', 14)
      .attr('font-family', 'Arial')
      .attr('fill', '#616161')
      .attr('text-anchor', 'middle')
      .text(sliderType === SliderType.AVERAGE_DIRECTIONAL_INDEX ? 'Trend Strenght' : 'Overbought');

    const desc3Icon = svg
      .append('g')
      .attr('transform', `translate(${sliderType === SliderType.AVERAGE_DIRECTIONAL_INDEX  ? (innerWidth * 4) / 5 : innerWidth / 2 + descPadding - rightDescPadding + 40}, ${innerHeight + 25 - 10})`);

    desc3Icon.append('svg:image').attr('href', 'data:image/svg+xml;base64,' + arrowRightBase64Encoded).attr('width', 15).attr('height', 15);

    const triangleSize = 300;
    const triangle1 = d3.symbol().type(d3.symbolTriangle).size(triangleSize);

    const triangle2 = d3
      .symbol()
      .type(d3.symbolTriangle)
      .size(triangleSize - 50);

    function getTriangleColor(scaled, max) {
      if (!onChart) {
        if (scaled >= 0 && scaled <= max / 4) return '#00C25A';
        if (scaled > (max * 3) / 4) return '#C20033';
        else return '#616161';
      } else {
        switch (sliderType) {
          case SliderType.AVERAGE_DIRECTIONAL_INDEX: {
            if (scaled >= 0 && scaled <= max / 4) return '#616161';
            else return '#00C25A';
          }
          case SliderType.RELATIVE_STRENGTH_INDEX: {
            if (scaled >= 0 && scaled <= max / 3) return '#00C25A';
            if (scaled > (max * 2) / 3) return '#C20033';
            else return '#616161';
          }
          case SliderType.WILLIAMS_R: {
            if (scaled >= 0 && scaled <= max / 5) return '#00C25A';
            if (scaled > (max * 4) / 5) return '#C20033';
            else return '#616161';
          }
          default:
            return '';
        }
      }
    }

    // Add handler
    const drag = d3.drag();

    const markerY = 9;
    const handler = svg
      .append('g')
      .attr('transform', `translate(${xScale(average)}, ${markerY}) rotate(180)`)
      .attr('class', 'slider')
      .attr('id', 'handler')
      .call(drag);

    handlerRef.current = handler;

    const dragPointer = handler
      .append('path')
      .attr('d', triangle1)
      .attr('stroke', getTriangleColor(xScale(average), innerWidth))
      .attr('stroke-width', 0.75)
      .classed('drag-pointer', true);

    const pointer = handler
      .append('path')
      .attr('d', triangle2)
      .attr('fill', getTriangleColor(xScale(average), innerWidth))
      .classed('pointer', true);

    drag.on('start', function () {
      dragPointer.classed('dragging', true);
    });
    drag.on('drag', function (event, d) {
      let x = event.x;
      if (x < 0) {
        x = 0;
      } else if (x > innerWidth) {
        x = innerWidth;
      }
      handler.attr('transform', `translate(${x}, ${markerY}) rotate(180)`);
      pointer.attr('fill', getTriangleColor(x, innerWidth));
      dragPointer.attr('stroke', getTriangleColor(x, innerWidth));

      const avg = xScale.invert(x);

      if (averageHandler) {
        averageHandler(avg);
      }
    });

    drag.on('end', function () {
      dragPointer.classed('dragging', false);
    });
  };

  useEffect(() => {
    if (handlerRef.current) {
      handlerRef.current.attr('transform', `translate(${xScaleRef.current(average)},0 )`);
    }
  }, [average]);

  useEffect(() => {
    renderSVG();
  }, [average]);

  return (
    <div className="flex flex-col items-center my-1">
      <h6 className="text-lg leading-4.5 text-center text-white">{title}</h6>
      <svg ref={svgRef} />
    </div>
  );
};

export default GeneralSlider;

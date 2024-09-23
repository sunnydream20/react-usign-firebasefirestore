// import * as d3 from 'd3';
import { hierarchy, select, selectAll, treemap, treemapResquarify, zoom, zoomIdentity } from 'd3';
import { useEffect, useRef, useState } from 'react';
import dummyData from '../../../../data/dummy-treemap.json';

const determineFlatColor = (percentage) => {
  const colors = ['#E6003C', '#BF0032', '#990029', '#73001F', '#1E1E1E', '#007336', '#009948', '#00BF59', '#01E56B'];
  if (percentage < 1 && percentage > 0) return '#007336';
  if (percentage > -1 && percentage < 0) return '#73001F';
  return colors[parseInt(Math.max(-4, Math.min(percentage, 4))) + 4];
};

const fetchCompanyQuote = async () => {
  const rawData = await Promise.resolve(dummyData);
  const data = rawData.map((d) => ({
    symbol: d.symbol,
    name: d.name,
    changesPercentage: d.changesPercentage,
    price: d.price,
    marketCap: d.marketCap,
    color: determineFlatColor(d.changesPercentage),
  }));
  return data;
};

const TreemapChart = ({ setLoading }) => {
  const [data, setData] = useState(null);
  const containerRef = useRef(null);
  const transformRef = useRef(zoomIdentity);

  const updateTextVisibility = () => {
    selectAll('#treemap .node .label').style('display', (d) => {
      const rectWidth = (d.x1 - d.x0) * transformRef.current.k;
      const rectHeight = (d.y1 - d.y0) * transformRef.current.k;
      const minWidthToShowText = 50;
      const minHeightToShowText = 40;

      return rectWidth > minWidthToShowText && rectHeight > minHeightToShowText ? 'block' : 'none';
    });
  };

  const fitMargin = () => {
    selectAll('#treemap .node').style('font-size', function (d) {
      const rectWidth = d.x1 - d.x0;

      select(this)
        .select('span.ticker-price')
        .style('margin-top', `${(-4 * rectWidth) / 80}px`);

      return `${(12 * rectWidth) / 80}px`;
    });
  };

  useEffect(() => {
    if (!data) return;

    const root = treemap().size([containerRef.current.clientWidth, containerRef.current.clientHeight]).tile(treemapResquarify)(
      hierarchy({
        children: data,
      })
        .sum((d) => d.marketCap)
        .sort((a, b) => b.marketCap - a.marketCap)
    );

    select('#treemap')
      .selectAll('.node')
      .data(root.leaves())
      .join((enter) =>
        enter
          .append('div')
          .attr('class', 'node')
          .style('position', 'absolute')
          .style('display', 'flex')
          .style('justify-content', 'center')
          .style('align-items', 'center')
          .style('font-size', '12px')
          .style('border', 'solid 1px #272931')
      )
      .style('left', (d) => d.x0 + 'px')
      .style('top', (d) => d.y0 + 'px')
      .style('width', (d) => d.x1 - d.x0 + 'px')
      .style('height', (d) => d.y1 - d.y0 + 'px')
      .style('background', (d) => d.data.color)
      .selectAll('.label')
      .data((d) => [d])
      .join((enter) => enter.append('div').attr('class', 'label'))
      .selectAll('span')
      .data((d) => [
        {
          className: 'ticker-name',
          text: d.data.symbol,
          fontWeight: 'bold',
        },
        {
          className: 'ticker-price',
          text: `${d.data.changesPercentage.toFixed(2)}%`,
          fontWeight: 'normal',
        },
      ])
      .join((enter) =>
        enter
          .append('span')
          .attr('class', (d) => d.className)
          .style('display', 'block')
          .style('text-align', 'center')
          .style('font-weight', (d) => d.fontWeight)
      )
      .text((d) => d.text);

    const zoomBehavior = zoom()
      .translateExtent([
        [0, 0],
        [containerRef.current.clientWidth, containerRef.current.clientHeight],
      ])
      .scaleExtent([1, 10])
      .on('zoom', ({ transform }) => {
        select('#treemap').style('transform', `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`);
        const kChanged = transformRef.current !== transform.k;
        transformRef.current = transform;
        if (kChanged) {
          fitMargin();
          updateTextVisibility();
        }
      });

    select('#treemap-container').call(zoomBehavior);
    fitMargin();
    updateTextVisibility();
  }, [data]);

  useEffect(() => {
    function loadData() {
      setLoading(true);
      fetchCompanyQuote().then((data) => {
        setLoading(false);
        setData(data);
      });
    }
    loadData();
    const timer = setInterval(loadData, 600000);
    return () => clearInterval(timer);
  }, [setLoading]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }} ref={containerRef}>
      <div id="treemap-container" style={{ position: 'absolute', width: '315px', height: '531px' }}>
        <div id="treemap" style={{ transformOrigin: 'top left' }} />
      </div>
    </div>
  );
};

export default TreemapChart;

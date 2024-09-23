/* eslint-disable react-hooks/exhaustive-deps */
import CalHeatMap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';
import moment from 'moment/moment';
import { useEffect, useRef, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../../assets/css/scroll-bar.css';
import './style.css';

const getTableData = (data) => {
  const arr = [];
  for (const d of data) {
    const dateStr = moment(d.date * 1000).format('MMM DD');
    for (const subData of d.value) {
      const obj = {
        Date: dateStr,
        Name: subData.Name,
        Symbol: subData.Symbol,
      };
      arr.push(obj);
    }
  }

  return arr;
};

const CalendarHeatMap = ({ onCurrentYearMonth, data }) => {
  const calDomRef = useRef();
  var calRef = new CalHeatMap();
  const scrollRef = useRef();
  const [curDate, setCurDate] = useState(new Date());
  const [tableData, setTableData] = useState(null);
  const tableDataRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    if (data) {
      const arr = getTableData(data);
      setTableData(arr);
      tableDataRef.current = arr;

      calDomRef.current.innerHTML = '';
      const w = calDomRef.current.clientWidth;
      const cellPadding = 5;
      let cellSize = (w - 6 * cellPadding) / 7;
      calRef.paint({
        data: {
          source: data,
          type: 'json',
          x: ((v) => moment(v.date * 1000).format('YYYY-MM-DD')),
          y: ((v) => v.value.length)
        },
        range: 1,
        animationDuration: 0,
        domain: {
          type: 'month',
          dynamicDimension: true,
          label: {
            text: null
          }
        },
        subDomain: {
          type: 'xDay',
          label: 'DD',
          width: cellSize,
          height: cellSize,
          gutter: cellPadding,
        },
        date: {
          start: curDate,
          highlight: [selectedDate],
          locale: { weekStart: 1 }
        },
        scale: {
          color: {
            range: ['#824AF0', '#290474'],
            type: 'linear',
            domain: [1, 4],
          },
        },
      });
    }
  }, [data]);

  calRef.on('click', (event, timestamp, value) => {
    const date = moment(timestamp)
    const dateStr = date.format('MMM DD');

    let startIdx = -1;
    for (let i = 0; i < tableDataRef.current.length; i++) {
      if (tableDataRef.current[i].Date === dateStr) {
        startIdx = i;
        break;
      }
    }

    if (startIdx >= 0) {
      var scrollTop = scrollRef.current.scrollTop
      var newScrollTop = (startIdx + 1) * 25
      var i = 1
      var interval = setInterval(() => {
        scrollRef.current.scrollTop = (newScrollTop - scrollTop) * i++ / 50.0 + scrollTop;
      }, 10)
      setTimeout(() => clearInterval(interval), 500)
    }

    document.querySelector(".ch-subdomain-container").childNodes.forEach((e, i) => {
      e.querySelector('rect').classList.remove('highlight')
      if (i === date.date() - 1) e.querySelector('rect').classList.add('highlight')
    })
    setSelectedDate(date)
  });

  const onClickPrev = () => {
    let nextDate = moment(curDate).subtract(1, 'month');
    setCurDate(nextDate.toDate());
    onCurrentYearMonth(nextDate.toDate());
  };

  const onClickNext = () => {
    let nextDate = moment(curDate).add(1, 'month');
    setCurDate(nextDate.toDate());
    onCurrentYearMonth(nextDate.toDate());
  };

  const getMonth = () => {
    const monthArr = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = curDate.getMonth();
    return monthArr[month];
  };

  return (
    <div className="h-full flex flex-col font-roboto">
      <div className="flex-none">
        <div className="flex justify-between mb-[5px]">
          <button className="bg-[#404040] w-[40px] h-[40px] flex justify-center items-center" onClick={onClickPrev}>
            <svg width="22" height="27" viewBox="0 0 22 27" fill="none">
              <path d="M0.794922 13.5128L21.2565 0.855496L21.2565 26.1701L0.794922 13.5128Z" fill="black" />
            </svg>
          </button>
          <h6 className="text-[24px] leading-[40px] text-white font-roboto">{getMonth()}</h6>
          <button className="bg-[#404040] w-[40px] h-[40px] flex justify-center items-center" onClick={onClickNext}>
            <svg width="22" height="27" viewBox="0 0 22 27" fill="none">
              <path d="M21.2308 13.4872L0.769234 26.1445L0.769236 0.829886L21.2308 13.4872Z" fill="black" />
            </svg>
          </button>
        </div>
        <div id="cal-heatmap" ref={calDomRef} className="w-full"></div>
      </div>

      {tableData && (
        <div className="flex-1 overflow-hidden relative pt-2 mb-[-8px]">
          <table className="w-full text-white text-[14px]">
            <thead className="text-center">
              <tr>
                {Object.keys(tableData[0]).map((item, idx) => (
                  <th scope="col" className={`font-normal py-1 px-1 w-${idx === 1 ? "3" : "1"}/5`} key={`heat-th-key-${idx}`}>
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
          <PerfectScrollbar
            containerRef={(el) => (scrollRef.current = el)}
            options={{ suppressScrollX: true, wheelPropagation: false, swipeEasing: true }}
          >
            <table className="w-full text-white text-[14px]">
              <tbody>
                {tableData.map((item, idx) => {
                  return idx % 2 === 0 ? (
                    <tr className="bg-[#212020]" key={`heat-tr-key-${idx}`}>
                      {Object.keys(item).map((key) => (
                        <td className="py-[2px] px-[7px]" key={`td=${idx}-${key}`}>
                          {item[key]}
                        </td>
                      ))}
                    </tr>
                  ) : (
                    <tr key={`heat-tr-key-${idx}`}>
                      {Object.keys(item).map((key) => (
                        <td className="py-[2px] px-[7px]" key={`td=${idx}-${key}`}>
                          {item[key]}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </PerfectScrollbar>
        </div>
      )}
    </div>
  );
};

export default CalendarHeatMap;

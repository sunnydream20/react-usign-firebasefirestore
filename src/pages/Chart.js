import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChartMultipleItems from '../components/Charts/ChartMultipleItems.js';
import ChartFilter from '../components/Filters/ChartFilter.js';
import Layout from '../components/Layout/index.js';
import { colors } from '../components/_UI/ColorPicker.js';
import useStoredData from '../hooks/useStoredData.js';
import {
  authenticateAnonymously,
  getCompanyAnalystRating,
  getCompanyFreeCashFlowYield,
  getCompanyHistoryData,
  getCompanyInfoData,
  getCompanyStockNews,
  getCompanyTechnicalIndicators,
  getEarningsPerShare,
  getFinancialMetrics,
  getRevenueAndEarnings,
  setCompanyAnalystRating,
  setCompanyFreeCashFlowYield,
  setCompanyHistoryData,
  setCompanyInfoData,
  setCompanyStockNews,
  setCompanyTechnicalIndicators,
  setEarningPerShare,
  setFinancialMetrics,
  setRevenueAndEarnings,
} from '../services/db.service';
import axios from 'axios';
import { baseAPIUrl } from 'utils/home/defaultValue.js';

const LocalStorageKey = 'favouriteStockItems';
const LocalStorageChartKey = 'chartItems';
let apiURL = `${baseAPIUrl}/dynamicApiCall`;

function getNextQuarter(currentQuarter) {
  switch (currentQuarter) {
    case 'Q1':
      return 'Q2';
    case 'Q2':
      return 'Q3';
    case 'Q3':
      return 'Q4';
    case 'Q4':
      return 'Q1';
    default:
      return null; // Invalid input or handle other cases as needed
  }
}

const Chart = (params) => {
  const { symbol } = useParams();
  const [favoriteStockItems] = useStoredData(LocalStorageKey, []);
  const [chartItems, setChartItems] = useStoredData(LocalStorageChartKey, []);
  // const [isFiltered, setFiltered] = useState(false);
  const [companyData, setCompanyInfo] = useState({
    historyData: [],
    infoData: {},
    analystData: {},
    stockNews: [],
    technicalIndicators: {},
    freeCashFlowYield: [],
    revenueAndEarnings: {},
    earningsPerShare: {},
    financialMetrics: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  // Filter OnChange
  const handleOnFilterChange = (filters) => {
    // setFiltered(true);
    const activeSymbols = filters.filter((item) => item !== undefined).map((item) => item.symbol.toLowerCase());
    const activeFavoriteStocks = chartItems
      .filter((item) => activeSymbols.indexOf(item.symbol.toLowerCase()) > -1)
      .map((item) => {
        return {
          ...item,
          selected: filters.find((_itm) => _itm.symbol === item.symbol).selected ?? false,
          symbol: item.symbol,
          id: item.id,
          color: item.color ?? colors[Math.floor(Math.random() * 16)],
        };
      });

    // update chart series
    if (activeFavoriteStocks.length > 0) {
      // refresh filter items
      setChartItems([...activeFavoriteStocks]);
    } else {
      setChartItems([]);
    }
  };

  const loadCompanyChartInfo = (symbol) => {
    authenticateAnonymously()
      .then(async () => {
        setIsLoading(true);

        // chart data
        const { data, time } = (await getCompanyHistoryData(symbol)).data() || [];
        if (data) {
          const millisecondsSinceEpoch = time.seconds * 1000 + time.nanoseconds / 1000000;

          // Create a JavaScript Date object using the milliseconds since Unix epoch
          const data_saved_time = new Date(millisecondsSinceEpoch);

          // Get the current time
          const currentTime = new Date();

          // Calculate the difference in milliseconds
          const differenceInMilliseconds = currentTime - data_saved_time;

          // Convert milliseconds to hours
          const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

          if (differenceInHours < 24) {
            const historyData = data.map((item) => {
              return {
                time: item.date,
                value: item.close,
                open: item.open,
                high: item.high,
                low: item.low,
                close: item.close,
                volumn: item.volume,
              };
            });
            historyData.sort((prev, next) => new Date(prev.time) - new Date(next.time));
            setCompanyInfo((prev) => ({ ...prev, historyData }));

            setIsLoading(false);
            return;
          }
        }

        const response = await axios.post(apiURL, {
          endpoint: `historical-price-full/${symbol}`,
          params: '',
          version: 'v3',
        });
        const company_history = response.data;
        const historyData = company_history.historical.map((item) => {
          return {
            time: item.date,
            value: item.close,
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
            volumn: item.volume,
          };
        });
        historyData.sort((prev, next) => new Date(prev.time) - new Date(next.time));
        setCompanyInfo((prev) => ({ ...prev, historyData }));
        await setCompanyHistoryData(company_history.symbol, company_history.historical);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err, '>> error <<');
      });
  };

  const loadCompanyInfo = (symbol) => {
    authenticateAnonymously()
      .then(async () => {
        // setIsLoading(true);
        // company info
        const { data, time } = (await getCompanyInfoData(symbol)).data() || {};
        if (data) {
          const millisecondsSinceEpoch = time.seconds * 1000 + time.nanoseconds / 1000000;

          // Create a JavaScript Date object using the milliseconds since Unix epoch
          const data_saved_time = new Date(millisecondsSinceEpoch);

          // Get the current time
          const currentTime = new Date();

          // Calculate the difference in milliseconds
          const differenceInMilliseconds = currentTime - data_saved_time;

          // Convert milliseconds to hours
          const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

          if (differenceInHours < 24 * 7) {
            setCompanyInfo((prev) => ({ ...prev, infoData: data }));
            return;
          }
        }

        const response = await axios.post(apiURL, {
          endpoint: `profile/${symbol}`,
          params: '',
          version: 'v3',
        });
        const responseTTM = await axios.post(apiURL, {
          endpoint: `ratios-ttm/${symbol}`,
          params: '',
          version: 'v3',
        });

        const company_info = { ...response.data[0], ...responseTTM.data[0] };
        setCompanyInfo((prev) => ({ ...prev, infoData: company_info }));
        await setCompanyInfoData(symbol, company_info);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err, '>> error <<');
      });
  };

  const loadAnalystRating = (symbol) => {
    authenticateAnonymously()
      .then(async () => {
        // setIsLoading(true);
        // company info
        const { data, time } = (await getCompanyAnalystRating(symbol)).data() || {};
        if (data) {
          const millisecondsSinceEpoch = time.seconds * 1000 + time.nanoseconds / 1000000;

          // Create a JavaScript Date object using the milliseconds since Unix epoch
          const data_saved_time = new Date(millisecondsSinceEpoch);

          // Get the current time
          const currentTime = new Date();

          // Calculate the difference in milliseconds
          const differenceInMilliseconds = currentTime - data_saved_time;

          // Convert milliseconds to hours
          const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

          if (differenceInHours < 24) {
            setCompanyInfo((prev) => ({ ...prev, analystData: data }));
            return;
          }
        }

        const response = await axios.post(apiURL, {
          endpoint: `upgrades-downgrades-consensus`,
          params: `symbol=${symbol}`,
          version: 'v4',
        });
        const analyst_rating = response.data[0];
        setCompanyInfo((prev) => ({ ...prev, analystData: analyst_rating }));
        await setCompanyAnalystRating(symbol, analyst_rating);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err, '>> error <<');
      });
  };

  const loadCompanyStockNews = (symbol) => {
    symbol = symbol.toUpperCase();
    authenticateAnonymously()
      .then(async () => {
        // setIsLoading(true);
        // company info
        const { data, time } = (await getCompanyStockNews(symbol)).data() || {};
        if (data) {
          const millisecondsSinceEpoch = time.seconds * 1000 + time.nanoseconds / 1000000;

          // Create a JavaScript Date object using the milliseconds since Unix epoch
          const data_saved_time = new Date(millisecondsSinceEpoch);

          // Get the current time
          const currentTime = new Date();

          // Calculate the difference in milliseconds
          const differenceInMilliseconds = currentTime - data_saved_time;

          // Convert milliseconds to hours
          const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

          if (differenceInHours < 24) {
            setCompanyInfo((prev) => ({ ...prev, stockNews: data }));
            return;
          }
        }

        const response = await axios.post(apiURL, {
          endpoint: `stock_news`,
          params: `tickers=${symbol}&limit=10`,
          version: 'v3',
        });
        const stock_news = response.data;
        setCompanyInfo((prev) => ({ ...prev, stockNews: stock_news }));
        await setCompanyStockNews(symbol, stock_news);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err, '>> error <<');
      });
  };

  const loadCompanyTechIndicators = (symbol) => {
    authenticateAnonymously()
      .then(async () => {
        // setIsLoading(true);
        // company info
        const { data, time } = (await getCompanyTechnicalIndicators(symbol)).data() || {};
        if (data) {
          const millisecondsSinceEpoch = time.seconds * 1000 + time.nanoseconds / 1000000;

          // Create a JavaScript Date object using the milliseconds since Unix epoch
          const data_saved_time = new Date(millisecondsSinceEpoch);

          // Get the current time
          const currentTime = new Date();

          // Calculate the difference in milliseconds
          const differenceInMilliseconds = currentTime - data_saved_time;

          // Convert milliseconds to hours
          const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

          if (differenceInHours < 24 * 7) {
            setCompanyInfo((prev) => ({ ...prev, technicalIndicators: data }));
            return;
          }
        }

        const responseRSI = await axios.post(apiURL, {
          endpoint: `technical_indicator/1day/${symbol}`,
          params: `type=rsi&period=14`,
          version: 'v3',
        });
        const responseWIL = await axios.post(apiURL, {
          endpoint: `technical_indicator/1day/${symbol}`,
          params: `type=williams&period=14`,
          version: 'v3',
        });
        const responseADX = await axios.post(apiURL, {
          endpoint: `technical_indicator/1day/${symbol}`,
          params: `type=adx&period=14`,
          version: 'v3',
        });
        const technical_indicator = {
          rsi: responseRSI.data[0],
          williams: responseWIL.data[0],
          adx: responseADX.data[0],
        };
        setCompanyInfo((prev) => ({ ...prev, technicalIndicators: technical_indicator }));
        await setCompanyTechnicalIndicators(symbol, technical_indicator);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err, '>> error <<');
      });
  };

  const loadCompanyFreeCashYield = (symbol) => {
    authenticateAnonymously()
      .then(async () => {
        // setIsLoading(true);
        // company info
        const { data, time } = (await getCompanyFreeCashFlowYield(symbol)).data() || {};
        if (data) {
          const millisecondsSinceEpoch = time.seconds * 1000 + time.nanoseconds / 1000000;

          // Create a JavaScript Date object using the milliseconds since Unix epoch
          const data_saved_time = new Date(millisecondsSinceEpoch);

          // Get the current time
          const currentTime = new Date();

          // Calculate the difference in milliseconds
          const differenceInMilliseconds = currentTime - data_saved_time;

          // Convert milliseconds to hours
          const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

          if (differenceInHours < 24 * 7) {
            setCompanyInfo((prev) => ({ ...prev, freeCashFlowYield: data }));
            return;
          }
        }

        const response = await axios.post(apiURL, {
          endpoint: `key-metrics/${symbol}`,
          params: `limit=4&period=quarter`,
          version: 'v3',
        });
        const response2 = await axios.post(apiURL, {
          endpoint: `cash-flow-statement/${symbol}`,
          params: `limit=4&period=quarter`,
          version: 'v3',
        });
        const free_cash_yield = response.data.map((res, index) => ({ ...res, freeCashFlow: response2.data[index].freeCashFlow }));
        setCompanyInfo((prev) => ({ ...prev, freeCashFlowYield: free_cash_yield }));
        await setCompanyFreeCashFlowYield(symbol, free_cash_yield);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err, '>> error <<');
      });
  };

  const loadRevenueAndEarnings = (symbol) => {
    authenticateAnonymously()
      .then(async () => {
        // setIsLoading(true);
        // company info
        const { data, time } = (await getRevenueAndEarnings(symbol)).data() || {};
        if (data) {
          const millisecondsSinceEpoch = time.seconds * 1000 + time.nanoseconds / 1000000;

          // Create a JavaScript Date object using the milliseconds since Unix epoch
          const data_saved_time = new Date(millisecondsSinceEpoch);

          // Get the current time
          const currentTime = new Date();

          // Calculate the difference in milliseconds
          const differenceInMilliseconds = currentTime - data_saved_time;

          // Convert milliseconds to hours
          const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

          if (differenceInHours < 24 * 7) {
            setCompanyInfo((prev) => ({ ...prev, revenueAndEarnings: data }));
            return;
          }
        }

        const fy = await axios.post(apiURL, {
          endpoint: `income-statement/${symbol}`,
          params: `limit=4&period=year`,
          version: 'v3',
        });
        const quarter = await axios.post(apiURL, {
          endpoint: `income-statement/${symbol}`,
          params: `limit=4&period=quarter`,
          version: 'v3',
        });

        const rev_n_earn = {
          fy: fy.data
            .map((y) => ({
              group: y.calendarYear,
              Revenue: y.revenue,
              Earnings: y.netIncome,
            }))
            .reverse(),
          qr: quarter.data
            .map((y) => ({
              group: y.period,
              Revenue: y.revenue,
              Earnings: y.netIncome,
              calendarYear: y.calendarYear,
            }))
            .reverse(),
        };
        setCompanyInfo((prev) => ({ ...prev, revenueAndEarnings: rev_n_earn }));
        await setRevenueAndEarnings(symbol, rev_n_earn);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err, '>> error <<');
      });
  };
  const loadEarningsPerShare = (symbol) => {
    authenticateAnonymously()
      .then(async () => {
        // setIsLoading(true);
        // company info
        const { data, time } = (await getEarningsPerShare(symbol)).data() || {};
        if (data) {
          const millisecondsSinceEpoch = time.seconds * 1000 + time.nanoseconds / 1000000;

          // Create a JavaScript Date object using the milliseconds since Unix epoch
          const data_saved_time = new Date(millisecondsSinceEpoch);

          // Get the current time
          const currentTime = new Date();

          // Calculate the difference in milliseconds
          const differenceInMilliseconds = currentTime - data_saved_time;

          // Convert milliseconds to hours
          const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

          if (differenceInHours < 24 * 7) {
            setCompanyInfo((prev) => ({ ...prev, earningsPerShare: data }));
            return;
          }
        }

        const fyEPS = (
          await axios.post(apiURL, {
            endpoint: `income-statement/${symbol}`,
            params: `limit=4&period=year`,
            version: 'v3',
          })
        ).data.reverse();
        const quarterEPS = (
          await axios.post(apiURL, {
            endpoint: `income-statement/${symbol}`,
            params: `limit=4&period=quarter`,
            version: 'v3',
          })
        ).data.reverse();
        const fyEST = (
          await axios.post(apiURL, {
            endpoint: `analyst-estimates/${symbol}`,
            params: `limit=8&period=year`,
            version: 'v3',
          })
        ).data.reverse();
        const quarterEST = (
          await axios.post(apiURL, {
            endpoint: `analyst-estimates/${symbol}`,
            params: `limit=13&period=quarter`,
            version: 'v3',
          })
        ).data.reverse();
        let fy = fyEPS.map((y, index) => ({
          group: y.calendarYear,
          EPS: y.eps,
          Estimate: fyEST[index].estimatedEpsAvg,
        }));

        let qr = quarterEPS.map((q, index) => ({
          group: q.period,
          EPS: q.eps,
          Estimate: quarterEST[index].estimatedEpsAvg,
          calendarYear: q.calendarYear,
        }));
        fy.push({
          group: parseInt(fyEPS[3].calendarYear) + 1 + ' est',
          EPS: 0,
          Estimate: fyEST[4].estimatedEpsAvg,
        });
        qr.push({
          group: getNextQuarter(quarterEPS[3].period) + ' est',
          EPS: 0,
          Estimate: quarterEST[4].estimatedEpsAvg,
          calendarYear: quarterEPS[3].period === 'Q4' ? parseInt(quarterEPS[3].calendarYear) + 1 : parseInt(quarterEPS[3].calendarYear),
        });

        const earning_p_share = {
          fy,
          qr,
        };
        console.log(earning_p_share);

        setCompanyInfo((prev) => ({ ...prev, earningsPerShare: earning_p_share }));
        await setEarningPerShare(symbol, earning_p_share);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err, '>> error <<');
      });
  };

  const loadFinancialMetrics = (symbol) => {
    authenticateAnonymously()
      .then(async () => {
        // setIsLoading(true);
        // company info
        const { data, time } = (await getFinancialMetrics(symbol)).data() || {};
        if (data) {
          const millisecondsSinceEpoch = time.seconds * 1000 + time.nanoseconds / 1000000;

          // Create a JavaScript Date object using the milliseconds since Unix epoch
          const data_saved_time = new Date(millisecondsSinceEpoch);

          // Get the current time
          const currentTime = new Date();

          // Calculate the difference in milliseconds
          const differenceInMilliseconds = currentTime - data_saved_time;

          // Convert milliseconds to hours
          const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

          if (differenceInHours < 24 * 7) {
            setCompanyInfo((prev) => ({ ...prev, financialMetrics: data }));
            return;
          }
        }

        const res = await axios.post(apiURL, {
          endpoint: `ratios-ttm/${symbol}`,
          params: `limit=1`,
          version: 'v3',
        });

        setCompanyInfo((prev) => ({ ...prev, financialMetrics: res.data[0] }));
        await setFinancialMetrics(symbol, res.data[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err, '>> error <<');
      });
  };

  useEffect(() => {
    if (symbol) {
      loadCompanyChartInfo(symbol);
      loadCompanyInfo(symbol);
      loadAnalystRating(symbol);
      loadCompanyStockNews(symbol);
      loadCompanyTechIndicators(symbol);
      loadCompanyFreeCashYield(symbol);
      loadRevenueAndEarnings(symbol);
      loadFinancialMetrics(symbol);
      loadEarningsPerShare(symbol);
    }
  }, [symbol]);

  // useLayoutEffect(() => {
  //   if (!Boolean(favoriteStockItems.length)) return;

  //   let selectedItem = null;
  //   const color = colors[Math.floor(Math.random() * 16)];

  //   // detect if is navigation from Portfolio or not
  //   if (symbol && !isFiltered) {
  //     // show chart if selected item is not undefined & null
  //     selectedItem = favoriteStockItems.find(item => item.symbol === symbol);

  //     if (selectedItem) {
  //       let _chartItems = [];

  //       if (chartItems && chartItems.length > 0) {
  //         _chartItems = chartItems.map((item) => ({ ...item, selected: (item.symbol === selectedItem.symbol) }));
  //       }

  //       if ((_chartItems.length && _chartItems.findIndex(item => item.symbol === selectedItem.symbol) < 0) || _chartItems.length === 0) {
  //         _chartItems = [..._chartItems, { ...selectedItem, selected: true, color }];
  //       }

  //       if (_chartItems.length > 0 && _chartItems.length !== chartItems.length) {
  //         setChartItems([..._chartItems]);
  //       }
  //     }
  //   } else if (chartItems.length === 0 && !isFiltered) {
  //     selectedItem = favoriteStockItems[0];
  //     if (selectedItem) setChartItems([{ ...selectedItem, selected: true, color }]);
  //   }
  // }, [symbol, chartItems, setChartItems, favoriteStockItems, isFiltered]);

  return (
    <Layout>
      <div className="w-full flex flex-wrap justify-center items-center pb-20">
        <div className="chart-wrapper">
          <div className="w-full flex flex-wrap justify-center items-center">
            <ChartFilter activeOptions={chartItems} suggestedOptions={favoriteStockItems} onFilterChange={handleOnFilterChange} />
          </div>
          <div className="w-full">
            <ChartMultipleItems
              key={'multiple-items-chart'}
              chartItems={chartItems}
              chartData={companyData.historyData}
              infoData={companyData.infoData}
              analystData={companyData.analystData}
              stockNews={companyData.stockNews}
              technicalIndicators={companyData.technicalIndicators}
              freeCashFlowYield={companyData.freeCashFlowYield}
              revenueAndEarnings={companyData.revenueAndEarnings}
              financialMetrics={companyData.financialMetrics}
              earningsPerShare={companyData.earningsPerShare}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chart;

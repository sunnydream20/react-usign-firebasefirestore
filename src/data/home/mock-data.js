import Papa from 'papaparse';
import DGS1 from './data/DGS1';
import DGS10 from './data/DGS10';
import DGS2 from './data/DGS2';
import DGS20 from './data/DGS20';
import DGS30 from './data/DGS30';
import DGS3MO from './data/DGS3MO';
import DGS5 from './data/DGS5';
import DGS6MO from './data/DGS6MO';
import general_data from './data/general_data';

const LEN = { '1D': -8, '5D': -11, '1M': -22, '3M': -35, '6M': -48, '1Y': -172, '5Y': -1110, MAX: -1288 };

export const mockAPI = (mode) => {
  return general_data.slice(LEN[mode]);
};

export const Stocks = [
  {
    symbol: 'PINS',
    description: 'Pinterest. Inc',
  },
  {
    symbol: 'ZIM',
    description: 'ZIM Integrated ',
    noticed: true,
  },
  {
    symbol: 'ACNG',
    description: 'ACNB Corporation',
    noticed: true,
  },
  {
    symbol: 'GNK',
    description: 'Genco Shipping ',
    noticed: true,
  },
  {
    symbol: 'ACI',
    description: 'Albertsons Company',
    noticed: true,
  },
  {
    symbol: 'GNK',
    description: 'Genco Shipping',
  },
  {
    symbol: 'ACTDU',
    description: 'ArcLight Clean Tech',
  },
  {
    symbol: 'AA',
    description: 'Alcola Corporation',
  },
  {
    symbol: 'AAP',
    description: 'Advanced Autop',
  },
  {
    symbol: 'AATC',
    description: 'Autoscope Tech',
  },
];

export const mockAPI1 = (symbol, mode) => {
  if (symbol === 'PINS') {
    const arr = JSON.parse(JSON.stringify(general_data.slice(LEN[mode])));
    for (let i = 0; i < arr.length / 2; i++) {
      const temp = arr[i].price;
      arr[i].price = arr[arr.length - i - 1].price;
      arr[arr.length - i - 1].price = temp;
    }
    return arr;
  } else if (symbol === 'ZIM' && (mode === '5Y' || mode === 'MAX')) {
    const arr = JSON.parse(JSON.stringify(general_data.slice(LEN[mode])));
    arr[arr.length - 1].price = arr[0].price;
    return arr;
  } else {
    return JSON.parse(JSON.stringify(general_data.slice(LEN[mode])));
  }
};

export const csvFileToArray = (str) => {
  var array = str.toString().split('\n');
  //  console.log(array); here we are getting the first rows which is our header rows to convert it into keys we are logging it here
  var data = [];
  // console.log(data);
  for (const r of array) {
    // console.log(r);
    let row = r.toString().split(',');
    data.push(row);
  }
  var heading = data[0];
  // console.log(heading); to get the column headers which will act as key
  var ans_array = [];
  // console.log(ans_array);
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var obj = {};
    for (var j = 0; j < heading.length; j++) {
      if (!row[j]) {
        row[j] = 'NA';
      }
      // console.log(row[j].toString())
      obj[heading[j].replaceAll(' ', '_')] = row[j].toString().replaceAll(' ', '_');
    }
    ans_array.push(obj);
  }
  return ans_array;
};

export const mockTreasuryData = (mode, rate) => {
  let str;
  switch (rate) {
    case '3mo':
      str = DGS3MO;
      break;
    case '6mo':
      str = DGS6MO;
      break;
    case '1year':
      str = DGS1;
      break;
    case '2year':
      str = DGS2;
      break;
    case '5year':
      str = DGS5;
      break;
    case '10year':
      str = DGS10;
      break;
    case '20year':
      str = DGS20;
      break;
    case '30year':
      str = DGS30;
      break;
    default:
      str = DGS30;
      break;
  }

  let data = [];
  Papa.parse(str, {
    header: true,
    delimiter: ',',
    complete: (res) => (data = res.data),
  });

  data = data.filter((obj) => obj.perc !== '.');

  const dates = data.map((obj) => obj.date);
  const latestDate = new Date(Math.max(...dates.map((date) => new Date(date))));

  let diffDate = 360;
  switch (mode) {
    case '3M':
      diffDate = 90;
      break;
    case '6M':
      diffDate = 180;
      break;
    case '1Y':
      diffDate = 360;
      break;
    case '2Y':
      diffDate = 720;
      break;
    case '5Y':
      diffDate = 1800;
      break;
    case '10Y':
      diffDate = 3600;
      break;
    case '20Y':
      diffDate = 7200;
      break;
    default:
      diffDate = 360;
      break;
  }

  const result = data.filter((obj) => {
    return new Date(latestDate) - new Date(obj.date) <= diffDate * 24 * 60 * 60 * 1000;
  });

  return result;
};

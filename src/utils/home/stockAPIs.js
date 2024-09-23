// import { functions } from './firebase';
import axios from 'axios';
import { baseAPIUrl } from './defaultValue';
export const stockList = async () => {
  const url = `${baseAPIUrl}/stockList`;

  try {
    const ret = await axios.get(url);
    if (ret.data.success) {
      return ret.data.data;
    } else {
      throw new Error(ret.data.message);
    }
  } catch (err) {
    throw err;
  }
};

export const stockCompany = async (symbol) => {
  const url = `${baseAPIUrl}/stockCompany?symbol=${symbol}`;
  try {
    const ret = await axios.get(url);
    if (ret.data.success) {
      return ret.data.data;
    } else {
      throw new Error(ret.data.message);
    }
  } catch (err) {
    throw err;
  }
};

export const stockHistory = async (range) => {
  const url = `${baseAPIUrl}/stockHistory?range=${range}`;
  try {
    const ret = await axios.get(url);
    if (ret.data.success) {
      return ret.data.data;
    } else {
      throw new Error(ret.data.message);
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Use new API from https://financialmodelingprep.com
 * @param {*} unit
 * @param {*} unitValue
 * @param {*} stockSymbol
 * @returns
 */
export const stockMarketHistory = async (unit, unitValue, stockSymbol) => {
  let apiURL = `${baseAPIUrl}/stockWidgetAPI`;

  try {
    const headers = { project: 'finance-widget' };
    const response = await axios.post(apiURL, { stockSymbol, unit, unitValue }, { headers });
    if (response.status === 200) {
      return response.data || [];
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    throw err;
  }
};

export const generalSearch = async (search) => {
  let apiURL = `${baseAPIUrl}/dynamicApiCall`;
  try {
    // const headers = { project: 'finance-widget' };
    const response = await axios.post(apiURL, {
      endpoint: 'search',
      params: `query=${search}&limit=10`,
      version: 'v3',
    });
    if (response.status === 200) {
      return response.data || [];
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    throw err;
  }
};

export const getStockData = async (stockSymbol) => {
  let apiURL = `${baseAPIUrl}/dynamicApiCall`;

  try {
    // const response = await axios.post(apiURL, { stockSymbol }, { headers });
    const response = await axios.post(apiURL, {
      endpoint: `historical-price-full/${stockSymbol}`,
      // params: `${stockSymbol}`,
      version: 'v3',
    });
    if (response.status === 200) {
      return response.data || [];
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    throw err;
  }
};

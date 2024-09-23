import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { collection, doc, getDoc, getFirestore, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
// import dayjs from 'dayjs';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const authenticateAnonymously = () => {
  return signInAnonymously(getAuth(app));
};

export const streamStockValues = function (range, snapshot, error) {
  const itemsColRef = collection(db, 'stock-history_fmp', 'history', range); // testing
  // const itemsColRef = collection(db, 'stock-history', 'history', range);
  const itemsQuery = query(itemsColRef);
  return onSnapshot(itemsQuery, snapshot, error);
};

export const streamStockList = function (snapshot, error) {
  const docRef = doc(db, 'stock-history_fmp/list');
  // const docRef = doc(db, 'stock-history/list');
  const itemsQuery = query(docRef);
  return onSnapshot(itemsQuery, snapshot, error);
};

export const getStockList = async function () {
  const docRef = doc(db, 'stock-history_fmp/list');
  // const docRef = doc(db, 'stock-history/list');
  return await getDoc(docRef);
};

/**
 * Operations with collection category-history
 */

/**
 * @returns Promise doc data
 */
export const getCategoryList = async function () {
  const docRef = doc(db, 'category-history/list');
  return await getDoc(docRef);
};

/**
 * Return data on listen on changes
 * @param {*} range
 * @param {*} snapshot
 * @param {*} error
 * @returns
 */
export const streamCategoryHistoricalValues = function (range, snapshot, error) {
  const itemsColRef = collection(db, 'category-history', 'history', range);
  const itemsQuery = query(itemsColRef);
  return onSnapshot(itemsQuery, snapshot, error);
};

/**
 * Get snapshot data for social results
 * @param string filter
 * @param db doc snapshot
 * @param Error error
 * @returns array
 */
export const getSocialResults = function (filter, snapshot, error) {
  // const date = dayjs().format('MMDDYYYY');
  const itemsColRef = collection(db, 'social_results', filter, 'results');
  const itemsQuery = query(itemsColRef, orderBy('time', 'desc'));
  return onSnapshot(itemsQuery, snapshot, error);
};

/**
 * Return doc data and listen to the changes of the doc
 * @param {*} symbol
 * @param {*} range
 * @param {*} snapshot
 * @param {*} error
 * @returns
 */
export const streamStockSymbolHistoricalValue = (symbol, range, snapshot, error) => {
  const itemDocRef = doc(db, 'stock-history_fmp', 'history', range, symbol);
  return onSnapshot(itemDocRef, snapshot, error);
};

export const getCompanyInfoData = async (symbol) => {
  const docRef = doc(db, `company-list/${symbol.toUpperCase()}`);
  return await getDoc(docRef);
};

export const getCompanyAnalystRating = async (symbol) => {
  const docRef = doc(db, `company-analyst-rating/${symbol.toUpperCase()}`);
  return await getDoc(docRef);
};

export const getCompanyStockNews = async (symbol) => {
  const docRef = doc(db, `company-stock-news/${symbol.toUpperCase()}`);
  return await getDoc(docRef);
};

export const getCompanyTechnicalIndicators = async (symbol) => {
  const docRef = doc(db, `company-technical-indicators/${symbol.toUpperCase()}`);
  return await getDoc(docRef);
};
export const getCompanyFreeCashFlowYield = async (symbol) => {
  const docRef = doc(db, `company-free-cash-flow-yield/${symbol.toUpperCase()}`);
  return await getDoc(docRef);
};
export const getRevenueAndEarnings = async (symbol) => {
  const docRef = doc(db, `revenue-and-earnings/${symbol.toUpperCase()}`);
  return await getDoc(docRef);
};
export const getFinancialMetrics = async (symbol) => {
  const docRef = doc(db, `financial-metrics/${symbol.toUpperCase()}`);
  return await getDoc(docRef);
};
export const getEarningsPerShare = async (symbol) => {
  const docRef = doc(db, `earnings-per-share/${symbol.toUpperCase()}`);
  return await getDoc(docRef);
};
// get news from 3 rd party api
export const getFinancialNews = async () => {
  const docRef = doc(db, 'financial-news/one');
  const docSnap = await getDoc(docRef);
  console.log('++++++++++++', docSnap.data());
  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};

export const setFinancialMetrics = async (symbol, data) => {
  try {
    const docRef = doc(db, `financial-metrics/${symbol.toUpperCase()}`);
    await setDoc(
      docRef,
      {
        data,
        time: serverTimestamp(),
      },
      { merge: true }
    );

    console.log('Document written successfully !');
  } catch (error) {
    console.error('Error writing document: ', error);
  }
};
export const setEarningPerShare = async (symbol, data) => {
  try {
    const docRef = doc(db, `earnings-per-share/${symbol.toUpperCase()}`);
    await setDoc(
      docRef,
      {
        data,
        time: serverTimestamp(),
      },
      { merge: true }
    );

    console.log('Document written successfully !');
  } catch (error) {
    console.error('Error writing document: ', error);
  }
};
export const setRevenueAndEarnings = async (symbol, data) => {
  try {
    const docRef = doc(db, `revenue-and-earnings/${symbol.toUpperCase()}`);
    await setDoc(
      docRef,
      {
        data,
        time: serverTimestamp(),
      },
      { merge: true }
    );

    console.log('Document written successfully !');
  } catch (error) {
    console.error('Error writing document: ', error);
  }
};
export const setCompanyTechnicalIndicators = async (symbol, data) => {
  try {
    const docRef = doc(db, `company-technical-indicators/${symbol.toUpperCase()}`);
    await setDoc(
      docRef,
      {
        data,
        time: serverTimestamp(),
      },
      { merge: true }
    );

    console.log('Document written successfully !');
  } catch (error) {
    console.error('Error writing document: ', error);
  }
};

export const setCompanyFreeCashFlowYield = async (symbol, data) => {
  try {
    const docRef = doc(db, `company-free-cash-flow-yield/${symbol.toUpperCase()}`);
    await setDoc(
      docRef,
      {
        data,
        time: serverTimestamp(),
      },
      { merge: true }
    );

    console.log('Document written successfully !');
  } catch (error) {
    console.error('Error writing document: ', error);
  }
};

export const setCompanyInfoData = async (symbol, data) => {
  try {
    const docRef = doc(db, `company-list/${symbol.toUpperCase()}`);
    await setDoc(
      docRef,
      {
        data,
        time: serverTimestamp(),
      },
      { merge: true }
    );

    console.log('Document written successfully !');
  } catch (error) {
    console.error('Error writing document: ', error);
  }
};

export const setCompanyStockNews = async (symbol, data) => {
  try {
    const docRef = doc(db, `company-stock-news/${symbol.toUpperCase()}`);
    await setDoc(
      docRef,
      {
        data,
        time: serverTimestamp(),
      },
      { merge: true }
    );

    console.log('Document written successfully !');
  } catch (error) {
    console.error('Error writing document: ', error);
  }
};

export const setCompanyAnalystRating = async (symbol, data) => {
  try {
    const docRef = doc(db, `company-analyst-rating/${symbol.toUpperCase()}`);
    await setDoc(
      docRef,
      {
        data,
        time: serverTimestamp(),
      },
      { merge: true }
    );

    console.log('Document written successfully !');
  } catch (error) {
    console.error('Error writing document: ', error);
  }
};

export const getCompanyHistoryData = async (symbol, range = '1M') => {
  const docRef = doc(db, `company-history/${symbol.toUpperCase()}`);
  return await getDoc(docRef);
};

export const setCompanyHistoryData = async (symbol, data) => {
  try {
    const docRef = doc(db, `company-history/${symbol.toUpperCase()}`);

    await setDoc(
      docRef,
      {
        data,
        time: serverTimestamp(),
      },
      { merge: true }
    );

    console.log('Document written successfully!');
  } catch (error) {
    console.error('Error writing document: ', error);
  }
};

export const getCompanyQuote = async () => {
  const docRef = doc(db, 'company-data/quote');
  return await getDoc(docRef);
};

export const getCompanyProfile = async () => {
  const docRef = doc(db, 'company-data/profile');
  return await getDoc(docRef);
};

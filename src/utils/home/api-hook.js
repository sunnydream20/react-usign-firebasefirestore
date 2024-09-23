/* eslint-disable react-hooks/exhaustive-deps */

import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
const fetch = require('node-fetch');

const cacheTime = 60 * 60 * 1000; // 1 hour
const cacheApiConfig = {
	baseURL: null,
	cache: null,
}

const CacheApiContext = createContext(cacheApiConfig);

export const CacheApiProvider = ({ baseURL, children }) => {
	const cache = useRef({});

	return <CacheApiContext.Provider value={{ baseURL: baseURL, cache }} >{children}</CacheApiContext.Provider>;
}

const useFetch = (url) => {
	const { baseURL, cache } = useContext(CacheApiContext);
	const initialState = {
		status: 'idle',
		error: null,
		data: [],
	};

	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'FETCHING':
				return { ...initialState, status: 'fetching' };
			case 'FETCHED':
				return { ...initialState, status: 'fetched', data: action.payload };
			case 'FETCH_ERROR':
				return { ...initialState, status: 'error', error: action.payload };
			default:
				return state;
		}
	}, initialState);

	const isValidCache = (url) => {
		let isValid = false;
		if (cache.current[url]) {
			const { time } = cache.current[url];
			const ellaped = Date.now() - time;
			if (ellaped < cacheTime) {
				isValid = true;
			}
		}
		return isValid;
	}

	useEffect(() => {
		let cancelRequest = false;
		if (!url || !url.trim()) return;

		const fetchData = async () => {
			dispatch({ type: 'FETCHING' });
			if (isValidCache(url)) {
				const { data } = cache.current[url];
				dispatch({ type: 'FETCHED', payload: data });
			} else {
				try {
					let data = null;
					const ret = await fetch(`${baseURL}${url}`).then(_resp => _resp.json());
					if (ret.data.success) {
						data = ret.data.data;
					}
					else {
						throw new Error(ret.data.message);
					}
					cache.current[url] = {
						time: Date.now(),
						data
					};
					if (cancelRequest) return;
					dispatch({ type: 'FETCHED', payload: data });
				} catch (error) {
					// console.log('useHistory error =>', error);
					if (cancelRequest) return;
					dispatch({ type: 'FETCH_ERROR', payload: error.message });
				}
			}
		};

		fetchData();

		return function cleanup() {
			cancelRequest = true;
		};
	}, [url]);

	return state;
};

export default useFetch;
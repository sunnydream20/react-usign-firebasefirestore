import Datafile from '../../data/stocks.json';

const getStocks = (_, res) => res.status(200).json(Datafile)

export default getStocks;
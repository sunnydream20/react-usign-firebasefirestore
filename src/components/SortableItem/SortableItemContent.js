const SortableItemContent = ({ data }) => (
  <div
    className="flex flex-col w-full h-full overflow-hidden"
    key={data.symbol}
  >
    <div className="bg-black min-h-[300px] px-4 py-2 text-white flex flex-col gap-6">
      <div className="flex flex-col">
        <div className="flex justify-between text-sm">
          <span>Current price (delayed 15 min)</span>
          <span className="text-[#6BFCB6]">{data.currentPrice}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Security type</span>
          <span className="text-[#6BFCB6]">{data.securityType}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Ticker symbol</span>
          <span className="text-[#6BFCB6]">{data.symbol}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Price to earnings ratio</span>
          <span className="text-[#6BFCB6]">
            {data.priceToEarningRatio}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Market cap</span>
          <span className="text-[#6BFCB6]">{data.marketCap}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between text-sm">
          <span>Sector</span>
          <span className="text-[#6BFCB6]">{data.sector}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Industry</span>
          <span className="text-[#6BFCB6]">{data.industry}</span>
        </div>
      </div>
    </div>
  </div>
)
export default SortableItemContent;
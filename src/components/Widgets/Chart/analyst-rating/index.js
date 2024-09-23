import WidgetTitle from "../WidgetTitle";
import AnalystScoreScale from "./AnalystScoreScale";
import Recommendations from "./Recommendations";
import "./index.css";

const recommendData = [
  {
    label: "Strong Buy",
    value: 0,
  },
  {
    label: "Moderate Buy",
    value: 0,
  },
  {
    label: "Hold",
    value: 0,
  },
  {
    label: "Moderate Sell",
    value: 0,
  },
  {
    label: "Strong Sell",
    value: 0,
  },
];

const AnalystRating = ({ analystData }) => {
  if (analystData?.buy) {
    recommendData.map(data => {
      switch (data.label) {
        case "Strong Buy":
          data.value = analystData.strongBuy
          break
        case "Moderate Buy":
          data.value = analystData.buy
          break
        case "Hold":
          data.value = analystData.hold
          break
        case "Moderate Sell":
          data.value = analystData.sell
          break
        case "Strong Sell":
          data.value = analystData.strongSell
          break
        default:
          return ''
      }
      return ''
    })
  }
  return (
    <div className="flex flex-col items-center font-roboto w-full gap-1.5">
      <WidgetTitle
        title={"Analyst Ratings"}
      />
      <AnalystScoreScale className="font-roboto" value={4.5} max={5} />
      <h6 className="text-[17px] text-center h-[22px] text-white font-normal">
        Underlying Recommendations
      </h6>
      <div className="flex justify-center">
        <Recommendations data={recommendData} />
      </div>
    </div>
  );
};

export default AnalystRating;

import WidgetTitle from '../WidgetTitle';
import FreeCashFlowChart from './FreeCashFlowChart';


const freeCashflowGroupNames = [
  'Free Cash Flow',
  'Cash Per Share',
  // "Enterprise Value To FCF Ratio",
];

const FreeCashFlowYield = ({freeCashFlowYield}) => {
  const reversedFreeCashFlowYield = [...freeCashFlowYield].reverse();

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 w-full">
      <WidgetTitle title={'Free Cash Flow'} />
      <FreeCashFlowChart data={reversedFreeCashFlowYield} subGroupNames={freeCashflowGroupNames}/>
    </div>
  );
};

export default FreeCashFlowYield;

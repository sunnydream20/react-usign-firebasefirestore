import screenerPage from '../../../../assets/img/png/screenerpage.png';
import Box from '../../../_UI/box';

const EasyText = ({ text, widgetData }) => {
  return (
    <Box title={'Widget 9\nEasy text'} width={325} height={560} data={widgetData} noPadding={true}>
      {/* <div className="px-[17px] py-[30px] text-white text-[72px] leading-[72px] whitespace-pre-wrap ">{text}</div> */}
      <img src={screenerPage} alt="Screener Page" className='h-full' />
    </Box>
  );
};

export default EasyText;

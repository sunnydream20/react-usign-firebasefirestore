import { useState } from 'react';
import SettingsImage from '../../assets/img/svg/gear.svg';
import ChartSetting from '../Widgets/Chart/chart-setting/Modal'
import SVGRadioInput from 'components/_UI/svg-radio';


const ChartSettingPanel = ({scaleType, chartType, volumeType, toolTip, setScaleType, setChartType, setVolumeType, setToolTip }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalEvent, setModalEvent] = useState(false);

  const toggleShowModal = () => {
    if(!modalEvent) {
      setShowModal(showModal => !showModal);
    }
    setModalEvent(false);
  }

  const closeModal = (isModal) => {
    setModalEvent(true);
    setShowModal(false);
  }

  return (
    <div className='relative flex items-center mr-[7px]'>
      <button className="border-none outline-none" onClick={toggleShowModal}>
        <img src={SettingsImage} alt="" width="30px" />
      </button>
      
      <ChartSetting show={showModal} onCloseButtonClick={closeModal}>
        <div className='text-center text-xl'>
          {"Settings"}
        </div>
        <div className='pt-1'>
          <p className="text-blue-300 text-base pt-1">{"Y-Axis Scale"}</p>
          <div>
            <SVGRadioInput checked={scaleType === "Price" ? true : false} label={"Price"} clicked={() => setScaleType("Price")}/>
            <SVGRadioInput checked={scaleType !== "Price" ? true : false} label={"Percent"} clicked={() => setScaleType("Percent")}/>
          </div>
        </div>
        <div className='pt-1'>
          <p className="text-blue-300 text-base pt-1">{"Chart Type"}</p>
          <div>
            <SVGRadioInput checked={chartType === "Area" ? true : false} label={"Area"} clicked={() => setChartType("Area")}/>
            <SVGRadioInput checked={chartType !== "Area" ? true : false} label={"Candle Sticks"} clicked={() => setChartType("Candle Sticks")}/>
          </div>
        </div>
        <div className='pt-1'>
          <p className="text-blue-300 text-base pt-1">{"Volume"}</p>
          <div>
            <SVGRadioInput checked={volumeType === "On" ? true : false} label={"On"} clicked={() => setVolumeType("On")}/>
            <SVGRadioInput checked={volumeType !== "On" ? true : false} label={"Off"} clicked={() => setVolumeType("Off")}/>
          </div>
        </div>
        <div className='pt-1'>
          <p className="text-blue-300 text-base pt-1">{"Tool Tip"}</p>
          <div>
            <SVGRadioInput checked={toolTip === "On" ? true : false} label={"On"} clicked={() => setToolTip("On")}/>
            <SVGRadioInput checked={toolTip !== "On" ? true : false} label={"Off"} clicked={() => setToolTip("Off")}/>
          </div>
        </div>
      </ChartSetting>
    </div>
  );
};

export default ChartSettingPanel;

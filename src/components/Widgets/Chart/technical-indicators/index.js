import { useEffect, useState } from "react";

import GeneralSlider from '../../../_UI/general-slider';
import WidgetTitle from "../WidgetTitle";

const SliderType = {
  RELATIVE_STRENGTH_INDEX: 0,
  WILLIAMS_R: 1,
  AVERAGE_DIRECTIONAL_INDEX: 2
}

const TechnicalIndicators = ({technicalIndicators}) => {
  const [sliderRSI, setSlidersRSI] = useState(0);
  const [sliderWIL, setSliderWIL] = useState(0);
  const [sliderADX, setSliderADX] = useState(0);

  useEffect(() => {
    if(technicalIndicators.rsi) {
      setSlidersRSI(technicalIndicators.rsi.rsi);
      setSliderWIL(technicalIndicators.williams.williams);
      setSliderADX(technicalIndicators.adx.adx);
    }
  }, [technicalIndicators]);

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 w-full">
      <WidgetTitle
        title="Technical Indicators"
      />
      <div className="flex flex-col items-center justify-center gap-1 w-full">
        <GeneralSlider 
          title="Relitive Strength Index" 
          average={sliderRSI} 
          onChart={true} 
          sliderType={SliderType.RELATIVE_STRENGTH_INDEX} />
        <GeneralSlider
          title="Williams %R" 
          average={sliderWIL} 
          onChart={true} 
          sliderType={SliderType.WILLIAMS_R} />
        <GeneralSlider 
          title="Average Directional Index" 
          average={sliderADX} 
          onChart={true} 
          sliderType={SliderType.AVERAGE_DIRECTIONAL_INDEX} />
      </div>
    </div>
  );
};

export default TechnicalIndicators;

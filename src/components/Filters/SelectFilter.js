import { useState } from 'react';
import Select from 'react-select';
import CustomSelectInput from '../_UI/common/CustomSelectInput';

const SelectFilter = ({ label, options, defaultValue, handleChangeOption }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const onChangeOption = (val) => {
    setSelectedOption(val);
    handleChangeOption(val);
  };

  return (
    <div className="flex flex-wrap">
      <span className="pr-1 w-auto h-[32px] truncate">{label}</span>
      <Select
        components={{ Input: CustomSelectInput }}
        className="react-select z-[5] md:min-w-[170px] lg:min-w-[220px]"
        classNamePrefix="react-select"
        name="form-field-name"
        value={selectedOption}
        defaultValue={defaultValue}
        onChange={onChangeOption}
        options={options}
        placeholder="''"
      />
    </div>
  );
};

export default SelectFilter;
import { components } from 'react-select';
import './custom-select.css';

const CustomSelectInput = (props) => {
  const customProps = { ...props };
  delete customProps.autoCorrect;
  delete customProps.autoCapitalize;
  return <components.Input {...customProps} />;
};

export default CustomSelectInput;

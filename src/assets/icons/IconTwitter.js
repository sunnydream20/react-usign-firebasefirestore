import { ReactComponent as Logo } from '../img/svg/x-dark-logo.svg';
const IconTwitter = (props) => {
  return (
    <Logo className=" hover:bg-gray-300" style={{ width: 24, height: 24, filter: 'invert(1)', padding: 4, borderRadius: 4 }} {...props} />
  );
};

export default IconTwitter;

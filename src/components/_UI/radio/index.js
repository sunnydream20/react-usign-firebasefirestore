import './radio.css';

const RadioInput = ({ label, selected, clicked }) => {
  return (
    <div className='radio-input' onClick={() => clicked()}>
      <input name={label} checked={selected} type="radio" style={{ marginRight: "4px" }} onChange={() => {}} />
      <span>{label}</span>
    </div>
  );
};

export default RadioInput;

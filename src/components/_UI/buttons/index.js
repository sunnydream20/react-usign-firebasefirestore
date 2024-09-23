const SvgButton = ({ type, buttonClass, color = '#404040' }) => {
  // #53C76C default positive
  if (type === 'plus') {
    return (
      <svg className={buttonClass} width="23" height="23" viewBox="0 0 23 23" fill={color}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.1898 9.75154L21.1897 13.4816L13.7036 13.4817L13.7035 20.9418L9.96041 20.9419L9.96057 13.4818L2.47446 13.482L2.47454 9.75193L9.96064 9.75178L9.9608 2.29169L13.7039 2.29162L13.7037 9.7517L21.1898 9.75154Z"
        />
      </svg>
    );
  } else if (type === 'minus') {
    return (
      <svg viewBox="0 0 1024 1024" height="23" width="23" className={buttonClass} fill={'#404040'}>
        <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" />
      </svg>
    );
  } else if (type === 'check') {
    return (
      <svg viewBox="0 0 16 16" height="23" width="23" className={buttonClass} fill={'#404040'}>
        <path d="M12.736 3.97a.733.733 0 011.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 01-1.065.02L3.217 8.384a.757.757 0 010-1.06.733.733 0 011.047 0l3.052 3.093 5.4-6.425a.247.247 0 01.02-.022z" />
      </svg>
    );
  }
};

export default SvgButton;

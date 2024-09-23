import cntl from 'cntl';

const Breakpoints = ({ children, type = 'default' }) => {
  const allClasses = {
    defaultClasses: cntl`w-first md:w-second lg:w-third 2xl:w-fourth 3xl:w-fifth 4xl:w-sixth`,
    formClasses: cntl`w-first md:w-second`,
  };

  const classes = allClasses[`${type}Classes`];

  return <div className={classes}>{children}</div>;
};

export default Breakpoints;

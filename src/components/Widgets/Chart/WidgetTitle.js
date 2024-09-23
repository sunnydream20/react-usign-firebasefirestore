const WidgetTitle = ({ title }) => {
  return (
    <div
      className="flex items-center justify-center w-full h-12 -mb-2"
    >
      <h1 className="text-xl text-white leading-5 font-normal" style={{ fontFamily: 'Roboto' }}>
        {title}
      </h1>
    </div>
  );
};

export default WidgetTitle;

const CompanyDesc = ({ description, companyColor }) => {
  if (companyColor === undefined) {
    companyColor = '#299EE0';
  }

  return (
    <div className="h-58 pl-3.75 overflow-y-auto w-full">
      <p className="text-[#595959] text-base leading-[18.75px] font-normal pr-3">
        <span className="text-white truncate-multi-line">{description}</span>
      </p>
    </div>
  );
};

export default CompanyDesc;

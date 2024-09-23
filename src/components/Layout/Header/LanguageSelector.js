import { ReactComponent as ArrowDownBoldIcon } from 'assets/img/svg/arrow-down-bold.svg';

const languages = [
  {
    name: 'EN',
    value: 'english',
  },
  {
    name: 'ES',
    value: 'espanol',
  },
];

const LanguageSelector = () => (
  <div className="items-center relative flex w-32 lg:w-full">
    <select className="custom-select text-xl text-lightGrey2 w-full outline-none bg-inherit flex items-center justify-center lg:pl-1 pr-5 py-1 lg:rounded-3xl appearance-none ">
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.name}
        </option>
      ))}
    </select>
    <ArrowDownBoldIcon className="h-[13px] w-[13px] fill-lightGrey2 absolute right-0" />
  </div>
);

export default LanguageSelector;

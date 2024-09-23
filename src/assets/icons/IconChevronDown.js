const IconChevronDown = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 13 13"
      fill={props.color || "currentColor"}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.39889 7.66999L1.53473 2.80763C1.18445 2.45627 0.613889 2.45627 0.26 2.80763C-0.0866667 3.1543 -0.0866667 3.71727 0.26 4.06357L6.39889 10.1996L7.1175 9.4788L7.12111 9.47735L12.5053 4.09174C12.8664 3.72955 12.8664 3.14166 12.5053 2.77946C12.1695 2.44363 11.6242 2.44363 11.2883 2.77946L6.39889 7.66999Z"
      />
    </svg>
  );
};

export default IconChevronDown;

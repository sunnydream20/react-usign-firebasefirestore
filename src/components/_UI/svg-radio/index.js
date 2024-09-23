const SVGRadioInput = ({checked, label, clicked, style}) => {
  return (
    <div className={style} onClick={clicked} style={{cursor:"pointer"}}>
      {checked ? 
        <svg className="control_svg" width="40" height="15" style={{display:"inline", marginLeft:"-22px"}}>
          <g transform="translate(20,0)">
            <circle cx="8" cy="7.5" r="5.5" stroke="#d9d9d9" strokeWidth="4"></circle>
          </g>
        </svg>
      :
        <svg className="control_svg" width="40" height="15" style={{display:"inline", marginLeft:"-22px"}}>
          <g transform="translate(20,0)">
            <circle cx="8" cy="7.5" r="5.5" stroke="#d9d9d9" strokeWidth="4" fill="#d9d9d9"></circle>
          </g>
        </svg>
      }
      <span x="20" y="12" className="fill-current text-sm">{label}</span>
    </div>
  )
}

export default SVGRadioInput;
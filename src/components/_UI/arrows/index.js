const SvgArrow = ({ direction, color = null }) => {
  // #53C76C default positive
  if (direction === 'up') {
    return (
      <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M6 0L12 7L0 7L6 0Z" fill={color || '#00C25A'} />
      </svg>
    );
  }

  // #C63939 default negative
  if (direction === 'down') {
    return (
      <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M6 7L6.11959e-07 -1.04907e-06L12 0L6 7Z" fill={color || '#C20033'} />
      </svg>
    );
  }

  if (direction === 'equal') {
    // TODO: need svg icon from Figma
    const eqColor = color || '#7B7B7B';
    return (
      <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M6 15L6.11959e-07 8L12 8L6 15Z" fill={eqColor} />
        <path fillRule="evenodd" clipRule="evenodd" d="M6 15L6.11959e-07 8L12 8L6 15Z" fill={eqColor} />
        <path fillRule="evenodd" clipRule="evenodd" d="M6 5.24537e-07L6.11959e-07 7L12 7L6 5.24537e-07Z" fill={eqColor} />
        <path fillRule="evenodd" clipRule="evenodd" d="M6 5.24537e-07L6.11959e-07 7L12 7L6 5.24537e-07Z" fill={eqColor} />
      </svg>
    )
  }

  if (direction === 'right') {
    return (
      <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 5L7 0.669873L7 9.33013L14.5 5ZM7.75 4.25L-6.55671e-08 4.25L6.55671e-08 5.75L7.75 5.75L7.75 4.25Z" fill="#616161" />
      </svg>
    );
  }
}
export default SvgArrow;
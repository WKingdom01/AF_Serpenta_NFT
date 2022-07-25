import { useState } from 'react';

const StageText = ({ text }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`stage-text ${open ? 'stage-text--open' : ''}`}
      onClick={() => setOpen(!open)}
    >
      <div className="stage-text__header"></div>
      <div className="stage-text__body">{text}</div>
    </div>
  );
};

export default StageText;

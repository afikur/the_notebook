import React from 'react';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';


const CollapseCheckboxTitle = ({open, title, toggleOpen}) => {
  return (
    <div
      onClick={toggleOpen}
      style={{
        height: '50px',
        borderBottom: '2px solid #2196f3',
        textTransform: 'uppercase',
        padding: '',
        lineHeight: '50px',
        position: 'relative',
        cursor: 'pointer'
      }}
    >
      <span style={{fontWeight: 'bold'}}>{title}</span>
      <span style={{position: 'absolute', right: '15px', top: '7px'}}>
        {open ? <KeyboardArrowUp/> : <KeyboardArrowDown />}
      </span>
    </div>
  );
};

export default CollapseCheckboxTitle;

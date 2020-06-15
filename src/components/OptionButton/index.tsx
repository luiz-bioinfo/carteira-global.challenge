import React from 'react';
import './styles.css';

interface Props {
  active?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
}

const OptionButton:React.FC<Props> = props => {
  return (
    <button
      className={
        [
          'optionButton',
          props.active ? 'active' : '_no_active',
          props.hoverEffect ? 'hoverEffect' : '_no_hoverEffect'
        ].join(' ').trim()
      }
      onClick={ props.onClick || (() => {}) }
    >
      {
        props.children
      }
    </button>
  );
};

export default OptionButton;
import React from 'react'
import './Button.css'

const STYLES = [
  // 'btn--primary--solid',
  // 'btn--warning--solid',
  // 'btn--danger--solid',
  // 'btn--success--solid',
  // 'btn--primary--outline',
  // 'btn--warning--outline',
  // 'btn--danger--outline',
  // 'btn--success--outline',
  // 'btn--disabled--outline',
  // 'btn--brown--solid',
  // 'btn--brown--solid--disabled',
  'stamp',
  'edit-stamp',
  'share-stamp',
  'system',
  'system-disabled'
]

// const SIZES = ['btn--small','btn--medium', 'btn--large']

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  // buttonSize,
  onMouseOver,
  
  
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0]

  // const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

  return (
    <button
      // className={`btn ${checkButtonStyle} ${checkButtonSize} `}
      className={`btn ${checkButtonStyle}`}
      onClick={onClick}
      type={type}
      onMouseOver={onMouseOver}
      
    >
      {children}
    </button>
  )
}

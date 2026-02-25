import React from 'react'

interface SyriaFlagProps {
  size?: number
  className?: string
}

/**
 * New Syrian flag (independence/revolution flag adopted after the fall of the Assad regime in 2024).
 * Green-white-black horizontal tricolor with three red five-pointed stars in the center stripe.
 */
const SyriaFlag: React.FC<SyriaFlagProps> = ({ size = 24, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 600"
      width={size}
      height={(size * 2) / 3}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
      role="img"
      aria-label="Flag of Syria"
    >
      <path d="M0 0h900v600H0z" />
      <path d="M0 0h900v400H0z" fill="#fff" />
      <path d="M0 0h900v200H0z" fill="#007a3d" />
      <path
        d="m176.26 375 48.738-150 48.738 150-127.6-92.705h157.72m322.4 92.705 48.738-150 48.738 150-127.6-92.705h157.72m-352.6 92.705 48.738-150 48.738 150-127.6-92.705h157.72"
        fill="#ce1126"
      />
    </svg>
  )
}

export default SyriaFlag

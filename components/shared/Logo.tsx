import React from 'react'

export default function Logo(props) {
  return (
    <svg
      viewBox="0 0 399 106"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      style={{
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        strokeLinejoin: 'round',
        strokeMiterlimit: 2,
      }}
      {...props}
    >
      <g id="Layer-1">
        <path
          d="M60.416,0.135l-60.417,105.73l120.833,-0l-60.416,-105.73Z"
          style={{ fillRule: 'nonzero' }}
        />
        <path
          d="M286.978,105.865l60.417,-105.73l-120.834,0l60.417,105.73Z"
          style={{ fillRule: 'nonzero' }}
        />
        <path
          d="M135.936,0.135l0,105.73l121.673,-0l-121.673,-105.73Z"
          style={{ fillRule: 'nonzero' }}
        />
        <rect x="362.499" y="0.135" width="36.502" height="105.729" />
      </g>
    </svg>
  )
}

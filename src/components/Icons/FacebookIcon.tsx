import React from 'react'

export const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
    color = '#737373',
}) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_112_570)">
            <path
                d="M16 8.04902C16 3.60302 12.418 -0.000976562 8 -0.000976562C3.58 2.34375e-05 -0.0019989 3.60302 -0.0019989 8.05002C-0.0019989 12.067 2.924 15.397 6.748 16.001V10.376H4.718V8.05002H6.75V6.27502C6.75 4.25802 7.945 3.14402 9.772 3.14402C10.648 3.14402 11.563 3.30102 11.563 3.30102V5.28102H10.554C9.561 5.28102 9.251 5.90202 9.251 6.53902V8.04902H11.469L11.115 10.375H9.25V16C13.074 15.396 16 12.066 16 8.04902Z"
                fill={color}
            />
        </g>
        <defs>
            <clipPath id="clip0_112_570">
                <rect width="16" height="16" fill="white" />
            </clipPath>
        </defs>
    </svg>
)
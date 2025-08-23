import type { FC, SVGProps } from 'react';

const Css3Logo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    {...props}
  >
    <path fill="#663399" d="M266.3,23.3l-34.4,34.4H57.2l34.4-34.4H266.3 M277.4-0.1H57.2c-9.5,0-17.2,7.7-17.2,17.2v209.1c0,9.5,7.7,17.2,17.2,17.2h174.7l46.6,46.6l46.6-46.6h127.7c9.5,0,17.2-7.7,17.2-17.2V17.2c0-9.5-7.7-17.2-17.2-17.2H277.4z"/>
    <path fill="#FFFFFF" d="M129.4,345.5h-31l-8.6,42.9h-40l42.9-195.4h42.9l42.9,195.4h-40L129.4,345.5z M120.8,319.9l-11.5-57.2l-11.5,57.2H120.8z"/>
    <path fill="#FFFFFF" d="M260.6,378.3h-40L209,192.9h40L260.6,378.3z"/>
    <path fill="#FFFFFF" d="M388.9,235.8h-51.5v28.5h48.5v34.2h-48.5v35.6h51.5v28.5h-85.8V192.9h85.8V235.8z"/>
  </svg>
);

export default Css3Logo;

import type { FC, SVGProps } from 'react';

const Css3Logo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-full h-full text-foreground"
    {...props}
  >
    <path
      fill="currentColor"
      d="M1.3,0L3,21.6,12,24l9-2.4L22.7,0ZM19.4,7.7,18.8,14,12,16.1v.1l-.01,0-6.8-2.1L4.7,8.3h9.4l.2-2.3H4.3l.4-4.5H20.4Z"
    />
  </svg>
);

export default Css3Logo;

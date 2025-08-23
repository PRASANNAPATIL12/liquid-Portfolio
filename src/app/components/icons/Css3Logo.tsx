import type { FC, SVGProps } from 'react';

const Css3Logo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 360"
    {...props}
  >
    <path d="M255.424 319.112L229.76 0H25.664l25.664 319.112L127.712 360l77.712-40.888z" fill="#1572B6"/>
    <path d="M127.872 333.944l60.288-31.952 21.6-268.4H128v300.304z" fill="#33A9DC"/>
    <path d="M85.056 123.672h72.288l-5.12 56.48-5.728 63.648-52.608 15.68h-.128l-52.672-15.68-3.456-38.496h31.36l1.792 19.968 21.568 6.4 21.504-6.4 2.24-25.152H55.456l-9.024-100.096h99.968l-1.024-11.2H42.752l-9.024-100.16h136.64l-5.056 56.544H85.056z" fill="#EBEBEB"/>
  </svg>
);

export default Css3Logo;

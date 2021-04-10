import { SVGProps } from 'react';

const IdentityIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    {...props}
  >
    <circle
      cx={16}
      cy={10}
      r={6}
      stroke="#172239"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <path
      clipRule="evenodd"
      d="M7 23.997a3.219 3.219 0 01.261-1.286c.544-1.213 2.077-1.856 3.35-2.147a18.026 18.026 0 012.784-.437c1.733-.17 3.476-.17 5.21 0 .936.074 1.866.22 2.784.437 1.272.291 2.806.873 3.35 2.147a3.323 3.323 0 010 2.583c-.544 1.274-2.078 1.856-3.35 2.135a16.87 16.87 0 01-2.784.449c-1.411.133-2.828.157-4.242.073-.326 0-.642 0-.968-.073a16.55 16.55 0 01-2.773-.45c-1.284-.278-2.806-.86-3.361-2.134A3.314 3.314 0 017 23.997z"
      stroke="#172239"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

export default IdentityIcon;

import React, { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export const ChevronIcon = ({ ...props }: Props) => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

export const MailIcon = ({ ...props }: Props) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M30 13.743c0 .524-.428.95-.955.95l-.012-.024a.958.958 0 01-.676-.278.948.948 0 01-.28-.672v-1.925c-.032-3.235-2.66-5.849-5.91-5.881H10.833c-3.251.032-5.879 2.646-5.911 5.881v8.412c.032 3.235 2.66 5.849 5.91 5.881h11.333c3.251-.032 5.879-2.646 5.911-5.881a.966.966 0 01.962-.856c.492 0 .906.369.961.856-.013 4.3-3.513 7.781-7.834 7.794H10.834C6.51 27.994 3.007 24.508 3 20.206v-8.412C3 7.49 6.507 4 10.834 4h11.332c4.321.013 7.82 3.495 7.834 7.794v1.949zM17.497 15.81l5.553-4.42h.012a.97.97 0 011.35.143.947.947 0 01-.156 1.342l-5.553 4.432a3.872 3.872 0 01-4.836 0l-5.565-4.432a.959.959 0 01-.143-1.342.944.944 0 011.337-.143l5.613 4.42a1.942 1.942 0 002.388 0z"
      fill="#161616"
      strokeWidth={2}
    />
  </svg>
);

export const LockIcon = ({ ...props }: Props) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.304 16.472A4 4 0 0116 14a3.99 3.99 0 014 3.99 4 4 0 11-7.696-1.518zM13.872 18a2.128 2.128 0 104.256 0 2.128 2.128 0 00-4.256 0z"
      fill="#161616"
    />
    <path
      d="M12 7V5.667A2.667 2.667 0 0114.667 3h2.666A2.667 2.667 0 0120 5.667V7"
      stroke="#161616"
      strokeWidth={2}
    />
    <path
      d="M27.15 16.693c.47 0 .85-.426.85-.95v-1.949c-.012-4.3-3.122-7.781-6.963-7.794H10.963C7.118 6 4 9.49 4 13.794v8.412c.006 4.302 3.12 7.788 6.963 7.794h10.074c3.84-.013 6.951-3.495 6.963-7.794-.049-.487-.416-.856-.855-.856-.437 0-.805.369-.854.856-.029 3.235-2.364 5.849-5.254 5.881H10.963c-2.89-.032-5.225-2.646-5.254-5.881v-8.412c.029-3.235 2.364-5.849 5.254-5.881h10.074c2.89.032 5.225 2.646 5.254 5.881v1.925c0 .252.09.494.249.672.159.178.375.278.6.278l.01.024z"
      fill="#161616"
    />
  </svg>
);

export const IdentityIcon = ({ ...props }: Props) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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

export const LoadingIcon = ({ ...props }: Props) => (
  <svg
    className="animate-spin h-5 w-5 mr-2 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

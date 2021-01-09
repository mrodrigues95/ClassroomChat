import React, { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export const ChevronIcon = ({ ...props }: Props) => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
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
    aria-hidden="true"
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
    aria-hidden="true"
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
    aria-hidden="true"
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
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
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

export const ErrorIcon = ({ ...props }: Props) => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const HomeIcon = ({ ...props }: Props) => (
  <svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M14.829 26.077H9.866c-1.608-.006-2.912-1.275-2.924-2.846v-9.646a1.766 1.766 0 01.658-1.36l.874-.632a.932.932 0 00.077-1.207.985.985 0 00-1.199-.3l-.895.653A3.64 3.64 0 005 13.585v9.656c.006 2.623 2.181 4.748 4.866 4.754h4.963a.96.96 0 00.971-.948.96.96 0 00-.971-.95v-.02z"
      fill="currentColor"
    />
    <path
      d="M27.8 13.603a3.696 3.696 0 00-1.376-2.841l-7.26-5.799a4.354 4.354 0 00-5.462 0l-2.3 1.674a.966.966 0 00-.221 1.347.962.962 0 001.345.22l2.332-1.746a2.476 2.476 0 013.151 0l7.26 5.798c.417.332.664.834.672 1.368v9.64c0 1.57-1.27 2.842-2.837 2.842h-2.153a.4.4 0 01-.4-.4V21.36a2.513 2.513 0 00-2.5-2.516H14.9a2.509 2.509 0 00-2.51 2.515v1.663a.946.946 0 101.89 0V21.36a.61.61 0 01.61-.621h3.15a.61.61 0 01.61.61v4.357A2.303 2.303 0 0020.95 28h2.102a4.742 4.742 0 004.738-4.746l.01-9.65z"
      fill="currentColor"
    />
  </svg>
);

export const MessagesIcon = ({ ...props }: Props) => (
  <svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.009 3c2.103 0 4.198.519 6.06 1.5 6.337 3.344 8.774 11.221 5.433 17.561A13.036 13.036 0 0115.994 29a12.9 12.9 0 01-2.792-.306.975.975 0 01-.74-1.161.975.975 0 011.162-.74c4.842 1.077 9.84-1.247 12.156-5.64 2.841-5.39.77-12.088-4.62-14.93a11.081 11.081 0 00-5.152-1.276h-.013c-6.092 0-11.049 4.958-11.049 11.051a11.045 11.045 0 001.252 5.113l.25.487c.305.573.372 1.284.174 1.928a22.256 22.256 0 00-.689 2.122c.73-.22 1.622-.544 2.267-.779l.264-.095a.973.973 0 01.662 1.83l-.261.095-.044.016c-.96.348-2.252.816-3.13 1.013a1 1 0 01-.23.024c-.598 0-.962-.242-1.163-.446-.308-.312-.454-.751-.437-1.303a.997.997 0 01.025-.191c.231-.985.532-1.968.897-2.92a.61.61 0 00-.065-.401l-.25-.487c-.96-1.84-1.47-3.92-1.468-6.007C3 8.83 8.83 3 15.994 3h.015zM8.725 15.999a1.547 1.547 0 013.09 0 1.546 1.546 0 01-3.09 0zm8.815 0c0-.853-.693-1.547-1.546-1.547-.853 0-1.545.694-1.545 1.546 0 .852.692 1.546 1.545 1.546s1.546-.694 1.546-1.546zm4.178-1.547c.853 0 1.546.694 1.546 1.546 0 .852-.693 1.546-1.546 1.546a1.547 1.547 0 01-1.545-1.546c0-.852.693-1.546 1.546-1.546z"
      fill="currentColor"
    />
  </svg>
);

export const ClassroomsIcon = ({ ...props }: Props) => (
  <svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M20.687 4h-8.19C9.12 4 7 6.383 7 10.207v15.78C7 27.1 7.87 28 8.945 28c.325 0 .645-.084.932-.244l6.664-3.738 7.76 3.76c.21.091.447.092.658.003a.875.875 0 00.468-.48.915.915 0 00-.379-1.06l-7.709-3.727a1.63 1.63 0 00-1.617 0l-6.675 3.728a.248.248 0 01-.245 0 .257.257 0 01-.113-.223V10.207c.01-2.828 1.382-4.438 3.839-4.438h8.19c3.153 0 3.613 2.648 3.613 4.236v.72h-8.865a.838.838 0 00-.592.28.897.897 0 00-.227.631c.01.464.371.837.82.848H24.3v9.267c0 .486.38.88.85.88.465 0 .843-.388.849-.87V10.006C26 6.298 23.973 4 20.687 4z"
      fill="currentColor"
    />
  </svg>
);

export const CalenderIcon = ({ ...props }: Props) => (
  <svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.52 4H21.48C25.626 4 29 7.493 29 11.788v9.424C29 25.507 25.626 29 21.479 29c-.479 0-.867-.402-.867-.898 0-.495.388-.897.867-.897 3.191 0 5.788-2.688 5.788-5.993v-7.521h-4.269c-1.402.001-2.545 1.183-2.546 2.636.001 1.453 1.144 2.635 2.546 2.636h1.774c.478 0 .867.402.867.898 0 .495-.389.897-.867.897h-1.774c-2.358 0-4.278-1.988-4.279-4.43.001-2.443 1.92-4.431 4.279-4.432h4.269v-.108c0-3.305-2.597-5.993-5.788-5.993H10.52c-2.572 0-4.73 1.757-5.483 4.163h11.424c.479 0 .867.402.867.898s-.389.897-.867.897H4.737l-.002.018-.002.017v9.424c0 3.305 2.596 5.993 5.787 5.993h5.514c.478 0 .866.402.866.898 0 .495-.388.897-.866.897H10.52C6.373 29 3 25.507 3 21.212v-9.424C3 7.493 6.373 4 10.52 4zm11.8 12.246c0-.495.387-.897.866-.897h.394c.478 0 .867.402.867.897 0 .496-.389.898-.867.898h-.394c-.479 0-.867-.402-.867-.898z"
      fill="currentColor"
    />
  </svg>
);

export const SearchIcon = ({ ...props }: Props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M19.756 18.607l-3.438-3.361-.08-.123a.806.806 0 00-1.137 0c-2.921 2.68-7.423 2.826-10.519.34C1.486 12.979.756 8.634 2.876 5.31 4.996 1.987 9.308.717 12.953 2.342c3.645 1.625 5.49 5.642 4.314 9.386a.78.78 0 00.182.771.821.821 0 00.774.232.803.803 0 00.593-.54c1.406-4.442-.718-9.223-5-11.25C9.534-1.085 4.381.251 1.69 4.085-1.003 7.92-.425 13.102 3.05 16.28c3.474 3.178 8.8 3.397 12.535.516l3.044 2.975a.819.819 0 001.137 0 .784.784 0 000-1.12l-.01-.043z"
      fill="#161616"
    />
  </svg>
);

export const NotificationsIcon = ({ ...props }: Props) => (
  <svg
    width={17}
    height={20}
    viewBox="0 0 17 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.326 9.262c.406.609.639 1.313.674 2.04l-.027.184a4.106 4.106 0 01-.94 2.74 4.895 4.895 0 01-3.123 1.532 40.862 40.862 0 01-8.872 0 4.84 4.84 0 01-3.07-1.532 4.046 4.046 0 01-.967-2.722v-.123c.049-.749.3-1.471.728-2.092l.07-.088c.445-.498.751-1.101.888-1.75V5.646a.764.764 0 01.793-.474.759.759 0 01.67.631v1.804a.45.45 0 010 .096 5.227 5.227 0 01-1.224 2.434 2.506 2.506 0 00-.39 1.243v.193c-.02.62.188 1.226.586 1.707.55.561 1.287.91 2.076.98 2.854.307 5.734.307 8.588 0a3.335 3.335 0 002.12-1.024c.378-.47.576-1.055.56-1.655v-.2a2.601 2.601 0 00-.382-1.253 5.23 5.23 0 01-1.296-2.434.456.456 0 010-.096V5.787c-.257-2.644-2.927-4.281-5.252-4.281a5.782 5.782 0 00-2.821.726.772.772 0 01-.777.006.75.75 0 01-.38-.668.752.752 0 01.412-.65A7.279 7.279 0 018.465 0c3.07 0 6.512 2.154 6.902 5.612v1.803c.134.651.44 1.255.888 1.751.026.03.05.062.07.096zm-7.527 9.169a2.016 2.016 0 001.32-.78h.01a.789.789 0 011.093-.102c.33.268.377.746.103 1.07A3.629 3.629 0 018.5 20a3.629 3.629 0 01-2.817-1.381.748.748 0 01.103-1.07.789.789 0 011.094.102 2.042 2.042 0 001.92.78z"
      fill="#161616"
    />
  </svg>
);

export const DotsVerticalIcon = ({ ...props }: Props) => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
    />
  </svg>
);

export const AttachmentsIcon = ({ ...props }: Props) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.565 3h9.859C25.53 3 27.989 5.537 28 9.773v12.454C28 26.463 25.552 29 21.435 29h-3.65a.942.942 0 01-.822-.947c0-.486.354-.894.822-.947h3.639c3.138 0 4.718-1.642 4.718-4.879V9.773c0-3.237-1.58-4.879-4.718-4.879h-9.859c-3.138 0-4.729 1.642-4.729 4.879v12.454c0 3.238 1.591 4.879 4.73 4.879a.942.942 0 01.821.947.942.942 0 01-.822.947C7.46 29 5 26.463 5 22.227V9.773C5 5.525 7.46 3 11.565 3zm.323 8.449h3.505a.943.943 0 00.822-.947.943.943 0 00-.822-.947h-3.505a.943.943 0 00-.823.947c0 .485.355.893.823.947zm9.202 5.498h-9.213a.942.942 0 01-.823-.947c0-.486.355-.894.823-.947h9.213a.914.914 0 01.884.44.979.979 0 010 1.013.914.914 0 01-.884.441zm0 5.498h-9.213c-.504 0-.913-.421-.913-.94 0-.52.409-.942.913-.942h9.213c.504 0 .912.421.912.941s-.408.941-.912.941z"
      fill="#161616"
    />
  </svg>
);

export const SettingsIcon = ({ ...props }: Props) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.476 9.337a3.602 3.602 0 01-3.487-.023l-.047-.045a.975.975 0 01-.332-1.37c.301-.467.937-.61 1.42-.32.217.121.46.188.71.194.384.015.758-.117 1.04-.367.281-.25.448-.6.464-.969-.008-1.857 1.52-3.381 3.444-3.437h1.621c1.961 0 3.55 1.534 3.55 3.426-.002.24.063.477.19.685.189.32.502.555.871.652.37.097.763.047 1.094-.138 1.666-.876 3.75-.332 4.734 1.233a.997.997 0 01-.379 1.358 1.063 1.063 0 01-1.408-.353c-.401-.66-1.278-.884-1.965-.503a3.664 3.664 0 01-3.479-.037c-1.073-.597-1.746-1.69-1.776-2.886a1.355 1.355 0 00-.402-1.007c-.27-.269-.642-.42-1.03-.42h-1.621c-.39 0-.762.151-1.034.42-.272.268-.42.632-.41 1.007-.011 1.202-.685 2.307-1.768 2.9zm1.768 16.272c.006.765.651 1.381 1.444 1.381l-.012.023c.368 0 .708.19.892.497a.963.963 0 010 .993 1.037 1.037 0 01-.892.497c-1.96 0-3.55-1.534-3.55-3.426a1.279 1.279 0 00-.19-.685c-.397-.663-1.275-.892-1.965-.514-1.666.876-3.75.332-4.734-1.233l-.804-1.358c-.907-1.608-.344-3.62 1.278-4.568.215-.122.394-.295.52-.502.238-.32.323-.721.235-1.105a1.387 1.387 0 00-.696-.905c-1.622-.949-2.185-2.96-1.278-4.567.152-.22.388-.373.657-.425a1.06 1.06 0 01.775.15.96.96 0 01.296 1.325c-.392.662-.154 1.506.532 1.884.516.305.94.734 1.231 1.245.907 1.607.344 3.619-1.278 4.567-.686.379-.924 1.222-.533 1.884l.817 1.359c.186.324.5.56.871.655.371.095.766.04 1.094-.152a3.517 3.517 0 011.74-.446c1.96 0 3.55 1.534 3.55 3.426zm13.03-8.404a1.39 1.39 0 01-.669-.843 1.34 1.34 0 01.149-1.053c.126-.207.305-.38.52-.502a.974.974 0 00.355-1.359 1.075 1.075 0 00-1.396-.377c-1.622.949-2.185 2.96-1.278 4.568a3.36 3.36 0 001.29 1.358c.33.182.57.483.668.837.098.354.045.732-.148 1.047l-.804 1.36a1.474 1.474 0 01-.876.65 1.453 1.453 0 01-1.089-.148 3.663 3.663 0 00-3.484.04c-1.074.6-1.745 1.697-1.77 2.894.056.51.503.898 1.035.898.532 0 .979-.387 1.035-.898-.01-.499.263-.963.71-1.213a1.465 1.465 0 011.444.014c1.666.875 3.751.332 4.734-1.233l.805-1.359c.994-1.621.444-3.713-1.23-4.681zm-10.781-5.493c-1.801 0-3.425 1.048-4.113 2.653-.688 1.606-.305 3.454.97 4.68 1.275 1.228 3.191 1.592 4.854.924 1.662-.668 2.743-2.237 2.739-3.975 0-1.137-.47-2.228-1.305-3.032a4.523 4.523 0 00-3.145-1.25zm0 6.577c-1.308 0-2.367-1.022-2.367-2.283 0-1.262 1.06-2.284 2.367-2.284s2.367 1.022 2.367 2.284c0 1.261-1.06 2.283-2.367 2.283z"
      fill="#161616"
    />
  </svg>
);

export const EmojiHappyIcon = ({ ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const PaperClipIcon = ({ ...props }: Props) => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
    />
  </svg>
);

export const HamburgerMenuIcon = ({ ...props }: Props) => (
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
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

export const PlusCircleIcon = ({ ...props }: Props) => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const LogoutIcon = ({ ...props }: Props) => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

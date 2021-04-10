import { forwardRef, InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(({ ...props }, ref) => {
  return (
    <input
      className="inline-flex w-full pr-2 pl-12 h-12 border border-gray-300 rounded-2xl text-black text-sm items-center transition ease-in-out duration-300 focus:outline-none focus:shadow-outline"
      ref={ref}
      {...props}
    />
  );
});

export default Input;

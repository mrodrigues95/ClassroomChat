import React, { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ ...props }: Props) => {
  return (
    <button
      type="button"
      className="w-full p-4 bg-blue-800 text-white rounded-3xl"
      {...props}
    />
  );
};

export default Button;

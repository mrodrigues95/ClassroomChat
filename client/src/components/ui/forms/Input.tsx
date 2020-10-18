import React, { InputHTMLAttributes } from 'react';
import FormItem from './FormItem';

type Props = {
  label: string;
  action?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, action, ...props }: Props) => {
  return (
    <FormItem label={label} action={action}>
      <input
        className="block w-full p-2 border border-gray-200 rounded-3xl text-3xl transition ease-in-out duration-300 focus:outline-none focus:shadow-outline"
        {...props}
      />
    </FormItem>
  );
};

export default Input;

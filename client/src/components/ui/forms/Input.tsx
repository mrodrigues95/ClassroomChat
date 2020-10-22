import React, { InputHTMLAttributes, useState } from 'react';
import clsx from 'clsx';
import FormItem from './FormItem';

type Props = {
  label: string;
  action?: string;
  children?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, action, children, ...props }: Props) => {
  const [fontWeight, setFontWeight] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setFontWeight('font-bold');
    } else {
      setFontWeight('font-normal');
    }
  };

  return (
    <FormItem label={label} action={action}>
      {children}
      <input
        className={clsx(
          'block w-full py-2 pr-2 pl-16 h-16 border border-gray-300 rounded-2xl text-xl text-black transition ease-in-out duration-300 focus:outline-none focus:shadow-outline',
          fontWeight
        )}
        onChange={(e) => handleOnChange(e)}
        {...props}
      />
    </FormItem>
  );
};

export default Input;

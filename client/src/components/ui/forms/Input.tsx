import React, { InputHTMLAttributes, useState } from 'react';
import clsx from 'clsx';
import FormItem from './FormItem';
import { useFormContext, ValidationRules } from 'react-hook-form';
import getErrorMessage from './../utils/getErrorMessage';

type Props = {
  label: string;
  altLabel?: string;
  validation?: ValidationRules;
  children?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, altLabel, validation, children, ...props }: Props) => {
  const form = useFormContext();
  const [fontWeight, setFontWeight] = useState('');
  const error = getErrorMessage(props.name, form.errors);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setFontWeight('font-bold');
    } else {
      setFontWeight('font-normal');
    }
  };

  return (
    <FormItem label={label} altLabel={altLabel} error={error}>
      {children}
      <input
        className={clsx(
          'block w-full py-2 pr-2 pl-16 h-16 border border-gray-300 rounded-2xl text-black md:text-xl transition ease-in-out duration-300 focus:outline-none focus:shadow-outline',
          fontWeight
        )}
        ref={validation ? form.register(validation) : form.register}
        onChange={(e) => handleOnChange(e)}
        {...props}
      />
    </FormItem>
  );
};

export default Input;

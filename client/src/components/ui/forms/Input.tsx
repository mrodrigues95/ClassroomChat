import React, { InputHTMLAttributes, useState } from 'react';
import clsx from 'clsx';
import FormItem from './FormItem';
import { useFormContext, ValidationRules } from 'react-hook-form';
import getElementError from './../utils/getElementError';
import {
  RegistrationError,
  FormError,
  LoginError,
} from '../../../shared/constants/validation';

type Props = {
  label: string;
  altLabel?: string;
  error?: LoginError | FormError | RegistrationError;
  validation?: ValidationRules;
  children?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  label,
  altLabel,
  error,
  validation,
  children,
  ...props
}: Props) => {
  const form = useFormContext();
  const [fontWeight, setFontWeight] = useState('');
  const errorMessage = getElementError({
    name: props.name,
    error: error,
    errors: form.errors,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setFontWeight('font-bold');
    } else {
      setFontWeight('font-normal');
    }
  };

  return (
    <FormItem label={label} altLabel={altLabel} errorMessage={errorMessage}>
      {children}
      <input
        className={clsx(
          'block w-full py-2 pr-2 pl-16 h-16 border border-gray-300 rounded-2xl text-black md:text-xl items-center transition ease-in-out duration-300 focus:outline-none focus:shadow-outline',
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

import React, { InputHTMLAttributes } from 'react';
import FormItem from '../FormItem';
import { useFormContext, RegisterOptions } from 'react-hook-form';
import getElementError from '../utils/getElementError';
import {
  RegistrationError,
  FormError,
  LoginError,
} from '../constants/validation';

type Props = {
  label: string;
  altLabel?: string;
  error?: LoginError | FormError | RegistrationError;
  validation?: RegisterOptions;
  children?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({
  label,
  altLabel,
  error,
  validation,
  children,
  ...props
}: Props) => {
  const form = useFormContext();
  const errorMessage = getElementError({
    name: props.name,
    error: error,
    errors: form.errors,
  });

  return (
    <FormItem label={label} altLabel={altLabel} errorMessage={errorMessage}>
      {children}
      <input
        className="block w-full py-2 pr-2 pl-16 h-16 border border-gray-300 rounded-2xl text-black font-bold md:text-xl items-center placeholder-medium transition ease-in-out duration-300 focus:outline-none focus:shadow-outline"
        ref={validation ? form.register(validation) : form.register}
        {...props}
      />
    </FormItem>
  );
};

export default FormInput;

import React, { FormHTMLAttributes } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

export type FormValues = {
  name: string;
  email: string;
  password: string;
};

type Props = {
  onSubmit(values: FormValues): void | Promise<void>;
  children: React.ReactNode;
} & Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;

const Form = ({ onSubmit, children, ...props }: Props) => {
  const methods = useForm<FormValues>();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;

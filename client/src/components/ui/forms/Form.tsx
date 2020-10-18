import React, { FormHTMLAttributes } from 'react';

type Props = {
  children: React.ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

const Form = ({ children, ...props }: Props) => {
  return <form {...props}>{children}</form>;
};

export default Form;

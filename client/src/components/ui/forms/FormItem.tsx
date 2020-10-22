import React from 'react';
import Label from '../Label';

type Props = {
  label: string;
  action?: string;
  children: React.ReactNode;
};

const FormItem = ({ label, action, children }: Props) => {
  return (
    <>
      {action ? (
        <Label>
          <div className="flex justify-between">
            <span>{label}</span>
            <span className="font-bold text-black">{action}</span>
          </div>
          <div className="relative mt-3 mb-6">{children}</div>
        </Label>
      ) : (
        <Label>
          {label}
          <div className="relative mt-3 mb-6">{children}</div>
        </Label>
      )}
    </>
  );
};

export default FormItem;

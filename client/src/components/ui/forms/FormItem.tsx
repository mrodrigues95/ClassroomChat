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
        <div>
          <Label>
            <div className="flex justify-between">
              <span>{label}</span>
              <span className="font-bold text-black">{action}</span>
            </div>
            <div className="mt-3 mb-6">{children}</div>
          </Label>
        </div>
      ) : (
        <div>
          <Label>
            {label}
            <div className="mt-3 mb-6">{children}</div>
          </Label>
        </div>
      )}
    </>
  );
};

export default FormItem;

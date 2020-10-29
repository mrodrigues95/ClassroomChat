import React from 'react';
import Label from '../Label';
import AltLabel from './../AltLabel';

type Props = {
  label: string;
  altLabel?: string;
  error?: string | undefined;
  children: React.ReactNode;
};

const FormItem = ({ label, altLabel, error, children }: Props) => {
  return (
    <>
      {altLabel ? (
        <AltLabel label={label} altLabel={altLabel} error={error}>
          {children}
        </AltLabel>
      ) : (
        <Label error={error}>
          {label}
          {typeof error !== 'undefined' && (
            <span className="ml-1 text-xs italic font-bold normal-case">
              - This field is required
            </span>
          )}
          <div className="relative mt-3 mb-6">{children}</div>
        </Label>
      )}
    </>
  );
};

export default FormItem;

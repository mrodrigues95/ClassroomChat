import React from 'react';
import Label from '../../Label';
import AltLabel from '../../AltLabel';

type Props = {
  label: string;
  altLabel?: string;
  errorMessage?: string | undefined;
  children: React.ReactNode;
};

const FormItem = ({ label, altLabel, errorMessage, children }: Props) => {
  return (
    <>
      {altLabel ? (
        <AltLabel label={label} altLabel={altLabel} errorMessage={errorMessage}>
          {children}
        </AltLabel>
      ) : (
        <Label errorMessage={errorMessage}>
          {label}
          {typeof errorMessage !== 'undefined' && (
            <span className="ml-1 text-xs italic font-bold normal-case">
              {errorMessage}
            </span>
          )}
          <div className="relative mt-3 mb-6">{children}</div>
        </Label>
      )}
    </>
  );
};

export default FormItem;

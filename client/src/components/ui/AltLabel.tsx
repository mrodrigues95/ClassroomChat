import React from 'react';
import Label from './Label';

type Props = {
  label: string;
  altLabel: string;
  error?: string | undefined;
  children: React.ReactNode;
};

const AltLabel = ({ label, altLabel, error, children }: Props) => {
  return (
    <Label error={error}>
      <div className="flex justify-between">
        <div>
          <span>{label}</span>
          {typeof error !== 'undefined' && (
            <span className="ml-1 text-xs italic font-bold normal-case">
              - This field is required
            </span>
          )}
        </div>
        <span className="font-bold text-black normal-case">{altLabel}</span>
      </div>
      <div className="relative mt-3 mb-6">{children}</div>
    </Label>
  );
};

export default AltLabel;

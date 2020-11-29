import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import clsx from 'clsx';
import { SearchIcon } from '../../shared/assets/icons';

type Props = InputHTMLAttributes<HTMLInputElement>;

const Search = forwardRef<HTMLInputElement, Props>(({ ...props }, ref) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative flex w-full justify-end">
      <span className="absolute right-0 inset-y-0 flex items-center pr-4">
        <SearchIcon className="h-5 w-5" />
      </span>
      <input
        className={clsx(
          'inline-flex w-3/5 pr-12 pl-4 h-12 border outline-none tracking-wide border-gray-300 rounded-2xl font-semibold text-black text-sm items-center transition-all ease-in-out duration-300 focus:shadow-outline',
          focused && 'w-full'
        )}
        aria-label="Search"
        onFocus={() => setFocused(true)}
        onBlur={(e) => !e.target.value && setFocused(false)}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Search;

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import clsx from 'clsx';
import { SearchIcon } from '../../../assets/icons';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { MEDIA_QUERIES } from '../../../constants/common';
import Button from '../Button';

type Props = InputHTMLAttributes<HTMLInputElement>;

const Search = forwardRef<HTMLInputElement, Props>(({ ...props }, ref) => {
  const [focused, setFocused] = useState(false);
  const isSmall = useMediaQuery(MEDIA_QUERIES.SMALL);

  return (
    <div className="relative flex w-full justify-end">
      {isSmall ? (
        <span className="absolute right-0 inset-y-0 flex items-center pr-4">
          <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      ) : (
        <Button
          variant="primary"
          className="rounded-full sm:ml-3"
          aria-label="Search"
        >
          <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      )}
      <input
        className={clsx(
          'hidden sm:inline-flex w-3/5 pr-12 pl-4 h-12 border outline-none tracking-wide border-gray-300 rounded-2xl font-semibold text-black text-sm items-center transition-all ease-in-out duration-300 focus:shadow-outline',
          focused && 'w-full'
        )}
        aria-hidden={!isSmall}
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

import clsx from 'clsx';

type Props = {
  errorMessage?: string | undefined;
  children: React.ReactNode;
};

const Label = ({ errorMessage, children }: Props) => {
  return (
    <label
      className={clsx(
        'block w-full text-md text-gray-700 tracking-wide font-semibold',
        typeof errorMessage !== 'undefined' && 'font-bold uppercase text-red-600'
      )}
    >
      {children}
    </label>
  );
};

export default Label;

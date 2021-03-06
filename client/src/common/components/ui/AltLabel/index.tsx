import Label from '../Label';

type Props = {
  label: string;
  altLabel: string;
  errorMessage?: string | undefined;
  children: React.ReactNode;
};

const AltLabel = ({ label, altLabel, errorMessage, children }: Props) => {
  return (
    <Label errorMessage={errorMessage}>
      <div className="flex justify-between">
        <div>
          <span>{label}</span>
          {typeof errorMessage !== 'undefined' && (
            <span className="ml-1 text-xs italic font-bold normal-case">
              {errorMessage}
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

import { forwardRef, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';

type Props = {
  label?: string;
  className?: string;
} & TextareaAutosizeProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="w-full flex items-center">
        {label}
        <TextareaAutosize
          className={clsx(
            'w-full resize-none font-semibold focus:outline-none placeholder-medium',
            className && className
          )}
          ref={ref}
          {...props}
        />
      </label>
    );
  }
);

export default TextArea;

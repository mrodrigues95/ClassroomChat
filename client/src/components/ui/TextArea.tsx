import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';

type Props = {
  label?: string;
} & TextareaAutosizeProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, ...props }, ref) => {
    return (
      <label className="w-full flex items-center">
        {label}
        <TextareaAutosize
          className="w-full resize-none font-semibold focus:outline-none placeholder-medium"
          ref={ref}
          {...props}
        />
      </label>
    );
  }
);

export default TextArea;

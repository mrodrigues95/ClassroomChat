import { ButtonHTMLAttributes, createContext, useContext } from 'react';
import { useDropzone } from 'react-dropzone';

export type FileType = {
  preview?: string;
} & File;

type ButtonProps = {
  className: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

const Button = ({ className, ...props }: ButtonProps) => {
  const { open } = useContext(FilePickerContext)!;

  return (
    <button type="button" className={className} {...props} onClick={open} />
  );
};

type FilePickerContextType = {
  open: () => void;
};

const FilePickerContext = createContext<FilePickerContextType | null>(null);

type Props = {
  onFileSelected: (acceptedFiles: File[]) => void;
  children: React.ReactNode;
};

const FilePicker = ({ onFileSelected, children }: Props) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: onFileSelected,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <FilePickerContext.Provider value={{ open }}>
      <div {...getRootProps()}>
        <input {...getInputProps()} aria-hidden="true" />
        {children}
      </div>
    </FilePickerContext.Provider>
  );
};

FilePicker.Button = Button;

export default FilePicker;

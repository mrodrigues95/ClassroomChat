import React, { createContext, useContext } from 'react';
import clsx from 'clsx';
import { Dialog } from '@headlessui/react';

const Content = ({ children }: { children: React.ReactNode }) => {
  const { title, description } = useContext(ModalContext)!;

  return (
    <div className="flex-1 flex flex-col items-start p-3">
      <div className={clsx('w-full', title || description ? 'mb-4' : 'mb-0')}>
        {title && (
          <Dialog.Title className="font-bold text-lg uppercase">
            {title}
          </Dialog.Title>
        )}
        {description && (
          <Dialog.Description className="font-semibold text-gray-700">
            {description}
          </Dialog.Description>
        )}
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
};

const Footer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-3 flex items-center justify-end mt-4 rounded-b-md bg-gray-200">
      {children}
    </div>
  );
};

type BaseProps = {
  title?: string;
  description?: string;
};

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  initialFocus: React.MutableRefObject<HTMLElement | null> | undefined;
  children: React.ReactNode;
} & BaseProps;

const ModalContext = createContext<BaseProps | null>(null);

const Modal = ({
  isOpen,
  setIsOpen,
  initialFocus,
  title,
  description,
  children,
}: ModalProps) => {
  return (
    <ModalContext.Provider value={{ title, description }}>
      <Dialog
        open={isOpen}
        onClose={(value) => setIsOpen(value)}
        initialFocus={initialFocus}
        className="z-50 fixed px-2 pb-4 inset-0 flex items-center justify-center sm:px-4"
      >
        <Dialog.Overlay className="absolute inset-0 bg-black opacity-25" />
        <div className="relative flex flex-col w-full max-w-lg shadow-xl bg-white rounded-md text-black">
          {children}
        </div>
      </Dialog>
    </ModalContext.Provider>
  );
};

Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;

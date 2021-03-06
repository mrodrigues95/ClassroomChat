import { FieldError } from 'react-hook-form';
import { FormError } from '../constants/validation';

type Error = {
  name: string | undefined;
  error?: string;
  errors?: Record<string, FieldError>;
};

const getErrorMessage = ({ name, errors }: Error) => {
  const error = errors?.[name ?? ''];

  if (!error) return undefined;

  if (error.message) return error.message;

  return FormError.FIELD_REQUIRED;
};

const getElementError = ({ name, error, errors }: Error) => {
  return error ?? getErrorMessage({ name, errors });
};

export default getElementError;

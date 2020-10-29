import { FieldError } from 'react-hook-form'

const getErrorMessage = (
  name: string | undefined,
  errors: Record<string, FieldError>
) => {
  const error = errors?.[name ?? ''];

  if (!error) return undefined;

  if (error.message) return error.message;

  return "Field is required.";
};

export default getErrorMessage;
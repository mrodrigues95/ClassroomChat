/**
 * Checks for an empty or undefined string.
 * @param {string} value The string to be validated.
 * @return {boolean} The result of validating the string.
 */
export const isEmpty = (value: string) => {
  if (!value) return true;
  if (value.trim() === '') return true;
  if (value.trim().length === 0) return true;
  return false;
};

/**
 * Removes spaces inside the string if 'trimAll' is true.
 * Otherwise, just trims whitespace at both ends of the string and ignores spaces.
 * @param {string} value The string to be trimmed.
 * @param {boolean} trimAll Trim spaces inside the string.
 * @return {string} The trimmed string.
 */
export const trimInput = (value: string, trimAll: boolean) => {
  if (isEmpty(value)) return 'Cannot trim an empty or undefined string!';
  if (trimAll) return value.replace(/\s+/g, '');
  return value.trim();
};

/**
 * Formats out multiple line breaks (2 max).
 * @param {string} message The message to be formatted.
 * @return {string} The formatted message.
 */
export const formatMessage = (message: string) => {
  return message.replace(/(\r\n|\r|\n){3,}/g, '$1\n\n');
};

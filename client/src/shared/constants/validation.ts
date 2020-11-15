export enum LoginError {
  INVALID_LOGIN = '- Email address or password is invalid.',
}

export enum RegistrationError {
  INVALID_NAME = '- This field is required.',
  INVALID_EMAIL = '- This field is required or the email already exists.',
  INVALID_PASSWORD = "- This field requires a minimum of 6 characters, an uppercase letter, a number and a special character like '@, #, $, %'.",
}

export enum FormError {
  GENERIC_ERROR= '- This field is required.',
}
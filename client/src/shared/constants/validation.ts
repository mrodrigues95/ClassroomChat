export enum LoginError {
  INVALID_LOGIN = '- Email address or password is invalid.',
}

export enum RegistrationError {
  INVALID_EMAIL = '- This field is required.',
  EMAIL_ALREADY_EXISTS = '- This email address already exists.',
  INVALID_PASSWORD = "- This field requires a minimum of 6 characters, an uppercase letter, a number and a special character like '@, #, $, %'.",
}

export enum FormError {
  FIELD_REQUIRED= '- This field is required.',
}
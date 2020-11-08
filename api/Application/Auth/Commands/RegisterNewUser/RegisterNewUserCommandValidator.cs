using Application.Validators;
using FluentValidation;

namespace Application.Auth.Commands.RegisterNewUser {
    public class RegisterNewUserCommandValidator : AbstractValidator<RegisterNewUserCommand> {
        public RegisterNewUserCommandValidator() {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).Password();
        }
    }
}

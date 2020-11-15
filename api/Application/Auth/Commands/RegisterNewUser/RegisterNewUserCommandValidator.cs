using Application.Validators;
using FluentValidation;

namespace Application.Auth.Commands.RegisterNewUser {
    public class RegisterNewUserCommandValidator : AbstractValidator<RegisterNewUserCommand> {
        public RegisterNewUserCommandValidator() {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).Password();
        }
    }
}

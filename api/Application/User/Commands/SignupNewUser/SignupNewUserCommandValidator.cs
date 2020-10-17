using Application.Validators;
using FluentValidation;

namespace Application.User.Commands.SignupNewUser {
    public class SignupNewUserCommandValidator : AbstractValidator<SignupNewUserCommand> {
        public SignupNewUserCommandValidator() {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).Password();
        }
    }
}

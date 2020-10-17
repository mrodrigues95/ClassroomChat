using FluentValidation;

namespace Application.Validators {
    public static class ValidatorExtensions {
        // Handle password validation.
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder) {
            var options = ruleBuilder
                .NotEmpty()
                .MinimumLength(6).WithMessage("Minimum 6 characters")
                .Matches("[A-Z]").WithMessage("A uppercase letter")
                .Matches("[a-z]").WithMessage("A lowercase letter")
                .Matches("[0-9]").WithMessage("A number")
                .Matches("[^a-zA-Z0-9]").WithMessage("A special character like '@, #, $, %'");

            return options;
        }
    }
}

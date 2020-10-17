using FluentValidation;

namespace Application.Discussions.Commands {
    public class CreateDiscussionCommandValidator : AbstractValidator<CreateDiscussionCommand> {
        public CreateDiscussionCommandValidator() {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}

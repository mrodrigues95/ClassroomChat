using FluentValidation;

namespace Application.Classrooms.Commands.CreateClassroom {
    public class CreateClassroomCommandValidator : AbstractValidator<CreateClassroomCommand> {
        public CreateClassroomCommandValidator() {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}

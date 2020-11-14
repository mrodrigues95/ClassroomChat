using Application.Classrooms.Commands.CreateClassroom;
using Application.Common.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Classrooms {
    /// <summary>
    /// Creates a new classroom server.
    /// </summary>
    public class CreateClassroomCommandHandler : IRequestHandler<CreateClassroomCommand> {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public CreateClassroomCommandHandler(DataContext context, IUserAccessor userAccessor) {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Unit> Handle(CreateClassroomCommand request, CancellationToken cancellationToken) {
            // Create a new entry in the Classroom table.
            var classroom = new Classroom {
                Id = request.Id,
                Name = request.Name,
            };
            _context.Classrooms.Add(classroom);

            // Get the currently authorized user.
            var user = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUsername());

            // Create a new entry in the UserClassroom table.
            var student = new UserClassroom {
                AppUser = user,
                Classroom = classroom,
                IsCreator = true
            };
            _context.UserClassrooms.Add(student);

            // Save changes to the database.
            var success = await _context.SaveChangesAsync() > 0;

            if (success)
                return Unit.Value;

            throw new Exception("There was a problem saving changes.");
        }
    }
}

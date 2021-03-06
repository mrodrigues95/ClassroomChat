﻿using Application.Classrooms.Commands.CreateClassroom;
using Application.Common;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Classrooms {
    /// <summary>
    /// Creates a new classroom server.
    /// </summary>
    public class CreateClassroomCommandHandler : IRequestHandler<CreateClassroomCommand, Result<Unit>> {
        private readonly ApplicationContext _context;
        private readonly IUserAccessor _userAccessor;

        public CreateClassroomCommandHandler(ApplicationContext context, IUserAccessor userAccessor) {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(CreateClassroomCommand request, CancellationToken cancellationToken) {
            var user = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUsername());

            // Create the classroom.
            var classroom = new Classroom {
                Id = request.Id,
                Name = request.Name,
                DiscussionsCount = 0,
                CreatedBy = user
            };
            _context.Classrooms.Add(classroom);

            var student = new ApplicationUserClassroom(user.Id, classroom.Id, true, user, classroom);
            _context.ApplicationUserClassrooms.Add(student);

            var success = await _context.SaveChangesAsync() > 0;
            if (!success) return Result<Unit>.Failure("There was a problem saving changes.");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}

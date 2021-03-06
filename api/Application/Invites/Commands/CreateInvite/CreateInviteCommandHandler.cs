﻿using Application.Common;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using Application.Invites.Commands;
using AutoMapper;
using CSharpVitamins;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Invites {
    /// <summary>
    /// Generates a new unique invite link for a given classroom.
    /// </summary>
    public class CreateInviteCommandHandler : IRequestHandler<CreateInviteCommand, Result<InviteLinkDto>> {
        private readonly Persistence.ApplicationContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;

        public CreateInviteCommandHandler(Persistence.ApplicationContext context, IUserAccessor userAccessor, IMapper mapper) {
            _context = context;
            _userAccessor = userAccessor;
            _mapper = mapper;
        }

        public async Task<Result<InviteLinkDto>> Handle(CreateInviteCommand request, CancellationToken cancellationToken) {
            // Get the classroom.
            var classroom = await _context.Classrooms.FindAsync(request.ClassroomId);

            // No classroom  was found with the given id.
            if (classroom is null) return Result<InviteLinkDto>.Failure("Unable to find classroom.");

            // Get the currently authorized user.
            var user = await _context.Users.SingleOrDefaultAsync(x =>
                x.UserName == _userAccessor.GetCurrentUsername());

            // Create a new entry in the InviteLink table.
            var link = new InviteLink {
                Id = request.Id,
                Token = new ShortGuid(Guid.NewGuid()),
                ExpiryDate = DateTime.Now.AddDays(1),
                ExpireAfterFirstUse = false,
                Hits = 0
            };
            _context.InviteLinks.Add(link);

            var linkToReturn = _mapper.Map<InviteLink, InviteLinkDto>(link);

            // Save changes to the database.
            var success = await _context.SaveChangesAsync() > 0;

            if (success) return Result<InviteLinkDto>.Success(linkToReturn);

            return Result<InviteLinkDto>.Failure("There was a problem saving changes.");
        }
    }
}

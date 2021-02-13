using Application.Common;
using Application.Common.Dtos;
using MediatR;
using System;

namespace Application.Invites.Commands {
    public class CreateInviteCommand : IRequest<Result<InviteLinkDto>> {
        public Guid Id { get; set; }
        public Guid ClassroomId { get; set; }
    }
}

using MediatR;
using System;

namespace Application.Invites.Commands {
    public class CreateInviteCommand : IRequest<InviteLinkDto> {
        public Guid Id { get; set; }
        public Guid ClassroomId { get; set; }
    }
}

using Application.Common;
using Domain.Entities;
using MediatR;

namespace Application.Profile.Commands.SetRandomProfilePhoto {
    public class SetRandomProfilePhotoCommand : IRequest<Result<Photo>> {
        public string Email { get; set; }
        public bool IsNewUser => Email != null;
    }
}

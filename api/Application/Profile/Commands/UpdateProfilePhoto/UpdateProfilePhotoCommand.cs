using Application.Common;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Profile.Commands.UpdateProfilePhoto {
    public class UpdateProfilePhotoCommand : IRequest<Result<Photo>> {
        public IFormFile File { get; set; }
    }
}

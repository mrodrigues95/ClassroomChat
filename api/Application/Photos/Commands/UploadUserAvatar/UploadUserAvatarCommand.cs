using Application.Common;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Photos.Commands.UploadUserAvatar {
    public class UploadUserAvatarCommand : IRequest<Result<Photo>> {
        public IFormFile File { get; set; }
    }
}

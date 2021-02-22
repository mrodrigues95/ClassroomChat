using Application.Common;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Photos.Commands.UploadProfilePhoto {
    public class UploadProfilePhotoCommand : IRequest<Result<Photo>> {
        public IFormFile File { get; set; }
    }
}

using Application.Common;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.User.Commands.UpdateUserPhoto {
    public class UpdateUserPhotoCommand : IRequest<Result<Photo>> {
        public IFormFile File { get; set; }
        public bool IsRandom { get; set; } = false;
    }
}

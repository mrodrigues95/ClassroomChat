using Application.Common;
using MediatR;

namespace Application.Photos.Commands.DeletePhoto {
    public class DeletePhotoCommand : IRequest<Result<Unit>> {
        public string Id { get; set; }
    }
}

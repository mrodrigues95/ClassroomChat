using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Photos.Commands.DeletePhoto {
    public class DeletePhotoCommandHandler : IRequestHandler<DeletePhotoCommand, Result<Unit>> {
        private readonly ApplicationContext _context;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IUserAccessor _userAccessor;

        public DeletePhotoCommandHandler(ApplicationContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor) {
            _context = context;
            _photoAccessor = photoAccessor;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(DeletePhotoCommand request, CancellationToken cancellationToken) {
            var user = await _context.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
            if (user is null) Result<Unit>.Failure("Unable to find user.", true);

            var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
            if (photo is null) Result<Unit>.Failure("Unable to find photo.");
            if (photo.IsCurrentProfilePhoto) return Result<Unit>.Failure("You cannot delete your main photo.");

            var result = await _photoAccessor.DeletePhoto(photo.Id);
            if (result is null) return Result<Unit>.Failure("Problem deleting photo from Cloudinary.");

            user.Photos.Remove(photo);
            var success = await _context.SaveChangesAsync() > 0;

            if (!success) return Result<Unit>.Failure("There was a problem deleting the photo from API.");
            return Result<Unit>.Success(Unit.Value);
        }
    }
}

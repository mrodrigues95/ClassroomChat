using Application.Common;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Profile.Commands.UpdateProfilePhoto {
    /// <summary>
    /// Uploads a new photo that is to be used as the user's avatar photo.
    /// </summary>
    public class UpdateProfilePhotoCommandHandler : IRequestHandler<UpdateProfilePhotoCommand, Result<Photo>> {
        private readonly ApplicationContext _context;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IUserAccessor _userAccessor;

        public UpdateProfilePhotoCommandHandler(ApplicationContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor) {
            _context = context;
            _photoAccessor = photoAccessor;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Photo>> Handle(UpdateProfilePhotoCommand request, CancellationToken cancellationToken) {
            var user = await _context.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
            if (user is null) return Result<Photo>.Failure("Unable to find user.", true);

            var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

            var photo = new Photo {
                Id = photoUploadResult.PublicId,
                Url = photoUploadResult.Url,
                IsCurrentProfilePhoto = true,
            };
            user.Photos.Add(photo);

            // Delete the current profile photo from Cloudinary only if it's not one of our
            // random avatars.
            var currentProfilePhoto = user.Photos.FirstOrDefault(x => x.IsCurrentProfilePhoto);
            if (currentProfilePhoto != null) {
                currentProfilePhoto.IsCurrentProfilePhoto = false;
                if (!currentProfilePhoto.IsDefaultAvatar) {
                    var deleteResult = await _photoAccessor.DeletePhoto(currentProfilePhoto.Id);
                    if (deleteResult is null) return Result<Photo>.Failure("Problem deleting photo from Cloudinary.");
                }
            }

            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return Result<Photo>.Failure("There was a problem saving changes.");

            return Result<Photo>.Success(photo);
        }
    }
}

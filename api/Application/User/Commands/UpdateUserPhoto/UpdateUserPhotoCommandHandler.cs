using Application.Common;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User.Commands.UpdateUserPhoto {
    public class UpdateUserPhotoCommandHandler : IRequestHandler<UpdateUserPhotoCommand, Result<Photo>> {
        private readonly ApplicationContext _context;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IUserAccessor _userAccessor;

        public UpdateUserPhotoCommandHandler(ApplicationContext context, IPhotoAccessor photoAccessor,
            IUserAccessor userAccessor) {
            _context = context;
            _photoAccessor = photoAccessor;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Photo>> Handle(UpdateUserPhotoCommand request, CancellationToken cancellationToken) {
            var user = await _context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
            if (user is null) return Result<Photo>.Failure("Unable to find user.", true);

            PhotoUploadResult photoUploadResult;
            if (request.IsRandom) {
                photoUploadResult = await _photoAccessor.GetRandomAvatar();
            } else {
                photoUploadResult = await _photoAccessor.AddPhoto(request.File);
            }
            if (photoUploadResult is null) return Result<Photo>.Failure("Unable to upload new photo.");

            // Delete the current user photo from Cloudinary only if it's not one of our
            // random static avatars.
            var currentUserPhoto = user.Photos.FirstOrDefault(x => x.IsCurrentUserPhoto);
            if (currentUserPhoto != null) {
                currentUserPhoto.IsCurrentUserPhoto = false;
                if (!currentUserPhoto.IsCloudinaryStaticPhoto) {
                    var deleteResult = await _photoAccessor.DeletePhoto(currentUserPhoto.Id);
                    if (deleteResult is null) return Result<Photo>.Failure("There was a problem deleting the existing photo from Cloudinary.");
                }
            }

            var photo = new Photo {
                Id = photoUploadResult.PublicId,
                Url = photoUploadResult.Url,
                IsCurrentUserPhoto = true,
                IsCloudinaryStaticPhoto = request.IsRandom
            };
            user.Photos.Add(photo);

            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return Result<Photo>.Failure("There was a problem saving changes.");

            return Result<Photo>.Success(photo);
        }
    }
}

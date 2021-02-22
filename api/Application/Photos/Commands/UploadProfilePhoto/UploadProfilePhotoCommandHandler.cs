using Application.Common;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Photos.Commands.UploadProfilePhoto {
    /// <summary>
    /// Uploads a new photo that is to be used as the user's profile photo.
    /// </summary>
    public class UploadProfilePhotoCommandHandler : IRequestHandler<UploadProfilePhotoCommand, Result<Photo>> {
        private readonly ApplicationContext _context;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IUserAccessor _userAccessor;

        public UploadProfilePhotoCommandHandler(ApplicationContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor) {
            _context = context;
            _photoAccessor = photoAccessor;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Photo>> Handle(UploadProfilePhotoCommand request, CancellationToken cancellationToken) {
            var user = await _context.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
            if (user is null) Result<Photo>.Failure("Unable to find user.", true);

            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
            if (currentMain != null) currentMain.IsMain = false;

            var photoUploadResult = await _photoAccessor.AddPhoto(request.File);
            var photo = new Photo {
                Id = photoUploadResult.PublicId,
                Url = photoUploadResult.Url,
                IsMain = true
            };

            user.Photos.Add(photo);

            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return Result<Photo>.Failure("There was a problem uploading the photo.");

            return Result<Photo>.Success(photo);
        }
    }
}

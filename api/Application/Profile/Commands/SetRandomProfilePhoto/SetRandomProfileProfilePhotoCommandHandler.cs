using Application.Common;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Profile.Commands.SetRandomProfilePhoto {
    // TODO: Move this logic to UpdateProfilePhotoCommandHandler.
    public class SetRandomProfileProfilePhotoCommandHandler : IRequestHandler<SetRandomProfilePhotoCommand, Result<Photo>> {
        private readonly ApplicationContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IUserAccessor _userAccessor;

        public SetRandomProfileProfilePhotoCommandHandler(ApplicationContext context, UserManager<ApplicationUser> userManager,
            IPhotoAccessor photoAccessor, IUserAccessor userAccessor) {
            _context = context;
            _userManager = userManager;
            _photoAccessor = photoAccessor;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Photo>> Handle(SetRandomProfilePhotoCommand request, CancellationToken cancellationToken) {
            // Check if we are setting a random default photo for a new user that just registered.
            ApplicationUser user;
            if (request.IsNewUser) {
                user = await _userManager.FindByEmailAsync(request.Email);
            } else {
                user = await _context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
            }
            if (user is null) return Result<Photo>.Failure("Unable to find user.", true);

            var currentProfilePhoto = user.Photos.FirstOrDefault(x => x.IsCurrentProfilePhoto);
            if (currentProfilePhoto != null) currentProfilePhoto.IsCurrentProfilePhoto = false;

            var photoUploadResult = await _photoAccessor.GetRandomAvatar();

            var photo = new Photo {
                Id = photoUploadResult.PublicId,
                Url = photoUploadResult.Url,
                IsCurrentProfilePhoto = true,
                IsDefaultAvatar = true
            };
            user.Photos.Add(photo);

            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return Result<Photo>.Failure("There was a problem saving the photo.");

            return Result<Photo>.Success(photo);
        }
    }
}

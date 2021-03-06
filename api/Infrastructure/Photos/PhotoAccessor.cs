using Application.Common.Interfaces;
using Application.User;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;

namespace Infrastructure.Photos {
    public class PhotoAccessor : IPhotoAccessor {
        private readonly Cloudinary _cloudinary;

        public PhotoAccessor(IOptions<CloudinarySettings> config) {
            var account = new Account(
                config.Value.CloudName,    
                config.Value.ApiKey,    
                config.Value.ApiSecret    
            );
            _cloudinary = new Cloudinary(account);
        }

        public async Task<PhotoUploadResult> AddPhoto(IFormFile file) {
            if (file.Length < 0) return null;

            await using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams {
                File = new FileDescription(file.FileName, stream),
                Transformation = new Transformation().Height(500).Width(500).Crop("fill")
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            if (uploadResult.Error != null) throw new Exception(uploadResult.Error.Message);            

            return new PhotoUploadResult {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUrl.ToString(),
            };
        }

        public async Task<string> DeletePhoto(string publicId) {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok" ? result.Result : null;
        }

        public async Task<PhotoUploadResult> GetRandomAvatar() {
            SearchResult result = await _cloudinary.Search()
                .Expression("folder:user_default_avatars")
                .SortBy("public_id", "desc")
                .ExecuteAsync();
            if (result.Error != null) throw new Exception(result.Error.Message);

            // Select a random avatar.
            var random = new Random();
            var index = random.Next(result.Resources.Count);
            var randomAvatar = result.Resources[index];

            // PublicId never changes since the default images are static and stored
            // in a separate folder in Cloudinary. This means we will run into primary
            // key constraints when setting a new user's default profile photo. A
            // simple solution is to just generate a random id ourselves.
            return new PhotoUploadResult {
                PublicId = Guid.NewGuid().ToString(),
                Url = randomAvatar.SecureUrl.ToString(),
            };
        }
    }
}

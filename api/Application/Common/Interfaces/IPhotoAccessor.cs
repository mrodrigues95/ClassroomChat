using Application.Profile;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Application.Common.Interfaces {
    public interface IPhotoAccessor {
        Task<PhotoUploadResult> AddPhoto(IFormFile file);
        Task<string> DeletePhoto(string publicId);
        Task<PhotoUploadResult> GetRandomAvatar();
    }
}

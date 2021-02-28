using Application.Common;
using MediatR;

namespace Application.Profile.Queries.GetProfilePhoto {
    public class GetProfileDetailQuery : IRequest<Result<Profile>> { }
}

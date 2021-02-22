using Application.Common;
using MediatR;

namespace Application.Profiles.Queries.GetProfileDetail {
    public class GetProfileDetailQuery : IRequest<Result<Profile>> {
        public string Username { get; set; }
    }
}

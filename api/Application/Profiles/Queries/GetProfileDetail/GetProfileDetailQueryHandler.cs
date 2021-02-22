using Application.Common;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Profiles.Queries.GetProfileDetail {
    public class GetProfileDetailQueryHandler : IRequestHandler<GetProfileDetailQuery, Result<Profile>> {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;

        public GetProfileDetailQueryHandler(ApplicationContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<Profile>> Handle(GetProfileDetailQuery request, CancellationToken cancellationToken) {
            var profile = await _context.Users
                .ProjectTo<Profile>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Username == request.Username);

            if (profile is null) return Result<Profile>.Failure("Unable to find user profile.");

            return Result<Profile>.Success(profile);
        }
    }
}

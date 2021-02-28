using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Profile.Queries.GetProfilePhoto {
    public class GetProfileDetailQueryHandler : IRequestHandler<GetProfileDetailQuery, Result<Profile>> {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public GetProfileDetailQueryHandler(ApplicationContext context, IMapper mapper, IUserAccessor userAccessor) {
            _context = context;
             _mapper = mapper;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Profile>> Handle(GetProfileDetailQuery request, CancellationToken cancellationToken) {
            var profile = await _context.Users
                .ProjectTo<Profile>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Email == _userAccessor.GetCurrentUsername());
            if (profile is null) return Result<Profile>.Failure("Unable to find user profile.");

            return Result<Profile>.Success(profile);
        }
    }
}

using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User.Queries.GetUserDetail {
    public class GetUserDetailQueryHandler : IRequestHandler<GetUserDetailQuery, Result<UserDto>> {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public GetUserDetailQueryHandler(ApplicationContext context, IMapper mapper, IUserAccessor userAccessor) {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        public async Task<Result<UserDto>> Handle(GetUserDetailQuery request, CancellationToken cancellationToken) {
            var user = await _context.Users
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Email == _userAccessor.GetCurrentUsername());
            if (user is null) return Result<UserDto>.Failure("Unable to find user");

            return Result<UserDto>.Success(user);
        }
    }
}

using Application.Classrooms.Queries.GetClassroomsList;
using Application.Common;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Classrooms {

    /// <summary>
    /// Gets a list of classrooms that the user is part of.
    /// </summary>
    public class GetClassroomsListQueryHandler : IRequestHandler<GetClassroomsListQuery, Result<ClassroomsListDto>> {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserAccessor _userAccessor;

        public GetClassroomsListQueryHandler(ApplicationContext context, IMapper mapper, 
            UserManager<ApplicationUser> userManager, IUserAccessor userAccessor) {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
            _userAccessor = userAccessor;
        }

        public async Task<Result<ClassroomsListDto>> Handle(GetClassroomsListQuery request, CancellationToken cancellationToken) {
            var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());
            if (user is null) Result<ClassroomsListDto>.Failure("Unable to find user.", true);

            var queryable = _context.Classrooms.AsQueryable();
            var classrooms = await queryable
                .Where(x => x.ApplicationUserClassrooms
                    .Any(uc => uc.ApplicationUserId == user.Id))
                .ToListAsync();

            var list = new ClassroomsListDto {
                Classrooms = _mapper.Map<List<Classroom>, List<ClassroomDto>>(classrooms),
                ClassroomsCount = classrooms.Count
            };

            return Result<ClassroomsListDto>.Success(list);
        }
    }
}

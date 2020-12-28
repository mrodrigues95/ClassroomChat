using Application.Classrooms.Queries.GetClassroomsList;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using Application.Errors;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Classrooms {

    /// <summary>
    /// Get a list of classrooms that the user is a part of.
    /// </summary>
    public class GetClassroomsListQueryHandler : IRequestHandler<GetClassroomsListQuery, ClassroomsListDto> {
        private readonly Persistence.ApplicationContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserAccessor _userAccessor;

        public GetClassroomsListQueryHandler(Persistence.ApplicationContext context, IMapper mapper, 
            UserManager<ApplicationUser> userManager, IUserAccessor userAccessor) {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
            _userAccessor = userAccessor;
        }

        public async Task<ClassroomsListDto> Handle(GetClassroomsListQuery request, CancellationToken cancellationToken) {
            var queryable = _context.Classrooms.AsQueryable();
            var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

            if (user == null) throw new RestException(HttpStatusCode.Unauthorized);

            var classrooms = await queryable.Where(x =>
                x.ApplicationUserClassrooms.Any(uc => uc.ApplicationUserId == user.Id))
                .ToListAsync();

            return new ClassroomsListDto {
                Classrooms = _mapper.Map<List<Classroom>, List<ClassroomDto>>(classrooms),
                ClassroomsCount = classrooms.Count
            };
        }
    }
}

using Application.Classrooms.Queries.GetClassroomsList;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Classrooms {

    /// <summary>
    /// Get a list of classrooms that the user is a part of.
    /// </summary>
    public class GetClassroomsListQueryHandler : IRequestHandler<GetClassroomsListQuery, ClassroomsListDto> {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public GetClassroomsListQueryHandler(DataContext context, IMapper mapper, IUserAccessor userAccessor) {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        public async Task<ClassroomsListDto> Handle(GetClassroomsListQuery request, CancellationToken cancellationToken) {
            var classrooms = await _context.Classrooms
                .Where(x => x.UserClassrooms.Any(c =>
                    c.AppUser.UserName == _userAccessor.GetCurrentUsername()))
                .ToListAsync();
            return new ClassroomsListDto {
                Classrooms = _mapper.Map<List<Classroom>, List<ClassroomDto>>(classrooms),
                ClassroomCount = classrooms.Count
            };
        }
    }
}

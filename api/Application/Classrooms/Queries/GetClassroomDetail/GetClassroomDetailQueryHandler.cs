using Application.Classrooms.Queries.GetClassroomDetail;
using Application.Common.Dtos;
using Application.Errors;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Persistence;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Classrooms {

    /// <summary>
    /// Get the details of a given classroom.
    /// </summary>
    public class GetClassroomDetailQueryHandler : IRequestHandler<GetClassroomDetailQuery, ClassroomDto> {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;

        public GetClassroomDetailQueryHandler(ApplicationContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ClassroomDto> Handle(GetClassroomDetailQuery request, CancellationToken cancellationToken) {
            // Get the classroom.
            var classroom = await _context.Classrooms.FindAsync(request.Id);

            // No classroom was found with the given id.
            if (classroom == null)
                throw new RestException(HttpStatusCode.NotFound, new { Classroom = "Not found." });

            var classroomToReturn = _mapper.Map<Classroom, ClassroomDto>(classroom);

            return classroomToReturn;
        }
    }
}

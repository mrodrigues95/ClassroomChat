using Application.Common;
using Application.Common.Dtos;
using MediatR;

namespace Application.Classrooms.Queries.GetClassroomsList {
    public class GetClassroomsListQuery : IRequest<Result<ClassroomsListDto>> { }
}

using MediatR;

namespace Application.Classrooms.Queries.GetClassroomsList {
    public class GetClassroomsListQuery : IRequest<ClassroomsListDto> { }
}

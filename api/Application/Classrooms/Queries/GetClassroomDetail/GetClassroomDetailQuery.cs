using Application.Common.Dtos;
using MediatR;
using System;

namespace Application.Classrooms.Queries.GetClassroomDetail {
    public class GetClassroomDetailQuery : IRequest<ClassroomDto> {
        public Guid Id { get; set; }
    }
}

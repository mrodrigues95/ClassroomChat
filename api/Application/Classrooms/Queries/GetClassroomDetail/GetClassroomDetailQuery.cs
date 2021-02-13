using Application.Common;
using Application.Common.Dtos;
using MediatR;
using System;

namespace Application.Classrooms.Queries.GetClassroomDetail {
    public class GetClassroomDetailQuery : IRequest<Result<ClassroomDto>> {
        public Guid Id { get; set; }
    }
}

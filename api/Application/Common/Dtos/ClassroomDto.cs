using System;
using System.Collections.Generic;

namespace Application.Common.Dtos {
    public class ClassroomDto {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int DiscussionsCount { get; set; }
    }

    public class ClassroomsListDto {
        public List<ClassroomDto> Classrooms { get; set; }
        public int ClassroomsCount { get; set; }
    }
}

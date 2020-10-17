using System.Collections.Generic;

namespace Application.Classrooms.Queries.GetClassroomsList {
    public class ClassroomsListDto {
        public List<ClassroomDto> Classrooms { get; set; }
        public int ClassroomCount { get; set; }
    }
}

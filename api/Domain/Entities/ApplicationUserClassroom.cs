using System;

namespace Domain.Entities {
    public class ApplicationUserClassroom {
        public string ApplicationUserId { get; set; }
        public Guid ClassroomId { get; set; }
        public bool IsCreator { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual Classroom Classroom { get; set; }

        public ApplicationUserClassroom() { }

        public ApplicationUserClassroom(string applicationUserId, 
            Guid classroomId, 
            bool isCreator,
            ApplicationUser applicationUser,
            Classroom classroom) {
            ApplicationUserId = applicationUserId;
            ClassroomId = classroomId;
            IsCreator = isCreator;
            ApplicationUser = applicationUser;
            Classroom = classroom;
        }
    }
}

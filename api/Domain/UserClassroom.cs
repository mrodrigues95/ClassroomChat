using System;

namespace Domain {
    public class UserClassroom {
        public string AppUserId { get; set; }
        public Guid ClassroomId { get; set; }
        public bool IsCreator { get; set; }

        public virtual AppUser AppUser { get; set; }
        public virtual Classroom Classroom { get; set; }
    }
}

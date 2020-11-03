using System;

namespace Domain {
    public class ClassroomDiscussion {
        public string AppUserId { get; set; }
        public Guid ClassroomId { get; set; }
        public Guid DiscussionId { get; set; }

        public virtual AppUser AppUser { get; set; }
        public virtual Classroom Classroom { get; set; }
        public virtual Discussion Discussion { get; set; }
    }
}

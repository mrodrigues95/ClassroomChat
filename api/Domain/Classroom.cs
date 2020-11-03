using System;
using System.Collections.Generic;

namespace Domain {
    public class Classroom {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<UserClassroom> UserClassrooms { get; set; }
        public virtual ICollection<UserInviteLink> UserInviteLinks { get; set; }
        public virtual ICollection<ClassroomDiscussion> ClassroomDiscussions { get; set; }
    }
}

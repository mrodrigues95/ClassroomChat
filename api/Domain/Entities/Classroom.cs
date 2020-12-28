using System;
using System.Collections.Generic;

namespace Domain.Entities {
    public class Classroom {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public bool ActiveInd { get; set; } = true;
        public int DiscussionsCount { get; set; }
        public virtual ApplicationUser CreatedBy { get; set; }

        public Classroom() { }

        public Classroom(string name,
            int discussionsCount,
            ApplicationUser createdBy) {
            Name = name;
            DiscussionsCount = discussionsCount;
            CreatedBy = createdBy;
        }

        public virtual ICollection<ApplicationUserClassroom> ApplicationUserClassrooms { get; set; }
        public virtual ICollection<Discussion> Discussions { get; set; }
        public virtual ICollection<InviteLink> InviteLinks { get; set; }
    }
}

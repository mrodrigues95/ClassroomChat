using System;
using System.Collections.Generic;

namespace Domain {
    public class Discussion {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<ClassroomDiscussion> ClassroomDiscussions { get; set; }
        public virtual ICollection<DiscussionMessage> Messages { get; set; }
    }
}

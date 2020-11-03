using System;

namespace Domain {
    public class DiscussionMessage {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual AppUser Author { get; set; }
        public virtual Discussion Discussion { get; set; }
    }
}

using System;

namespace Domain.Entities {
    public class Message {
        public Guid Id { get; set; }
        public int CursorId { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public virtual ApplicationUser CreatedBy { get; set; }
        public virtual Discussion Discussion { get; set; }

        public Message() { }

        public Message(Discussion discussion, ApplicationUser createdBy, string body) {
            Discussion = discussion;
            CreatedBy = createdBy;
            Body = body;
        }
    }
}

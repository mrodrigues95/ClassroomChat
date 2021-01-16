using System;

namespace Application.Messages.Discussions {
    public class DiscussionMessageDto {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Name { get; set; }
    }
}

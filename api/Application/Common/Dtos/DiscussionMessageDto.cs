using System;
using System.Collections.Generic;

namespace Application.Common.Dtos {
    public class DiscussionMessageDto {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
    }

    public class DiscussionMessagesListDto {
        public DiscussionDto Discussion { get; set; }
        public ICollection<DiscussionMessageDto> Messages { get; set; }
    }
}

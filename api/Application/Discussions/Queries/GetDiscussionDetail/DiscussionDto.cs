using Application.Messages.Discussions;
using System;
using System.Collections.Generic;

namespace Application.Classrooms.Discussions {
    public class DiscussionDto {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<DiscussionMessageDto> DiscussionMessages { get; set; }
    }
}

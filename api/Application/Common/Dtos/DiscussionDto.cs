using System;

namespace Application.Common.Dtos {
    public class DiscussionDto {
        public Guid Id { get; set; }
        public Guid ClassroomId { get; set; }
        public string Name { get; set; }
    }
}

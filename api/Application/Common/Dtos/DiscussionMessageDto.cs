using System;
using System.Runtime.Serialization;

namespace Application.Common.Dtos {
    public class DiscussionMessageDto {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedByImageUrl { get; set; }
        [IgnoreDataMember]
        // This property is required in order to set the correct Pagination header
        // in HttpExtensions but we do not care about returning it in the payload.
        public int CursorId { get; set; }
    }
}

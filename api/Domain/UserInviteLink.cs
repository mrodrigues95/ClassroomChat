using System;

namespace Domain {
    public class UserInviteLink {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid InviteLinkId { get; set; }
        public virtual InviteLink InviteLink { get; set; }
        public Guid ClassroomId { get; set; }
        public virtual Classroom Classroom { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

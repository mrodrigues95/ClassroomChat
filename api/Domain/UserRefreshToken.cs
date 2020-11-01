using System;

namespace Domain {
    public class UserRefreshToken {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid RefreshTokenId { get; set; }
        public virtual RefreshToken RefreshToken { get; set; }
    }
}

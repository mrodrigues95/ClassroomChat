using System;

namespace Domain.Entities {
    // TODO: Add activity reporting (e.g. requested on, geographical location, etc).
    public class RefreshToken {
        public Guid Id { get; set; }
        public string Token { get; set; }
        public DateTime ExpiresAt { get; set; } = DateTime.UtcNow.AddDays(7);
        public bool IsExpired => DateTime.UtcNow >= ExpiresAt;
        public DateTime? RevokedAt { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}

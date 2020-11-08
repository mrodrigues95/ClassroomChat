using System;
using System.Collections.Generic;

namespace Domain {
    // TODO: Add activity reporting (e.g. requested on, geographical location, etc).
    public class RefreshToken {
        public Guid Id { get; set; }
        public string Token { get; set; }
        public DateTime ExpiresAt { get; set; }

        public virtual ICollection<UserRefreshToken> UserRefreshTokens { get; set; }
    }
}

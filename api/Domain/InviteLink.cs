using System;
using System.Collections.Generic;

namespace Domain {
    public class InviteLink {
        public Guid Id { get; set; }
        public string Token { get; set; }
        public DateTime ExpiryDate { get; set; }
        public bool ExpireAfterFirstUse { get; set; }
        public int Hits { get; set; }
        public virtual ICollection<UserInviteLink> UserInviteLinks { get; set; }
    }
}

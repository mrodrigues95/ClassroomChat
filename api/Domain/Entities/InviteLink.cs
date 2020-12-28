using System;

namespace Domain.Entities {
    public class InviteLink {
        public Guid Id { get; set; }
        public string Token { get; set; }
        public DateTime ExpiryDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool ExpireAfterFirstUse { get; set; }
        public int Hits { get; set; }
        public virtual ApplicationUser CreatedBy { get; set; }
        public virtual Classroom Classroom { get; set; }
    }
}

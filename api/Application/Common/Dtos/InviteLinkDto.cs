using System;

namespace Application.Common.Dtos {
    public class InviteLinkDto {
        public Guid Id { get; set; }
        public string Token { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}

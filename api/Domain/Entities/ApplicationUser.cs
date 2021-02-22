using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Domain.Entities {
    public class ApplicationUser : IdentityUser {
        public string Name { get; set; }

        public virtual ICollection<ApplicationUserClassroom> ApplicationUserClassrooms { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
        public virtual ICollection<RefreshToken> RefreshTokens { get; set; }
        public virtual ICollection<InviteLink> InviteLinks { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
    }
}
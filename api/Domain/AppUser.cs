using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Domain {
    public class AppUser : IdentityUser {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public virtual ICollection<UserRefreshToken> UserRefreshTokens { get; set; }
        public virtual ICollection<UserClassroom> UserClassrooms { get; set; }
        public virtual ICollection<UserInviteLink> UserInviteLinks { get; set; }
        public virtual ICollection<ClassroomDiscussion> ClassroomDiscussions { get; set; }
    }
}
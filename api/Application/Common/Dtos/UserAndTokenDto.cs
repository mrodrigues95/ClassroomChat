using Application.User;
using System;

namespace Application.Common.Dtos {
    public class UserAndTokenDto {
        public UserDto User { get; set; }
        public string AccessToken { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}

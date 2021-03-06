﻿using Application.Common;
using Application.Common.Dtos;
using MediatR;

namespace Application.Auth.Commands.RegisterNewUser {
    public class RegisterNewUserCommand : IRequest<Result<UserAndTokenDto>> {
        public string Name { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

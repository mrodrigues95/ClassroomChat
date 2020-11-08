﻿using Application.User;
using Application.User.Queries.GetCurrentUserDetail;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator) {
            _mediator = mediator;
        }

        // GET api/user
        [HttpGet]
        public async Task<ActionResult<UserDto>> Get() {
            return Ok(await _mediator.Send(new GetCurrentUserDetailQuery()));
        }
    }
}

using Application.Common.Interfaces;
using Application.Discussions.Commands.CreateDiscussionMessage;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace classroom_messenger_api.SignalR {
    // TODO: This should be strongly typed.
    public class DiscussionHub : Hub {
        private readonly IMediator _mediator;
        private readonly IUserAccessor _userAccessor;

        public DiscussionHub(IMediator mediator, IUserAccessor userAccessor) {
            _mediator = mediator;
            _userAccessor = userAccessor;
        }

        public override async Task OnConnectedAsync() {
            await Clients.Caller.SendAsync("ConnectionSuccess", "Connected successfully!");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception) {
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(CreateDiscussionMessageCommand command) {
            var message = await _mediator.Send(command);
            await Clients.Group(command.DiscussionId.ToString()).SendAsync("ReceiveMessage", message);
        }

        public async Task SubscribeToDiscussion(Guid discussionId) {
            await Groups.AddToGroupAsync(Context.ConnectionId, discussionId.ToString());
            await Clients.Group(discussionId.ToString()).SendAsync("JoinDiscussion", $"{_userAccessor.GetCurrentUsername()} has joined the discussion!");
        }
        
        public async Task UnsubscribeFromDiscussion(Guid discussionId) {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, discussionId.ToString());
            await Clients.Group(discussionId.ToString()).SendAsync("LeaveDiscussion", "has left the discussion!");
        }
    }
}

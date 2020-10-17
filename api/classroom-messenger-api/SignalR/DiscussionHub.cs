using Application.Messages.Discussions.CreateDiscussionMessage;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace classroom_messenger_api.SignalR {
    public class DiscussionHub : Hub {
        private readonly IMediator _mediator;

        public DiscussionHub(IMediator mediator) {
            _mediator = mediator;
        }

        public async Task SendMessage(CreateDiscussionMessageCommand command) {
            string username = GetUsername();

            command.Username = username;

            var message = await _mediator.Send(command);

            await Clients.Group(command.DiscussionId.ToString()).SendAsync("ReceiveMessage", message);
        }

        public async Task AddToDiscussion(string groupName) {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            var username = GetUsername();

            await Clients.Group(groupName).SendAsync("Send", $"{username} has joined the discussion.");
        }

        public async Task RemoveFromDiscussion(string groupName) {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            var username = GetUsername();

            await Clients.Group(groupName).SendAsync("Send", $"{username} has left the discussion.");
        }

        private string GetUsername() {
            return Context.User?.Claims?.FirstOrDefault(x => x.Type ==
                ClaimTypes.NameIdentifier)?.Value;
        }
    }
}

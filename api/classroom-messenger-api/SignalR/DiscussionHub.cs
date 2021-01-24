using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace classroom_messenger_api.SignalR {
    // TODO: This should be strongly typed.
    // Look into making an interface.
    public class DiscussionHub : Hub {
        public override async Task OnConnectedAsync() {
            await Clients.Caller.SendAsync("ConnectionSuccess", "Connected successfully!");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception) {
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SubscribeToDiscussion(Guid discussionId, string name) {
            await Groups.AddToGroupAsync(Context.ConnectionId, discussionId.ToString());
            await Clients.Caller.SendAsync("JoinedDiscussion", $"{name} has joined the discussion!");
        }
    }
}

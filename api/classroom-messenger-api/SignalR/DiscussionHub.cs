using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace classroom_messenger_api.SignalR {
    public class DiscussionHub : Hub {
        public override async Task OnConnectedAsync() {
            await Clients.Caller.SendAsync("Discussion", "Connected successfully!");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception) {
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SubscribeToDiscussion(Guid discussionId) {
            await Groups.AddToGroupAsync(Context.ConnectionId, discussionId.ToString());
            await Clients.Caller.SendAsync("Discussion", $"{GetUsername()} has joined the discussion!");
        }

        private string GetUsername() {
            return Context.User?.Identity?.Name;
        }
    }
}

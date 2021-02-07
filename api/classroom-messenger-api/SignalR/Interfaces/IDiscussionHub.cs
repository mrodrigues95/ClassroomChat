using Application.Common.Dtos;
using System.Threading.Tasks;

namespace classroom_messenger_api.SignalR.Interfaces {
    public interface IDiscussionHub {
        Task ConnectionSuccess(string message);
        Task ReceiveMessage(DiscussionMessageDto newMessage);
        Task JoinDiscussion(string message);
        Task LeaveDiscussion(string message);
    }
}

using AutoMapper;
using Domain.Entities;

namespace Application.Messages.Discussions {
    public class MappingProfile : Profile {
        public MappingProfile() {
            CreateMap<Message, DiscussionMessageDto>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.CreatedBy.Name));
        }
    }
}

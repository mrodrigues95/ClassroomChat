using AutoMapper;
using Domain;

namespace Application.Messages.Discussions {
    public class MappingProfile : Profile {
        public MappingProfile() {
            CreateMap<DiscussionMessage, DiscussionMessageDto>()
                .ForMember(d => d.Email, o => o.MapFrom(s => s.Author.Email))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Author.Name));
        }
    }
}

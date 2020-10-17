using AutoMapper;
using Domain;

namespace Application.Messages.Discussions {
    public class MappingProfile : Profile {
        public MappingProfile() {
            CreateMap<DiscussionMessage, DiscussionMessageDto>()
                .ForMember(d => d.Email, o => o.MapFrom(s => s.Author.Email))
                .ForMember(d => d.FirstName, o => o.MapFrom(s => s.Author.FirstName))
                .ForMember(d => d.LastName, o => o.MapFrom(s => s.Author.LastName));
        }
    }
}

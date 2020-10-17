using AutoMapper;
using Domain;

namespace Application.Invites {
    public class MappingProfile : Profile {
        public MappingProfile() {
            CreateMap<InviteLink, InviteLinkDto>();
        }
    }
}

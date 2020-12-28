using AutoMapper;
using Domain.Entities;

namespace Application.Invites {
    public class MappingProfile : Profile {
        public MappingProfile() {
            CreateMap<InviteLink, InviteLinkDto>();
        }
    }
}

using Application.Classrooms;
using Application.Common.Dtos;
using AutoMapper;
using Domain.Entities;
using System.Linq;

namespace Application.Common {
    public class MappingProfiles : Profile {
        public MappingProfiles() {
            CreateMap<Classroom, ClassroomDto>();
            CreateMap<Discussion, DiscussionDto>();
            CreateMap<Message, DiscussionMessageDto>()
                .ForMember(d => d.CreatedBy, o => o.MapFrom(s => s.CreatedBy.Name));
            CreateMap<InviteLink, InviteLinkDto>();
            CreateMap<ApplicationUserClassroom, StudentDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.ApplicationUser.UserName))
                .ForMember(d => d.Email, o => o.MapFrom(s => s.ApplicationUser.Email));
            CreateMap<ApplicationUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}

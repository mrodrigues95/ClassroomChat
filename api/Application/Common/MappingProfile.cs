using Application.Classrooms;
using Application.Common.Dtos;
using AutoMapper;
using Domain.Entities;

namespace Application.Common {
    public class MappingProfile : Profile {
        public MappingProfile() {
            CreateMap<Classroom, ClassroomDto>();
            CreateMap<Discussion, DiscussionDto>();
            CreateMap<Message, DiscussionMessageDto>()
                .ForMember(x => x.CreatedBy, o => o.MapFrom(s => s.CreatedBy.Name));
            CreateMap<InviteLink, InviteLinkDto>();
            CreateMap<ApplicationUserClassroom, StudentDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.ApplicationUser.UserName))
                .ForMember(d => d.Email, o => o.MapFrom(s => s.ApplicationUser.Email));
        }
    }
}

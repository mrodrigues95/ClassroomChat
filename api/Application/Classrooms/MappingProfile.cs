using Application.Classrooms.Discussions;
using AutoMapper;
using Domain;

namespace Application.Classrooms {
    public class MappingProfile : Profile {
        public MappingProfile() {
            CreateMap<Classroom, ClassroomDto>();
            CreateMap<Discussion, DiscussionDto>()
                .ForMember(d => d.DiscussionMessages, o => o.MapFrom(s => s.Messages));
            CreateMap<UserClassroom, StudentDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Email, o => o.MapFrom(s => s.AppUser.Email));
            CreateMap<ClassroomDiscussion, DiscussionDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Discussion.Id))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Discussion.Name));
        }
    }
}

using Application.Classrooms;
using Application.Common.Dtos;
using Application.User;
using Domain.Entities;
using System.Linq;

namespace Application.Common {
    public class MappingProfiles : AutoMapper.Profile {
        public MappingProfiles() {
            CreateMap<Classroom, ClassroomDto>();
            CreateMap<Discussion, DiscussionDto>();
            CreateMap<Message, DiscussionMessageDto>()
                .ForMember(d => d.CreatedBy, o => o.MapFrom(s => s.CreatedBy.Name))
                .ForMember(d => d.CreatedByImageUrl, o => o.MapFrom(s => s.CreatedBy.Photos.FirstOrDefault(x => x.IsCurrentUserPhoto).Url))
                .ForMember(d => d.Cursor, o => o.MapFrom(x => x.SequentialId));
            CreateMap<InviteLink, InviteLinkDto>();
            CreateMap<ApplicationUserClassroom, StudentDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.ApplicationUser.UserName))
                .ForMember(d => d.Email, o => o.MapFrom(s => s.ApplicationUser.Email));
            CreateMap<ApplicationUser, UserDto>()
                .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsCurrentUserPhoto).Url));
        }
    }
}

﻿using Application.Common.Dtos;
using AutoMapper;
using Domain.Entities;

namespace Application.Classrooms {
    public class MappingProfile : Profile {
        public MappingProfile() {
            CreateMap<Classroom, ClassroomDto>();
            CreateMap<Discussion, DiscussionDto>();
            CreateMap<ApplicationUserClassroom, StudentDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.ApplicationUser.UserName))
                .ForMember(d => d.Email, o => o.MapFrom(s => s.ApplicationUser.Email));
        }
    }
}

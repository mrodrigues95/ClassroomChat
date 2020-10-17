using Application.Classrooms.Discussions;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.Classrooms {
    public class ClassroomDto {
        public Guid Id { get; set; }
        public string Name { get; set; }
        [JsonPropertyName("users")]
        public ICollection<StudentDto> UserClassrooms { get; set; }
        [JsonPropertyName("discussions")]
        public ICollection<DiscussionDto> ClassroomDiscussions { get; set; }
    }
}

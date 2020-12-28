using System;
using System.Collections.Generic;

namespace Domain.Entities {
    public class Discussion {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public virtual Classroom Classroom { get; set; }
        public virtual ApplicationUser CreatedBy { get; set; }

        public Discussion() { }

        public Discussion(string name, 
            Classroom classroom, 
            ApplicationUser createdBy) {
            Name = name;
            Classroom = classroom;
            CreatedBy = createdBy;
        }

        public virtual ICollection<Message> Messages { get; set; }
    }
}

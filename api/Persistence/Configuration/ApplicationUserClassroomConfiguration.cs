using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration {
    public class ApplicationUserClassroomConfiguration : IEntityTypeConfiguration<ApplicationUserClassroom> {
        public void Configure(EntityTypeBuilder<ApplicationUserClassroom> builder) {
            builder.HasKey(auc => new { auc.ApplicationUserId, auc.ClassroomId });

            builder.HasOne(auc => auc.ApplicationUser)
                .WithMany(au => au.ApplicationUserClassrooms)
                .HasForeignKey(auc => auc.ApplicationUserId)
                .IsRequired();

            builder.HasOne(auc => auc.Classroom)
                .WithMany(c => c.ApplicationUserClassrooms)
                .HasForeignKey(auc => auc.ClassroomId)
                .IsRequired();

            builder.Property(auc => auc.IsCreator)
                .IsRequired();
        }
    }
}

using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration {
    public class ClassroomConfiguration : IEntityTypeConfiguration<Classroom> {
        public void Configure(EntityTypeBuilder<Classroom> builder) {
            builder.HasKey(c => c.Id);

            builder.HasMany(c => c.Discussions)
                .WithOne(d => d.Classroom)
                .IsRequired();

            builder.HasMany(c => c.InviteLinks)
                .WithOne(il => il.Classroom)
                .IsRequired();

            builder.Property(c => c.Name)
                .IsRequired();

            builder.Property(c => c.CreatedAt)
                .IsRequired();

            builder.Property(c => c.ActiveInd)
                .IsRequired();
        }
    }
}

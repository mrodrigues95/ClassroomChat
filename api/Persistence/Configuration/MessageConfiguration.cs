using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration {
    public class MessageConfiguration : IEntityTypeConfiguration<Message> {
        public void Configure(EntityTypeBuilder<Message> builder) {
            builder.HasKey(m => m.Id);
            builder.HasIndex(m => m.CursorId);

            builder.Property(m => m.Body)
                .IsRequired()
                .HasMaxLength(512);

            builder.Property(m => m.CursorId)
                .ValueGeneratedOnAdd();
        }
    }
}

using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration {
    public class MessageConfiguration : IEntityTypeConfiguration<Message> {
        public void Configure(EntityTypeBuilder<Message> builder) {
            builder.HasKey(m => m.Id);
            builder.HasIndex(m => m.SequentialId);

            builder.Property(m => m.Body)
                .IsRequired();

            builder.Property(m => m.SequentialId)
                .ValueGeneratedOnAdd();
        }
    }
}

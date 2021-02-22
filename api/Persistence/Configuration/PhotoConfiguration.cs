using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration {
    public class PhotoConfiguration : IEntityTypeConfiguration<Photo> {
        public void Configure(EntityTypeBuilder<Photo> builder) {
            builder.HasKey(r => r.Id);
        }
    }
}

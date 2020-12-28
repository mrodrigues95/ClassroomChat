using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration {
    public class DiscussionConfiguration : IEntityTypeConfiguration<Discussion> {
        public void Configure(EntityTypeBuilder<Discussion> builder) {
            builder.HasKey(d => d.Id);
        }
    }
}

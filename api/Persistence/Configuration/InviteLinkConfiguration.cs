using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration {
    public class InviteLinkConfiguration : IEntityTypeConfiguration<InviteLink> {
        public void Configure(EntityTypeBuilder<InviteLink> builder) {
            builder.HasKey(il => il.Id);
        }
    }
}

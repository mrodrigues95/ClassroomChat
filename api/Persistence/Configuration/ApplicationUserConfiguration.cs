using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration {
    public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser> {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder) {
            builder.HasMany(au => au.Messages)
                .WithOne(m => m.CreatedBy)
                .IsRequired();

            builder.HasMany(au => au.RefreshTokens)
                .WithOne(r => r.ApplicationUser)
                .IsRequired();

            builder.HasMany(au => au.InviteLinks)
                .WithOne(il => il.CreatedBy)
                .IsRequired();
        }
    }
}

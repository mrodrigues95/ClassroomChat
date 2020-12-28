﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration {
    public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken> {
        public void Configure(EntityTypeBuilder<RefreshToken> builder) {
            builder.HasKey(r => r.Id);

            builder.Property(x => x.Token)
                .IsRequired();
        }
    }
}

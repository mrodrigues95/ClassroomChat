using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Persistence {
    public class ApplicationContext : IdentityDbContext<ApplicationUser> {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<Discussion> Discussions { get; set; }
        public DbSet<InviteLink> InviteLinks { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<ApplicationUserClassroom> ApplicationUserClassrooms { get; set; }

        protected override void OnModelCreating(ModelBuilder builder) {            
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}

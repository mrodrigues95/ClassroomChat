using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence {
    public class DataContext : IdentityDbContext<AppUser> {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<Discussion> Discussions { get; set; }
        public DbSet<InviteLink> InviteLinks { get; set; }
        public DbSet<UserClassroom> UserClassrooms { get; set; }
        public DbSet<UserInviteLink> UserInviteLinks { get; set; }
        public DbSet<ClassroomDiscussion> ClassroomDiscussions { get; set; }
        public DbSet<DiscussionMessage> DiscussionMessages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder) {
            // This will give our AppUser a primary key during migrations.
            base.OnModelCreating(builder);

            // Configure the relationship between Users and Classrooms.
            builder.Entity<UserClassroom>(x => x.HasKey(uc =>
                new { uc.AppUserId, uc.ClassroomId }));
            builder.Entity<UserClassroom>()
                .HasOne(u => u.AppUser)
                .WithMany(c => c.UserClassrooms)
                .HasForeignKey(u => u.AppUserId);
            builder.Entity<UserClassroom>()
                .HasOne(c => c.Classroom)
                .WithMany(u => u.UserClassrooms)
                .HasForeignKey(c => c.ClassroomId);

            // Configure the relationship between Classrooms and Discussions.
            builder.Entity<ClassroomDiscussion>(x => x.HasKey(cd =>
                new { cd.AppUserId, cd.DiscussionId }));
            builder.Entity<ClassroomDiscussion>()
                .HasOne(u => u.AppUser)
                .WithMany(d => d.ClassroomDiscussions)
                .HasForeignKey(u => u.AppUserId);
            builder.Entity<ClassroomDiscussion>()
                .HasOne(d => d.Discussion)
                .WithMany(c => c.ClassroomDiscussions)
                .HasForeignKey(d => d.DiscussionId);

            // Configure the relationship between Users and Invite Links.
            builder.Entity<UserInviteLink>(x => x.HasKey(ul =>
                new { ul.AppUserId, ul.InviteLinkId }));
            builder.Entity<UserInviteLink>()
                .HasOne(u => u.AppUser)
                .WithMany(i => i.UserInviteLinks)
                .HasForeignKey(u => u.AppUserId);
            builder.Entity<UserInviteLink>()
                .HasOne(i => i.InviteLink)
                .WithMany(u => u.UserInviteLinks)
                .HasForeignKey(i => i.InviteLinkId);
            builder.Entity<UserInviteLink>()
                .HasOne(c => c.Classroom)
                .WithMany(u => u.UserInviteLinks)
                .HasForeignKey(c => c.ClassroomId);
        }
    }
}

using Domain;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Persistence {
    /// <summary>
    /// Populate the database with data.
    /// </summary>
    public class Seed {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager) {
            // Populate users table.
            if (!userManager.Users.Any()) {
                var users = new List<AppUser> {
                    new AppUser {
                        Id = "a",
                        FirstName = "John",
                        LastName = "Doe",
                        UserName = "johndoe@test.com",
                        Email = "johndoe@test.com"
                    },
                    new AppUser {
                        Id = "b",
                        FirstName = "Jack",
                        LastName = "Black",
                        UserName = "jackblack@test.com",
                        Email = "jackblack@test.com"
                    },
                    new AppUser {
                        Id = "c",
                        FirstName = "Debbie",
                        LastName = "Ray",
                        UserName = "debbieray@test.com",
                        Email = "debbieray@test.com"
                    },
                };
                foreach (var user in users) {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            // Populate classrooms table.
            if (!context.Classrooms.Any()) {
                var classrooms = new List<Classroom> {
                    new Classroom {
                        Name = "Conestoga ITID",
                        UserClassrooms = new List<UserClassroom> {
                            new UserClassroom {
                                AppUserId = "a",
                                IsCreator = true,
                            }
                        },
                    },
                    new Classroom {
                        Name = "Computer Programming",
                        UserClassrooms = new List<UserClassroom> {
                            new UserClassroom {
                                AppUserId = "b",
                                IsCreator = true,
                            },
                            new UserClassroom {
                                AppUserId = "a",
                                IsCreator = false,
                            }
                        }
                    },
                    new Classroom {
                        Name = "Graphic Design",
                        UserClassrooms = new List<UserClassroom> {
                            new UserClassroom {
                                AppUserId = "c",
                                IsCreator = true,
                            },
                            new UserClassroom {
                                AppUserId = "b",
                                IsCreator = false,
                            }
                        }
                    }
                };
                context.Classrooms.AddRange(classrooms);
                context.SaveChanges();
            }

            // Populate discussions table.
            if (!context.Discussions.Any()) {
                var discussions = new List<Discussion> {
                    new Discussion {
                        Name = "general chat",
                        ClassroomDiscussions = new List<ClassroomDiscussion> {
                            new ClassroomDiscussion {
                                AppUserId = "a",
                                ClassroomId = context.Classrooms.FirstOrDefault(x =>
                                    x.Name == "Conestoga ITID").Id
                            }
                        }
                    },
                    new Discussion {
                        Name = "assignment help",
                        ClassroomDiscussions = new List<ClassroomDiscussion> {
                            new ClassroomDiscussion {
                                AppUserId = "a",
                                ClassroomId = context.Classrooms.FirstOrDefault(x =>
                                    x.Name == "Conestoga ITID").Id
                            },
                            new ClassroomDiscussion {
                                AppUserId = "b",
                                ClassroomId = context.Classrooms.FirstOrDefault(x =>
                                    x.Name == "Computer Programming").Id
                            }
                        }
                    },
                    new Discussion {
                        Name = "other",
                        ClassroomDiscussions = new List<ClassroomDiscussion> {
                            new ClassroomDiscussion {
                                AppUserId = "c",
                                ClassroomId = context.Classrooms.FirstOrDefault(x =>
                                    x.Name == "Graphic Design").Id
                            }
                        }
                    }
                };
                context.Discussions.AddRange(discussions);
                context.SaveChanges();
            }
        }
    }
}

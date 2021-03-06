﻿using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Domain.Entities;
using System;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Persistence.Helpers;

namespace Persistence {
    public class ApplicationContextSeed {
        public static async Task SeedDataAsync(ApplicationContext context, UserManager<ApplicationUser> userManager, 
            ILoggerFactory loggerFactory, int? retry = 0) {
            int retryForAvailability = retry.Value;

            try {
                if (!await userManager.Users.AnyAsync()) {
                    foreach (var user in GetPreconfiguredApplicationUsers()) {
                        await userManager.CreateAsync(user, "Pa$$w0rd");
                    }
                    await context.SaveChangesAsync();
                }

                if (!await context.Classrooms.AnyAsync()) {
                    await context.Classrooms.AddRangeAsync(GetPreconfiguredClassrooms(context));
                    await context.SaveChangesAsync();
                }

                if (!await context.Discussions.AnyAsync()) {
                    await context.Discussions.AddRangeAsync(GetPreconfiguredDiscussions(context));
                    await context.SaveChangesAsync();
                }

                if (!await context.ApplicationUserClassrooms.AnyAsync()) {
                    await context.ApplicationUserClassrooms.AddRangeAsync(GetPreConfiguredApplicationUserClassrooms(context));
                    await context.SaveChangesAsync();
                }

                if (!await context.Messages.AnyAsync()) {
                    await context.Messages.AddRangeAsync(GetPreConfiguredDiscussionMessages(context));
                    await context.SaveChangesAsync();
                }
            } catch (Exception ex) {
                if (retryForAvailability < 10) {
                    retryForAvailability++;
                    var log = loggerFactory.CreateLogger<ApplicationContextSeed>();
                    log.LogError(ex.Message);
                    await SeedDataAsync(context, userManager, loggerFactory, retryForAvailability);
                }
                throw;
            }

            static IEnumerable<ApplicationUser> GetPreconfiguredApplicationUsers() {
                return new List<ApplicationUser>() {
                    new ApplicationUser {
                        Id = "a",
                        Name = "John Doe",
                        UserName = "johndoe@test.com",
                        Email = "johndoe@test.com",
                    },
                    new ApplicationUser {
                        Id = "b",
                        Name = "Jack Black",
                        UserName = "jackblack@test.com",
                        Email = "jackblack@test.com",
                    },
                    new ApplicationUser {
                        Id = "c",
                        Name = "Debbie Ray",
                        UserName = "debbieray@test.com",
                        Email = "debbieray@test.com",
                    },
                };
            }

            static IEnumerable<Classroom> GetPreconfiguredClassrooms(ApplicationContext context) {
                return new List<Classroom>() {
                    new Classroom("Introduction to C#", 1, GetApplicationUser(context, 0)),
                    new Classroom("Computer Programming", 2, GetApplicationUser(context, 1)),
                    new Classroom("Graphic Design", 1, GetApplicationUser(context, 2)),
                };
            }

            static IEnumerable<Discussion> GetPreconfiguredDiscussions(ApplicationContext context) {
                return new List<Discussion>() {
                    new Discussion("General chat", GetClassroom(context, 0), GetApplicationUser(context, 0)),
                    new Discussion("Assignment help", GetClassroom(context, 1), GetApplicationUser(context, 1)),
                    new Discussion("Other", GetClassroom(context, 2), GetApplicationUser(context, 2)),
                };
            }

            static IEnumerable<ApplicationUserClassroom> GetPreConfiguredApplicationUserClassrooms(ApplicationContext context) {
                return new List<ApplicationUserClassroom>() {
                    new ApplicationUserClassroom(GetApplicationUser(context, 0).Id, GetClassroom(context, 0).Id, true, GetApplicationUser(context, 0), GetClassroom(context, 0)),
                    new ApplicationUserClassroom(GetApplicationUser(context, 0).Id, GetClassroom(context, 1).Id, true, GetApplicationUser(context, 0), GetClassroom(context, 1)),
                    new ApplicationUserClassroom(GetApplicationUser(context, 0).Id, GetClassroom(context, 2).Id, true, GetApplicationUser(context, 0), GetClassroom(context, 2)),
                    new ApplicationUserClassroom(GetApplicationUser(context, 1).Id, GetClassroom(context, 1).Id, true, GetApplicationUser(context, 1), GetClassroom(context, 1)),
                    new ApplicationUserClassroom(GetApplicationUser(context, 2).Id, GetClassroom(context, 2).Id, false, GetApplicationUser(context, 2), GetClassroom(context, 2)),
                };
            }

            static IEnumerable<Message> GetPreConfiguredDiscussionMessages(ApplicationContext context) {
                var messages = new List<Message>();
                for (int i = 0; i < 200; ++i) {
                    messages.Add(new Message(GetDiscussion(context, 0), GetApplicationUser(context, 0), RandomMessageGenerator.Generate(1, 1, 5, 1, 20)));
                }
                return messages;
            }

            static ApplicationUser GetApplicationUser(ApplicationContext context, int skip) {
                return context.ApplicationUsers.OrderBy(x => x.Id).Skip(skip).First();
            }

            static Classroom GetClassroom(ApplicationContext context, int skip) {
                return context.Classrooms.OrderBy(x => x.Id).Skip(skip).First();
            }

            static Discussion GetDiscussion(ApplicationContext context, int skip) {
                return context.Discussions.OrderBy(x => x.Id).Skip(skip).First();
            }
        }
    }
}

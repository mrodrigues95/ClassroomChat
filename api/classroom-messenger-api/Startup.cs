using Application.Auth;
using Application.Common.Interfaces;
using AutoMapper;
using classroom_messenger_api.Middleware;
using classroom_messenger_api.SignalR;
using Domain.Entities;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Text;
using System.Threading.Tasks;

namespace classroom_messenger_api {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureDevelopmentServices(IServiceCollection services) {
            // Use In-Memory database.
            //ConfigureInMemoryDatabases(services);

            // Use real database.
            ConfigureProductionServices(services);
        }

        private void ConfigureInMemoryDatabases(IServiceCollection services) {
            services.AddDbContext<ApplicationContext>(opt =>
                opt.UseInMemoryDatabase("ClassroomChat"));

            ConfigureServices(services);
        }

        private void ConfigureProductionServices(IServiceCollection services) {
            services.AddDbContext<ApplicationContext>(opt => {
                opt.UseLazyLoadingProxies();
                opt.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
            });

            ConfigureServices(services);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => {
                    policy
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins("http://localhost:3000")
                        .AllowCredentials();
                });
            });
            services.AddMediatR(typeof(LoginUserQueryHandler).Assembly);
            services.AddAutoMapper(typeof(LoginUserQueryHandler).Assembly);
            services.AddSignalR();
            services.AddControllers(opt => {
                // This makes it so any of our requests will require authorization.
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddFluentValidation(cfg => {
                    cfg.RegisterValidatorsFromAssemblyContaining<LoginUserQueryHandler>();
                })
                .AddNewtonsoftJson(opt => {
                    opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });           

            // Configure Identity.
            var builder = services.AddIdentityCore<ApplicationUser>();
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<Persistence.ApplicationContext>();
            identityBuilder.AddSignInManager<SignInManager<ApplicationUser>>();

            // Enable authentication.
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt => {
                    opt.TokenValidationParameters = new TokenValidationParameters {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateAudience = false,
                        ValidateIssuer = false
                    };
                    opt.Events = new JwtBearerEvents {
                        OnMessageReceived = context => {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken)
                                && (path.StartsWithSegments("/chat"))) {
                                context.Token = accessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddScoped<IJwtManager, JwtManager>();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IHttpContextManager, HttpContextManager>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            app.UseMiddleware<ErrorHandlingMiddleware>();
            if (env.IsDevelopment()) {
                //app.UseDeveloperExceptionPage();
            }
            //app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();
                
            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
                endpoints.MapHub<DiscussionHub>("/chat");
            });
        }
    }
}

using Application.Auth;
using classroom_messenger_api.Extensions;
using classroom_messenger_api.Middleware;
using classroom_messenger_api.SignalR;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Persistence;

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
                opt.UseSnakeCaseNamingConvention();
            });
            ConfigureServices(services);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.AddControllers(opt => {
                // This makes it so any of our routes will require authorization by default.
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddFluentValidation(cfg => {
                    cfg.RegisterValidatorsFromAssemblyContaining<LoginUserQueryHandler>();
                })
                .AddNewtonsoftJson(opt => {
                    opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });
            services.AddApplicationServices(Configuration);
            services.AddIdentityServices(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            app.UseMiddleware<ExceptionHandlingMiddleware>();

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
                endpoints.MapDefaultControllerRoute();
                endpoints.MapHub<DiscussionHub>("/discussionhub");
            });
        }
    }
}

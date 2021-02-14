﻿using Application.Auth;
using Application.Common.Interfaces;
using AutoMapper;
using Infrastructure.Security;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace classroom_messenger_api.Extensions {
    public static class ApplicationServiceExtensions {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
           IConfiguration config) {
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
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IHttpContextManager, HttpContextManager>();

            return services;
        }
    }
}
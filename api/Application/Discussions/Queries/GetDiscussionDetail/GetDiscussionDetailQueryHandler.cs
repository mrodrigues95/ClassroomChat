﻿using Application.Common.Dtos;
using Application.Discussions.Queries.GetDiscussionDetail;
using Application.Errors;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Persistence;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Classrooms.Discussions {
    /// <summary>
    /// Get the details of a given discussion.
    /// </summary>
    public class GetDiscussionDetailQueryHandler : IRequestHandler<GetDiscussionDetailQuery, DiscussionDto> {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;

        public GetDiscussionDetailQueryHandler(ApplicationContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        public async Task<DiscussionDto> Handle(GetDiscussionDetailQuery request, CancellationToken cancellationToken) {
            var discussion = await _context.Discussions.FindAsync(request.Id);
            if (discussion == null) throw new RestException(HttpStatusCode.NotFound, new { Discussion = "Not found." });
            return _mapper.Map<Discussion, DiscussionDto>(discussion);
        }
    }
}

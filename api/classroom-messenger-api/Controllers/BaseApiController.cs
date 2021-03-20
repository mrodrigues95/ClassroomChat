using Application.Common;
using Application.Common.Paging;
using classroom_messenger_api.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace classroom_messenger_api.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices
            .GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result) {
            if (result == null) return NotFound();
            if (result.IsSuccess && result.Value != null) return Ok(result.Value);
            if (result.IsSuccess && result.Value == null) return NotFound();
            if (result.IsUnauthorized) return Unauthorized(result.Error);
            return BadRequest(result.Error);
        }

        protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result) {
            if (result == null) return NotFound();
            if (result.IsSuccess && result.Value != null) {
                if (result.Value.IsOffsetLimitPagination) {
                    Response.AddPaginationHeader(result.Value.OffsetLimitAttributes.CurrentPage,
                        result.Value.OffsetLimitAttributes.PageSize, result.Value.OffsetLimitAttributes.TotalCount,
                        result.Value.OffsetLimitAttributes.TotalPages);
                    return Ok(result.Value);
                } else if (result.Value.IsCursorBasedPagination) {
                    Response.AddPaginationHeader(result.Value.CursorAttributes.PreviousCursor,
                        result.Value.CursorAttributes.NextCursor);
                    return Ok(result.Value);
                }
            }
            if (result.IsSuccess && result.Value == null) return NotFound();
            if (result.IsUnauthorized) return Unauthorized(result.Error);
            return BadRequest(result.Error);
        }
    }
}
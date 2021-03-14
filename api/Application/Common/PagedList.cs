using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Common {
    public class PagedList<T> : List<T> {
        public PagedList(List<T> items, int count, int pageNumber, int pageSize) {
            OffsetLimitAttributes = new OffsetLimitHelper() {
                CurrentPage = pageNumber,
                TotalPages = (int) Math.Ceiling(count / (double) pageSize),
                PageSize = pageSize,
                TotalCount = count
            };
            AddRange(items);
        }

        public PagedList(List<T> items, string previousCursor, string nextCursor) {
            CursorAttributes = new CursorHelper() {
                PreviousCursor = previousCursor,
                NextCursor = nextCursor
            };
            // Since we always execute pageSize + 1, that means an extra record will be
            // returned when a next cursor is available.
            // If we do have a next cursor, then just remove the last record from the list.
            if (!string.IsNullOrEmpty(nextCursor)) items.RemoveAt(items.Count - 1);
            AddRange(items);
        }

        public OffsetLimitHelper OffsetLimitAttributes { get; set; }
        public CursorHelper CursorAttributes { get; set; }
        public bool IsOffsetLimitPagination => OffsetLimitAttributes != null;
        public bool IsCursorBasedPagination => CursorAttributes != null;

        /// <summary>
        /// A generic method for applying traditional offset limit based pagination.
        /// </summary>
        /// <param name="source">The base queryable to apply pagination to.</param>
        /// <param name="pageNumber">The current page.</param>
        /// <param name="pageSize">The number of items to retrieve for the new page.</param>
        public static async Task<PagedList<T>> CreateOffsetAsync(IQueryable<T> source, int pageNumber,
            int pageSize) {
            var count = await source.CountAsync();
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }

        /// <summary>
        /// A generic method for applying cursor based pagination.
        /// </summary>
        /// <param name="source">The base queryable to apply pagination to.</param>
        /// <param name="cursor">The cursor for the next page.</param>
        /// <param name="pageSize">The number of items to retrieve.</param>
        /// <param name="filterOn">The name of the column you are filtering on.</param>
        public static async Task<PagedList<T>> CreateCursorAsync(IQueryable<T> source, string cursor, 
            int pageSize, string filterOn) {
            var items = await source.Take(pageSize + 1).ToListAsync();
            var isFirstPage = cursor is null;
            var isLastPage = items.Any() ? items.Count <= pageSize : true;

            if (isFirstPage && isLastPage) {
                return new PagedList<T>(items, "", "");
            } else if (isFirstPage) {
                return new PagedList<T>(items, "", GetNextPageCursor(items, filterOn));
            } else if (isLastPage) {
                return new PagedList<T>(items, cursor, "");
            }

            return new PagedList<T>(items, cursor, GetNextPageCursor(items, filterOn));
        }

        /// <summary>
        /// Finds the next cursor in the data set. This method should only be called after
        /// the initial query has been executed and must contain a next page.
        /// </summary>
        /// <param name="items">The data set that was returned from the query.</param>
        /// <param name="column">The name of the column you are filtering on.</param>
        /// <returns>The next cursor for the data set.</returns>
        private static string GetNextPageCursor(List<T> items, string column) {
            try {
                var property = items.Last().GetType().GetProperty(column);
                var cursor = property.GetValue(items.Last(), null).ToString();
                return cursor;
            } catch {
                throw new Exception("Unable to find column while attempting to retrieve the next cursor. " +
                    "Please check that the column name matches the exact property name on the object.");
            }
        } 
    }
}

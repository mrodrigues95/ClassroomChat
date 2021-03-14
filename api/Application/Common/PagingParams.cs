namespace Application.Common {
    public class PagingParams {
        private const int MaxPageSize = 50;
        public int Page { get; set; } = 1;

        private int _pageSize = 10;
        public int Size {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string Cursor { get; set; }
    }
}

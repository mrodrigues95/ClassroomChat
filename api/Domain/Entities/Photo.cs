namespace Domain.Entities {
    public class Photo {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsCurrentUserPhoto { get; set; }
        public bool IsCloudinaryStaticPhoto { get; set; } = false;
    }
}

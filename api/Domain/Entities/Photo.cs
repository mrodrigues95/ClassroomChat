namespace Domain.Entities {
    public class Photo {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsCurrentUserPhoto { get; set; }
        public bool IsCloudinaryStaticPhoto { get; set; } = false;

        public Photo() { }

        public Photo(string id, string url, bool isCurrentUserPhoto, bool isCloudinaryStaticPhoto) {
            Id = id;
            Url = url;
            IsCurrentUserPhoto = isCurrentUserPhoto;
            IsCloudinaryStaticPhoto = isCloudinaryStaticPhoto;
        }
    }
}
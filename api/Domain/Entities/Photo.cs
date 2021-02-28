namespace Domain.Entities {
    public class Photo {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsCurrentProfilePhoto { get; set; }
        public bool IsDefaultAvatar { get; set; } = false;
    }
}

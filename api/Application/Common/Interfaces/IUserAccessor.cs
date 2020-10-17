namespace Application.Interfaces {
    /// <summary>
    /// Retrieve the current sessions username from the JSON Web Token
    /// that is passed inside the header.
    /// </summary>
    public interface IUserAccessor {
        string GetCurrentUsername();
    }
}

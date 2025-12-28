using System.ComponentModel.DataAnnotations;

namespace JWTRefreshToken.NET6._0.Auth
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }        

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
       
        public string? PhoneNumber { get; set; }
    }
}

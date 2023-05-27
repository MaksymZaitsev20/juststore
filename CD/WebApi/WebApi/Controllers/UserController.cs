using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApi.Controllers;

[Route("api/account/user/[action]")]
[ApiController]
public class UserController : ControllerBase
{
    private const string SuperHardHardcodedUsername = "username123";

    [HttpPost("{username}")]
    public async Task<ActionResult<string>> Login([FromRoute] string username)
    {
        if (HttpContext.User.Identity?.IsAuthenticated == true)
        {
            return Ok("Already authenticated");
        }

        if (username != SuperHardHardcodedUsername)
        {
            return BadRequest("Username failed");
        }

        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, username),
            new(ClaimTypes.Role, "admin")
        };

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var user = new ClaimsPrincipal(identity);

        var authProperties = new AuthenticationProperties
        {
            Parameters =
            {
                ["testAuthParam"] = "true"
            }
        };

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, user, authProperties);

        return "OK";
    }

    [HttpPost]
    [Authorize]
    public async Task<string> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        return "OK";
    }
}
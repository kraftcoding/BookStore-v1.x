using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VersionController : ControllerBase
{
    [HttpGet]
    public async Task<string> Get()
    {
        var task = new Func<Task<string>>(async () => "0.1");
        var taskResult = await task();
       
        return taskResult;
    }
}
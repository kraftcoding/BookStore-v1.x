using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly BooksService _booksService;

    public BooksController(BooksService booksService) =>
        _booksService = booksService;

    [HttpGet]    
    public async Task<List<Book>> Get() =>
        await _booksService.GetAsync();

    [HttpGet]
    [Route("search/{title}")]
    public async Task<List<Book>> Search(string title)
    {
        var book = await _booksService.GetByTitleAsync(title);

        if (book is null)
        {
            return null;
        }

        return book;
    }


    [Authorize]
    [HttpGet("{id:length(24)}")]   
    public async Task<ActionResult<Book>> Get(string id)
    {
        var book = await _booksService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        return book;
    }

    [Authorize]
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Post(Book newBook)
    {
        await _booksService.CreateAsync(newBook);

        return CreatedAtAction(nameof(Get), new { id = newBook.Id }, newBook);
    }

    [Authorize]    
    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<IActionResult> Update(Book updatedBook)
    {
        var book = await _booksService.GetAsync(updatedBook.Id);

        if (book is null)
        {
            return NotFound();
        }

        //updatedBook.Id = book.Id;

        await _booksService.UpdateAsync(updatedBook.Id, updatedBook);

        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id:length(24)}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(string id)
    {
        var book = await _booksService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        await _booksService.RemoveAsync(id);

        return NoContent();
    }
}
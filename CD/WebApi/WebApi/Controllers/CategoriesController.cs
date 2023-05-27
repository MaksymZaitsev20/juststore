using Microsoft.AspNetCore.Mvc;
using WebApi.Repositories.Categories;

namespace WebApi.Controllers;

[Route("api/categories")]
[ApiController]
public class CategoriesController : ControllerBase
{
    private readonly ICategoriesRepository _repository;

    public CategoriesController(ICategoriesRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<string>>> GetAllCategories()
    {
        var categories = await _repository.GetAllCategoriesAsync();

        if (categories is null)
        {
            return NotFound();
        }

        if (!categories.Any())
        {
            return NoContent();
        }

        return Ok(categories);
    }
}
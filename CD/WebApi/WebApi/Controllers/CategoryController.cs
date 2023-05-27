using Microsoft.AspNetCore.Mvc;
using WebApi.Repositories.Categories;

namespace WebApi.Controllers;

[Route("api/categories")]
[ApiController]
public class CategoryController : ControllerBase
{
    private readonly ICategoryRepository _repository;

    public CategoryController(ICategoryRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<string>), 200)]
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
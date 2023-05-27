using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Repositories.Products;

namespace WebApi.Controllers;

[Route("api/products")]
[ApiController]
[Authorize]
public class ProductsController : ControllerBase
{
    private readonly IProductsRepository _productsRepository;

    public ProductsController(IProductsRepository productsRepository)
    {
        _productsRepository = productsRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts()
    {
        var products = await _productsRepository.GetAllProductsAsync();

        if (products is null)
        {
            return NotFound();
        }
        
        if (!products.Any())
        {
            return NoContent();
        }

        return Ok(products);
    }

    [HttpGet("{productId:int}")]
    public async Task<ActionResult<Product>> GetProduct([FromRoute] int productId)
    {
        var product = await _productsRepository.GetProductAsync(productId);

        return Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<int>> CreateProduct(Product product)
    {
        var createdProductId = await _productsRepository.CreateProductAsync(product);

        return Ok(createdProductId);
    }

    [HttpPut("{productId:int}")]
    public async Task<ActionResult> UpdateProduct([FromRoute] int productId, Product product)
    {
        product.Id = productId;
        await _productsRepository.UpdateProductAsync(product);

        return Ok();
    }

    [HttpDelete("{productId:int}")]
    public async Task<ActionResult> DeleteProduct([FromRoute] int productId)
    {
        await _productsRepository.DeleteProductAsync(productId);

        return Ok();
    }
}
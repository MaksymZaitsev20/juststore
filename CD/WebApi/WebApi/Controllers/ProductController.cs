using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Repositories.Products;

namespace WebApi.Controllers;

[Route("api/products")]
[ApiController]
[Authorize]
public class ProductController : ControllerBase
{
    private readonly IProductRepository _productRepository;

    public ProductController(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Product>), 200)]
    public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts()
    {
        var products = await _productRepository.GetAllProductsAsync();

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
    [ProducesResponseType(typeof(Product), 200)]
    public async Task<ActionResult<Product>> GetProduct([FromRoute] int productId)
    {
        var product = await _productRepository.GetProductAsync(productId);

        return Ok(product);
    }

    [HttpPost]
    [ProducesResponseType(typeof(int), 200)]
    public async Task<ActionResult<int>> CreateProduct([FromBody] Product product)
    {
        var createdProductId = await _productRepository.CreateProductAsync(product);

        return Ok(createdProductId);
    }

    [HttpPut("{productId:int}")]
    [ProducesResponseType(typeof(void), 200)]
    public async Task<ActionResult> UpdateProduct([FromRoute] int productId, [FromBody] Product product)
    {
        product.Id = productId;
        await _productRepository.UpdateProductAsync(product);

        return Ok();
    }

    [HttpDelete("{productId:int}")]
    [ProducesResponseType(typeof(void), 200)]
    public async Task<ActionResult> DeleteProduct([FromRoute] int productId)
    {
        await _productRepository.DeleteProductAsync(productId);

        return Ok();
    }
}
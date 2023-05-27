using WebApi.Models;

namespace WebApi.Repositories.Products;

public interface IProductsRepository
{
    public Task<IEnumerable<Product>> GetAllProductsAsync();
    public Task<Product> GetProductAsync(int productId);
    public Task<int> CreateProductAsync(Product product);
    public Task UpdateProductAsync(Product product);
    public Task DeleteProductAsync(int productId);
}
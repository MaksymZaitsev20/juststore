using Dapper;
using System.Data.SqlClient;
using WebApi.Models;
using WebApi.Repositories.Categories;

namespace WebApi.Repositories.Products;

public class ProductsRepository : IProductsRepository
{
    private readonly IConfiguration _configuration;
    private readonly ICategoriesRepository _categoryRepository;

    public ProductsRepository(IConfiguration configuration, ICategoriesRepository repository)
    {
        _configuration = configuration;
        _categoryRepository = repository;
    }

    public async Task<IEnumerable<Product>> GetAllProductsAsync()
    {
        await using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        var products = await connection.QueryAsync<Product>(
            @"SELECT Products.Id, Products.Name, ImageUrl, Price, Description, Categories.Name AS Category
                 FROM Products
                     JOIN Categories ON Products.CategoryId = Categories.Id");

        return products;
    }

    public async Task<Product> GetProductAsync(int productId)
    {
        await using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        var product =
            await connection.QueryFirstOrDefaultAsync<Product>(
                @"SELECT Products.Id, Products.Name, ImageUrl, Price, Description, Categories.Name AS Category
                     FROM Products
                        JOIN Categories ON Products.CategoryId = Categories.Id
                     WHERE Products.Id = @Id",
                new { Id = productId });

        return product;
    }

    public async Task<int> CreateProductAsync(Product product)
    {
        await using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        var categoryId = await _categoryRepository.GetCategoryIdAsync(product.Category);
        if (categoryId == 0)
        {
            categoryId = await _categoryRepository.CreateCategoryAsync(product.Category);
        }

        var createdProductId = await connection.QuerySingleAsync<int>(
            @"INSERT INTO Products(Name, ImageUrl, Price, Description, CategoryId) OUTPUT INSERTED.Id
                    VALUES(@Name, @ImageUrl, @Price, @Description, @CategoryId)",
            new
            {
                Name = product.Name,
                ImageUrl = product.ImageUrl,
                Price = product.Price,
                Description = product.Description,
                CategoryId = categoryId
            });

        return createdProductId;
    }

    public async Task UpdateProductAsync(Product product)
    {
        await using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        var categoryId = await _categoryRepository.GetCategoryIdAsync(product.Category);
        if (categoryId == 0)
        {
            categoryId = await _categoryRepository.CreateCategoryAsync(product.Category);
        }

        await connection.ExecuteAsync(
            @"UPDATE Products
                 SET Name = @Name, ImageUrl = @ImageUrl, Price = @Price, Description = @Description, CategoryId = @CategoryId
                 WHERE Id = @Id",
            new
            {
                Id = product.Id,
                Name = product.Name,
                ImageUrl = product.ImageUrl,
                Price = product.Price,
                Description = product.Description,
                CategoryId = categoryId
            });
    }

    public async Task DeleteProductAsync(int productId)
    {
        await using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        await connection.ExecuteAsync("DELETE FROM Products WHERE Id = @Id", new { Id = productId });
    }
}
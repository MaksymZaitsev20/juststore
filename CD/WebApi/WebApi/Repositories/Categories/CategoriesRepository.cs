using Dapper;
using System.Data.SqlClient;

namespace WebApi.Repositories.Categories;

public class CategoriesRepository : ICategoriesRepository
{
    private readonly IConfiguration _configuration;

    public CategoriesRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<IEnumerable<string>> GetAllCategoriesAsync()
    {
        await using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        var products = await connection.QueryAsync<string>("SELECT Name FROM Categories");

        return products;
    }

    public async Task<int?> GetCategoryIdAsync(string categoryName)
    {
        await using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        var categoryId = await connection.QueryFirstOrDefaultAsync<int>(
            "SELECT Id FROM Categories WHERE Name = @Name",
            new { Name = categoryName });

        return categoryId;
    }

    /// <summary>
    /// Creates new category
    /// </summary>
    /// <param name="categoryName"></param>
    /// <returns>Created product id</returns>
    public async Task<int> CreateCategoryAsync(string categoryName)
    {
        await using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        var categoryId = await connection.QueryFirstAsync<int>(
            "INSERT INTO Categories(Name) OUTPUT INSERTED.Id VALUES(@CategoryName)",
            new { CategoryName = categoryName });

        return categoryId;
    }
}
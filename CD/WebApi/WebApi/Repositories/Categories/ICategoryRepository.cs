namespace WebApi.Repositories.Categories;

public interface ICategoryRepository
{
    public Task<IEnumerable<string>> GetAllCategoriesAsync();
    public Task<int?> GetCategoryIdAsync(string categoryName);
    public Task<int> CreateCategoryAsync(string categoryName);
}
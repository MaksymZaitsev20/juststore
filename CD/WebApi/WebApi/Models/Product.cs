using System.ComponentModel.DataAnnotations;

namespace WebApi.Models;

public class Product
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100, ErrorMessage = "Name cannot be longer than 100 characters")]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string ImageUrl { get; set; } = string.Empty;

    [Required]
    [Range(0, int.MaxValue, ErrorMessage = "Price cannot be less than 0")]
    public decimal Price { get; set; } = decimal.Zero;

    [Required]
    [MaxLength(2000, ErrorMessage = "Description cannot be longer than 2000 symbols")]
    public string Description { get; set; } = string.Empty;

    [Required]
    public string Category { get; set; } = string.Empty;
}
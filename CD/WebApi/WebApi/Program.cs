using Microsoft.AspNetCore.Authentication.Cookies;
using WebApi.Infrastructure.Middlewares;
using WebApi.Repositories.Categories;
using WebApi.Repositories.Products;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<ICategoriesRepository, CategoriesRepository>();
builder.Services.AddScoped<IProductsRepository, ProductsRepository>();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options => options.ExpireTimeSpan = TimeSpan.FromMinutes(20));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerDocument(settings =>
{
    settings.PostProcess = document =>
    {
        document.Info.Version = "v1";
        document.Info.Title = "Example API";
        document.Info.Description = "REST API for example.";
    };
});

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(
        options => options.AddDefaultPolicy(
            policy => policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()));
}

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    // app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseOpenApi();
app.UseSwaggerUi3();

app.UseCors();

app.MapControllers();

app.Run();
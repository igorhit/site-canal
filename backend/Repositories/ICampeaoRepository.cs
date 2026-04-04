using backend.Models;

namespace backend.Repositories;

public interface ICampeaoRepository
{
    Task<IEnumerable<Campeao>> GetAllAsync();
    Task<Campeao?> GetBySlugAsync(string slug);
}

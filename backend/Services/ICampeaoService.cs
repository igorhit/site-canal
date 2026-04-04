using backend.DTOs;

namespace backend.Services;

public interface ICampeaoService
{
    Task<IEnumerable<CampeaoResumoDto>> GetAllAsync();
    Task<CampeaoDetalheDto?> GetBySlugAsync(string slug);
}

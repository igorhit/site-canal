using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class CampeaoRepository(AppDbContext db) : ICampeaoRepository
{
    public async Task<IEnumerable<Campeao>> GetAllAsync() =>
        await db.Campeoes.OrderBy(c => c.Nome).ToListAsync();

    public async Task<Campeao?> GetBySlugAsync(string slug) =>
        await db.Campeoes
            .Include(c => c.Builds)
                .ThenInclude(b => b.TipoBuild)
            .Include(c => c.Builds)
                .ThenInclude(b => b.Reliquia1)
            .Include(c => c.Builds)
                .ThenInclude(b => b.Reliquia2)
            .Include(c => c.Builds)
                .ThenInclude(b => b.Reliquia3)
            .FirstOrDefaultAsync(c => c.Slug == slug);
}

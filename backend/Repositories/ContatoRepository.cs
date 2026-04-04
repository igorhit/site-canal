using backend.Data;
using backend.Models;

namespace backend.Repositories;

public class ContatoRepository(AppDbContext db) : IContatoRepository
{
    public async Task AddAsync(MensagemRecrutador mensagem)
    {
        db.MensagensRecrutadores.Add(mensagem);
        await db.SaveChangesAsync();
    }
}

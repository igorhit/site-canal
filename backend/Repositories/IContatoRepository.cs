using backend.Models;

namespace backend.Repositories;

public interface IContatoRepository
{
    Task AddAsync(MensagemRecrutador mensagem);
}

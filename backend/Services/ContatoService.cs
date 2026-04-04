using backend.DTOs;
using backend.Models;
using backend.Repositories;

namespace backend.Services;

public class ContatoService(IContatoRepository repository) : IContatoService
{
    public async Task EnviarAsync(ContatoDto dto)
    {
        var mensagem = new MensagemRecrutador
        {
            Nome = dto.Nome,
            Email = dto.Email,
            Mensagem = dto.Mensagem
        };
        await repository.AddAsync(mensagem);
    }
}

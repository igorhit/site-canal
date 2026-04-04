using backend.DTOs;

namespace backend.Services;

public interface IContatoService
{
    Task EnviarAsync(ContatoDto dto);
}

using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContatoController(IContatoService service) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Enviar([FromBody] ContatoDto dto)
    {
        await service.EnviarAsync(dto);
        return Ok(new { mensagem = "Mensagem enviada com sucesso!" });
    }
}

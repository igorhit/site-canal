using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public record ContatoDto(
    [Required, MaxLength(150)] string Nome,
    [Required, EmailAddress, MaxLength(150)] string Email,
    [Required, MaxLength(2000)] string Mensagem
);

namespace backend.DTOs;

public record ReliquiaDto(
    int Id,
    string Nome,
    string? Raridade,
    string? Descricao,
    string? Imagem
);

public record BuildDto(
    int Id,
    string TipoBuild,
    string? Descricao,
    ReliquiaDto Reliquia1,
    ReliquiaDto Reliquia2,
    ReliquiaDto Reliquia3
);

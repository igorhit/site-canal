namespace backend.DTOs;

public record CampeaoResumoDto(
    int Id,
    string Nome,
    string Slug,
    string? Imagem
);

public record CampeaoDetalheDto(
    int Id,
    string Nome,
    string Slug,
    string? Regiao1,
    string? Regiao2,
    string? Estrelas,
    string? Bonus,
    string? Imagem,
    string? Background,
    string? Carta1,
    string? Carta2,
    IEnumerable<BuildDto> Builds
);

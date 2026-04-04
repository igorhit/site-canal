namespace backend.Models;

public class Campeao
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Regiao1 { get; set; }
    public string? Regiao2 { get; set; }
    public string? Estrelas { get; set; }
    public string? Bonus { get; set; }
    public string? Imagem { get; set; }
    public string? Background { get; set; }
    public string? Carta1 { get; set; }
    public string? Carta2 { get; set; }

    public ICollection<Build> Builds { get; set; } = [];
}

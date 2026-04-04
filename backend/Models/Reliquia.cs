namespace backend.Models;

public class Reliquia
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string? Raridade { get; set; }
    public string? Descricao { get; set; }
    public string? Imagem { get; set; }
}

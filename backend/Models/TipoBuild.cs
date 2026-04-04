namespace backend.Models;

public class TipoBuild
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;

    public ICollection<Build> Builds { get; set; } = [];
}

namespace backend.Models;

public class Build
{
    public int Id { get; set; }
    public string? Descricao { get; set; }

    public int CampeaoId { get; set; }
    public Campeao Campeao { get; set; } = null!;

    public int TipoBuildId { get; set; }
    public TipoBuild TipoBuild { get; set; } = null!;

    public int Reliquia1Id { get; set; }
    public Reliquia Reliquia1 { get; set; } = null!;

    public int Reliquia2Id { get; set; }
    public Reliquia Reliquia2 { get; set; } = null!;

    public int Reliquia3Id { get; set; }
    public Reliquia Reliquia3 { get; set; } = null!;
}

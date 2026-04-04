using backend.DTOs;
using backend.Repositories;

namespace backend.Services;

public class CampeaoService(ICampeaoRepository repository) : ICampeaoService
{
    public async Task<IEnumerable<CampeaoResumoDto>> GetAllAsync()
    {
        var campeoes = await repository.GetAllAsync();
        return campeoes.Select(c => new CampeaoResumoDto(c.Id, c.Nome, c.Slug, c.Imagem));
    }

    public async Task<CampeaoDetalheDto?> GetBySlugAsync(string slug)
    {
        var campeao = await repository.GetBySlugAsync(slug);
        if (campeao is null) return null;

        var builds = campeao.Builds.Select(b => new BuildDto(
            b.Id,
            b.TipoBuild.Descricao,
            b.Descricao,
            new ReliquiaDto(b.Reliquia1.Id, b.Reliquia1.Nome, b.Reliquia1.Raridade, b.Reliquia1.Descricao, b.Reliquia1.Imagem),
            new ReliquiaDto(b.Reliquia2.Id, b.Reliquia2.Nome, b.Reliquia2.Raridade, b.Reliquia2.Descricao, b.Reliquia2.Imagem),
            new ReliquiaDto(b.Reliquia3.Id, b.Reliquia3.Nome, b.Reliquia3.Raridade, b.Reliquia3.Descricao, b.Reliquia3.Imagem)
        ));

        return new CampeaoDetalheDto(
            campeao.Id,
            campeao.Nome,
            campeao.Slug,
            campeao.Regiao1,
            campeao.Regiao2,
            campeao.Estrelas,
            campeao.Bonus,
            campeao.Imagem,
            campeao.Background,
            campeao.Carta1,
            campeao.Carta2,
            builds
        );
    }
}

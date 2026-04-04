import BuildCard from "@/components/BuildCard";
import CartasCarousel from "@/components/CartasCarousel";
import ContatoForm from "@/components/ContatoForm";
import ItensCard from "@/components/ItensCard";
import { mockCampeaoDetalhe } from "@/lib/mock-data";

export default function CampeaoPage({ params }: { params: { slug: string } }) {
  const campeao = mockCampeaoDetalhe;

  return (
    <>
      {/* Hero: side by side */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {campeao.background ? (
            <img src={campeao.background} alt="" className="w-full h-full object-cover opacity-15" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1a2035] via-[#0d1220] to-[#0a0e1a]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">

            {/* Esquerda: carrossel */}
            <div className="w-full lg:w-[55%]">
              <CartasCarousel cartas={campeao.cartas} nomeBase={campeao.nome} />
            </div>

            {/* Direita: info */}
            <div className="w-full lg:w-[45%] flex flex-col gap-6">
              {/* Nome */}
              <div>
                <p className="text-[#c89b3c] text-xs uppercase tracking-[0.3em] mb-2">Campeão</p>
                <h1 className="text-6xl font-bold text-[#e8d5b0] leading-none mb-4">
                  {campeao.nome}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  {campeao.regiao1 && (
                    <span className="text-[#a89070] text-sm border border-[#c89b3c]/25 rounded-full px-4 py-1">
                      {campeao.regiao1}
                    </span>
                  )}
                  {campeao.regiao2 && (
                    <span className="text-[#a89070] text-sm border border-[#c89b3c]/25 rounded-full px-4 py-1">
                      {campeao.regiao2}
                    </span>
                  )}
                </div>
              </div>

              {/* Divisor */}
              <div className="h-px bg-gradient-to-r from-[#c89b3c]/30 to-transparent" />

              {/* Poderes estelares */}
              <div className="flex flex-col gap-1.5">
                <p className="text-[#a89070] text-xs uppercase tracking-wider mb-2">Poderes Estelares</p>
                {campeao.poderes.map((p) => {
                  const rows = Math.ceil(p.estrela / 3);
                  return (
                    <div key={p.estrela} className="flex items-start gap-3">
                      <div className="flex flex-col items-end shrink-0 w-9 leading-none gap-px">
                        {Array.from({ length: rows }).map((_, r) => (
                          <span key={r} className="text-[#c89b3c] text-xs leading-4">
                            {"★".repeat(r < rows - 1 ? 3 : p.estrela - r * 3)}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#e8d5b0] text-sm leading-5">{p.nome}</span>
                        <span className="text-[#a89070] text-xs leading-tight">{p.descricao}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <a
                href="#builds"
                className="mt-2 inline-flex items-center gap-2 text-[#c89b3c] hover:text-[#e8c870] text-sm transition-colors"
              >
                Ver builds
                <span className="text-lg leading-none">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Builds */}
      <section id="builds" className="max-w-7xl mx-auto px-4 pt-4 pb-10">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-[#c89b3c] font-bold text-xl uppercase tracking-widest">Builds</h2>
          <div className="flex-1 h-px bg-[#c89b3c]/20" />
        </div>
        <div className="flex flex-col gap-6">
          {campeao.builds.map((build) => (
            <BuildCard key={build.id} {...build} />
          ))}
        </div>
      </section>

      {/* Itens e Regras Especiais */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-[#c89b3c] font-bold text-xl uppercase tracking-widest">Itens e Regras Especiais</h2>
          <div className="flex-1 h-px bg-[#c89b3c]/20" />
        </div>
        <ItensCard itens={campeao.itensERegras} />
      </section>

      {/* Divisor */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#c89b3c]/30 to-transparent" />
      </div>

      <ContatoForm />
    </>
  );
}

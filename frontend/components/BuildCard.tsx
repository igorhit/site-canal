interface Reliquia {
  id: number;
  nome: string;
  raridade: string | null;
  descricao: string | null;
  imagem: string | null;
}

interface Props {
  tipoBuild: string;
  descricao: string | null;
  reliquia1: Reliquia;
  reliquia2: Reliquia;
  reliquia3: Reliquia;
}

const raridadeCor: Record<string, string> = {
  Épica: "text-[#9b59b6] border-[#9b59b6]/40",
  Rara: "text-[#3498db] border-[#3498db]/40",
  Comum: "text-[#7f8c8d] border-[#7f8c8d]/40",
};

function ReliquiaSlot({ reliquia }: { reliquia: Reliquia }) {
  const initials = reliquia.nome.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="group relative flex flex-col items-center gap-2">
      {reliquia.imagem ? (
        <img
          src={reliquia.imagem}
          alt={reliquia.nome}
          className="w-24 h-24 sm:w-32 sm:h-32 lg:w-44 lg:h-44 object-contain transition-all duration-200 group-hover:scale-110"
        />
      ) : (
        <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-44 lg:h-44 flex items-center justify-center">
          <span className="text-3xl font-bold text-[#e8d5b0] opacity-60">{initials}</span>
        </div>
      )}
      <p className="text-xs text-[#e8d5b0] text-center w-24 sm:w-32 lg:w-44 leading-tight">{reliquia.nome}</p>
      {reliquia.descricao && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-[#0a0e1a] border border-[#c89b3c]/30 rounded p-2 text-xs text-[#a89070] hidden group-hover:block z-10 shadow-xl">
          {reliquia.descricao}
        </div>
      )}
    </div>
  );
}

export default function BuildCard({ tipoBuild, descricao, reliquia1, reliquia2, reliquia3 }: Props) {
  return (
    <div className="gold-border bg-[#111827] rounded-xl p-6 transition-all duration-300 hover:gold-glow">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Relíquias */}
        <div className="flex gap-6 shrink-0">
          <ReliquiaSlot reliquia={reliquia1} />
          <ReliquiaSlot reliquia={reliquia2} />
          <ReliquiaSlot reliquia={reliquia3} />
        </div>

        {/* Título + descrição */}
        <div className="flex flex-col gap-3 min-w-0">
          <h3 className="text-[#c89b3c] font-bold text-lg uppercase tracking-wider">
            {tipoBuild}
          </h3>
          {descricao && (
            <p className="text-[#a89070] text-sm leading-relaxed">
              {descricao}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

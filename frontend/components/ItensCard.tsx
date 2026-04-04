interface Item {
  id: number;
  nome: string;
  imagem: string | null;
  descricao: string;
}

interface Props {
  itens: Item[];
}

export default function ItensCard({ itens }: Props) {
  return (
    <div className="gold-border bg-[#111827] rounded-xl p-6 transition-all duration-300 hover:gold-glow">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Imagens */}
        <div className="flex flex-wrap gap-3 lg:w-64 shrink-0 content-start">
          {itens.map((item) => (
            <div key={item.id} className="group relative">
              {item.imagem ? (
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="w-16 h-16 object-contain transition-all duration-200 group-hover:scale-110"
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#e8d5b0] opacity-60">
                    {item.nome.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-52 bg-[#0a0e1a] border border-[#c89b3c]/30 rounded p-2 text-xs text-[#a89070] hidden group-hover:block z-10 shadow-xl pointer-events-none">
                <p className="text-[#e8d5b0] font-medium mb-1">{item.nome}</p>
                {item.descricao}
              </div>
            </div>
          ))}
        </div>

        {/* Descrições */}
        <div className="flex flex-col gap-3 min-w-0">
          {itens.map((item) => (
            <div key={item.id} className="flex items-start gap-2">
              <span className="text-[#c89b3c] mt-1 shrink-0">•</span>
              <p className="text-sm text-[#a89070] leading-relaxed">
                <span className="text-[#e8d5b0] font-medium">{item.nome}:</span>{" "}
                {item.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

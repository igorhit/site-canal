import Link from "next/link";

interface Props {
  id: number;
  nome: string;
  slug: string;
  imagem: string | null;
}

export default function CampeaoCard({ nome, slug, imagem }: Props) {
  const initials = nome.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <Link href={`/campeoes/${slug}`}>
      <div className="gold-border bg-[#111827] rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer group">
        <div className="aspect-square relative bg-gradient-to-br from-[#1a2035] to-[#0a0e1a] flex items-center justify-center">
          {imagem ? (
            <img src={imagem} alt={nome} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl font-bold text-[#c89b3c]/40 group-hover:text-[#c89b3c]/70 transition-colors">
              {initials}
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
        </div>
        <div className="p-3">
          <p className="text-[#e8d5b0] font-semibold text-sm text-center group-hover:text-[#c89b3c] transition-colors truncate">
            {nome}
          </p>
        </div>
      </div>
    </Link>
  );
}

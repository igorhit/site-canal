import CampeaoCard from "@/components/CampeaoCard";
import ContatoForm from "@/components/ContatoForm";
import { mockCampeoes } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#c89b3c]/5 via-transparent to-[#0a0e1a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#c89b3c08_0%,_transparent_70%)]" />
        <div className="relative z-10">
          <p className="text-[#c89b3c] text-sm uppercase tracking-[0.3em] mb-4">Legends of Runeterra</p>
          <h1 className="text-5xl md:text-7xl font-bold text-[#e8d5b0] mb-6 leading-tight">
            Caminho dos <span className="text-[#c89b3c]">Campeões</span>
          </h1>
          <p className="text-[#a89070] text-lg max-w-xl mx-auto leading-relaxed">
            Guias completos de builds para cada campeão. Relíquias, estratégias e tutoriais para dominar as aventuras.
          </p>
        </div>
      </section>

      {/* Grade de campeões */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-[#c89b3c] font-bold text-xl uppercase tracking-widest">Campeões</h2>
          <div className="flex-1 h-px bg-[#c89b3c]/20" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {mockCampeoes.map((c) => (
            <CampeaoCard key={c.id} {...c} />
          ))}
        </div>
      </section>

      {/* Divisor */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#c89b3c]/30 to-transparent" />
      </div>

      {/* Formulário de contato */}
      <ContatoForm />
    </>
  );
}

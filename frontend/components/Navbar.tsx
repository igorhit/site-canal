"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { mockCampeoes } from "@/lib/mock-data";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const results = query.length > 1
    ? mockCampeoes.filter((c) =>
        c.nome.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const slugMatch = pathname.match(/^\/campeoes\/(.+)$/);
  const currentSlug = slugMatch ? slugMatch[1] : null;
  const currentCampeao = currentSlug
    ? mockCampeoes.find((c) => c.slug.toLowerCase() === currentSlug.toLowerCase())
    : null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a]/90 backdrop-blur-sm border-b border-[#c89b3c]/20">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4 min-w-0">

        {/* Logo + breadcrumb */}
        <div className="flex items-center gap-2 min-w-0 shrink">
          <Link href="/" className="text-[#c89b3c] font-bold text-xl tracking-widest uppercase hover:text-[#e8c870] transition-colors whitespace-nowrap shrink-0">
            CdC Builds
          </Link>
          {currentCampeao && (
            <>
              <span className="text-[#c89b3c]/40 text-lg shrink-0">›</span>
              <span className="text-[#e8d5b0] text-sm truncate">{currentCampeao.nome}</span>
            </>
          )}
        </div>

        {/* Busca */}
        <div className="relative shrink-0">
          <input
            type="text"
            placeholder="Buscar campeão..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            onFocus={() => query.length > 1 && setOpen(true)}
            className="bg-[#111827] border border-[#c89b3c]/30 text-[#e8d5b0] placeholder-[#a89070] rounded px-3 py-2 w-36 sm:w-52 md:w-64 text-sm focus:outline-none focus:border-[#c89b3c] transition-colors"
          />
          {open && results.length > 0 && (
            <div className="absolute top-full mt-1 right-0 w-52 sm:w-64 bg-[#111827] border border-[#c89b3c]/30 rounded shadow-xl">
              {results.map((c) => (
                <Link
                  key={c.id}
                  href={`/campeoes/${c.slug}`}
                  onClick={() => { setQuery(""); setOpen(false); }}
                  className="block px-4 py-2 text-sm text-[#e8d5b0] hover:bg-[#c89b3c]/10 hover:text-[#c89b3c] transition-colors"
                >
                  {c.nome}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

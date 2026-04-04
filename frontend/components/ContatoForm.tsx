"use client";

import { useState } from "react";

export default function ContatoForm() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-[#c89b3c] uppercase tracking-wider mb-2 text-center">
        Contato para Recrutadores
      </h2>
      <p className="text-[#a89070] text-sm text-center mb-8">
        Interessado no meu perfil? Envie uma mensagem.
      </p>

      {status === "ok" ? (
        <div className="gold-border bg-[#111827] rounded-xl p-8 text-center">
          <p className="text-[#c89b3c] font-semibold text-lg">Mensagem enviada!</p>
          <p className="text-[#a89070] text-sm mt-2">Entrarei em contato em breve.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="gold-border bg-[#111827] rounded-xl p-8 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              required
              placeholder="Seu nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className="flex-1 min-w-0 bg-[#0a0e1a] border border-[#c89b3c]/20 text-[#e8d5b0] placeholder-[#a89070] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#c89b3c] transition-colors"
            />
            <input
              required
              type="email"
              placeholder="Seu e-mail"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="flex-1 min-w-0 bg-[#0a0e1a] border border-[#c89b3c]/20 text-[#e8d5b0] placeholder-[#a89070] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#c89b3c] transition-colors"
            />
          </div>
          <textarea
            required
            rows={4}
            placeholder="Sua mensagem..."
            value={form.mensagem}
            onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
            className="bg-[#0a0e1a] border border-[#c89b3c]/20 text-[#e8d5b0] placeholder-[#a89070] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#c89b3c] transition-colors resize-none"
          />
          {status === "error" && (
            <p className="text-red-400 text-xs">Erro ao enviar. Tente novamente.</p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-[#c89b3c] hover:bg-[#e8c870] text-[#0a0e1a] font-bold py-3 rounded uppercase tracking-wider text-sm transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Enviando..." : "Enviar Mensagem"}
          </button>
        </form>
      )}
    </section>
  );
}

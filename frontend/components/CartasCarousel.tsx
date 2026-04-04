"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";

interface CartaProps {
  src: string;
  nome: string;
  index: number;
  progress: MotionValue<number>;
  onClick: () => void;
}

function Carta({ src, nome, index, progress, onClick }: CartaProps) {
  const offset = useTransform(progress, (p) => index - p);
  const x = useTransform(offset, (o) => o * 140);
  const scale = useTransform(offset, (o) => Math.max(0.45, 1 - Math.abs(o) * 0.15));
  const rotate = useTransform(offset, (o) => o * 8);
  const opacity = useTransform(offset, (o) => Math.abs(o) > 2.5 ? 0 : Math.abs(o) > 1.5 ? 0.55 : 1);
  const zIndex = useTransform(offset, (o) => Math.round(100 - Math.abs(o) * 20));
  const imgFilter = useTransform(offset, (o) =>
    Math.abs(o) < 0.3
      ? "drop-shadow(0 0 22px rgba(200,155,60,0.55))"
      : "none"
  );

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ x, scale, rotate, opacity, zIndex }}
      onClick={onClick}
    >
      <motion.img
        src={src}
        alt={`${nome} carta ${index + 1}`}
        style={{ filter: imgFilter }}
        className="h-80 rounded-xl"
        draggable={false}
      />
    </motion.div>
  );
}

interface Props {
  cartas: string[];
  nomeBase: string;
}

export default function CartasCarousel({ cartas, nomeBase }: Props) {
  const progress = useMotionValue(0);
  const [ativo, setAtivo] = useState(0);
  const dragStartProgress = useRef(0);

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(cartas.length - 1, index));
    animate(progress, clamped, { type: "spring", stiffness: 280, damping: 28 });
    setAtivo(clamped);
  }

  return (
    <div className="relative flex flex-col items-center gap-6 select-none">
      {/* Área de drag */}
      <motion.div
        className="relative flex items-center justify-center h-96 w-full cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDragStart={() => {
          dragStartProgress.current = progress.get();
        }}
        onDrag={(_, info) => {
          const delta = -info.offset.x / 130;
          const next = Math.max(0, Math.min(cartas.length - 1, dragStartProgress.current + delta));
          progress.set(next);
        }}
        onDragEnd={() => {
          const current = progress.get();
          goTo(Math.round(current));
        }}
      >
        {cartas.map((src, i) => (
          <Carta
            key={src}
            src={src}
            nome={nomeBase}
            index={i}
            progress={progress}
            onClick={() => goTo(i)}
          />
        ))}
      </motion.div>

      {/* Navegação */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => goTo(ativo - 1)}
          disabled={ativo === 0}
          className="text-4xl text-[#c89b3c] hover:text-[#e8c870] disabled:opacity-20 transition-colors leading-none"
        >
          ‹
        </button>

        <div className="flex gap-2">
          {cartas.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === ativo ? "bg-[#c89b3c] w-6" : "bg-[#c89b3c]/30 w-1.5"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(ativo + 1)}
          disabled={ativo === cartas.length - 1}
          className="text-4xl text-[#c89b3c] hover:text-[#e8c870] disabled:opacity-20 transition-colors leading-none"
        >
          ›
        </button>
      </div>
    </div>
  );
}

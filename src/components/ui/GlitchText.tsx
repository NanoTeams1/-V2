export function GlitchText({ children, danger = false }: { children: string; danger?: boolean }) {
  return (
    <span className={`relative inline-block ${danger ? 'text-konbini-red' : 'text-konbini-cyan'}`}>
      <span className="absolute left-[1px] top-0 text-konbini-red/60 blur-[0.5px]" aria-hidden>
        {children}
      </span>
      <span className="absolute -left-[1px] top-0 text-konbini-mint/40" aria-hidden>
        {children}
      </span>
      <span className="relative">{children}</span>
    </span>
  );
}

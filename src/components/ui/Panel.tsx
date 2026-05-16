import type { ReactNode } from 'react';

export function Panel({ title, children, className = '' }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-cyan-200/20 bg-black/45 p-4 shadow-crt backdrop-blur-sm ${className}`}>
      {title ? <h2 className="mb-3 text-xs uppercase tracking-[0.35em] text-konbini-cyan">{title}</h2> : null}
      {children}
    </section>
  );
}

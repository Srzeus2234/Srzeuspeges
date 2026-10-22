import { useRef } from "react";

export default function Rail({ items }) {
  const ref = useRef(null);
  const mover = (d) =>
    ref.current && ref.current.scrollBy({ left: d * 300, behavior: "smooth" });

  return (
    <div className="railwrap">
      <button
        className="rbtn l"
        onClick={() => mover(-1)}
        aria-label="Anterior"
      >
        ‹
      </button>
      <div className="rail" ref={ref}>
        {items.map((t) => {
          const Tag = t.url ? "a" : "article";
          const extra = t.url
            ? { href: t.url, target: "_blank", rel: "noreferrer" }
            : {};
          return (
            <Tag className="work" key={t.titulo} {...extra}>
              <div className="shot" style={{ "--a": t.a, "--b": t.b }}>
                {t.imagen ? <img src={t.imagen} alt={t.titulo} /> : t.emoji}
              </div>
            </Tag>
          );
        })}
      </div>
      <button
        className="rbtn r"
        onClick={() => mover(1)}
        aria-label="Siguiente"
      >
        ›
      </button>
    </div>
  );
}

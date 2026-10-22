import { useState, useEffect, useRef } from "react";
import Logo from "./components/Logo.jsx";
import Rail from "./components/Rail.jsx";
import { PERFIL, TRABAJOS, REDES } from "./data.js";

export default function App() {
  const [oscuro, setOscuro] = useState(null);
  const [matrixChars, setMatrixChars] = useState([]);
  const matrixInterval = useRef(null);

  const alternar = () => {
    const sistema = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const actual = oscuro === null ? sistema : oscuro;
    setOscuro(!actual);
    document.documentElement.setAttribute(
      "data-theme",
      !actual ? "dark" : "light",
    );
  };

  // Matrix rain effect
  useEffect(() => {
    const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01";
    const columns = Math.floor(window.innerWidth / 20);
    const newChars = Array.from({ length: columns }, (_, i) => ({
      x: i * 20,
      y: Math.random() * -100,
      speed: 0.5 + Math.random() * 1.5,
      chars: Array.from(
        { length: 10 + Math.random() * 20 },
        () => chars[Math.floor(Math.random() * chars.length)],
      ),
    }));
    setMatrixChars(newChars);

    matrixInterval.current = setInterval(() => {
      setMatrixChars((prev) =>
        prev.map((col) => ({
          ...col,
          y:
            col.y > window.innerHeight + 100
              ? Math.random() * -100
              : col.y + col.speed,
          chars: col.chars.map(
            () => chars[Math.floor(Math.random() * chars.length)],
          ),
        })),
      );
    }, 50);

    return () => {
      if (matrixInterval.current) clearInterval(matrixInterval.current);
    };
  }, []);

  return (
    <div className="wrap">
      {/* Matrix rain background */}
      <div className="matrix-bg" aria-hidden="true">
        {matrixChars.map((col, i) => (
          <div
            key={i}
            className="matrix-column"
            style={{
              left: col.x,
              top: col.y,
              animationDuration: `${10 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {col.chars.map((c, j) => (
              <div key={j} style={{ lineHeight: "1.2" }}>
                {c}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="top">
        <button className="theme" onClick={alternar} aria-label="Cambiar tema">
          🌗 THEME
        </button>
      </div>

      <header className="profile">
        <div className="avatar">
          <Logo />
        </div>
        <h1>
          <span className="glitch" data-text={PERFIL.nombre}>
            {PERFIL.nombre}
          </span>
          <span className="badge">VERIFIED</span>
        </h1>
        <p className="user">{PERFIL.usuario}</p>
        <p className="bio">{PERFIL.bio}</p>
      </header>

      <h3 className="sec">WORKS</h3>
      <Rail items={TRABAJOS} />

      <h3 className="sec">LINKS</h3>
      <nav className="links" style={{ marginTop: 12 }}>
        {REDES.map((r) => (
          <a
            key={r.nombre}
            className="link"
            href={r.url}
            target="_blank"
            rel="noreferrer"
            style={{ "--c": r.color }}
          >
            <span className="ico">{r.icono}</span>
            <div>
              <strong>{r.nombre}</strong>
              <span>{r.desc}</span>
            </div>
            <span className="arrow">▶</span>
          </a>
        ))}
      </nav>

      <div className="contact">
        ¿COLABORACIONES? ESCRIBE A{" "}
        <a href={"mailto:" + PERFIL.email}>{PERFIL.email}</a>
      </div>
      <footer>© 2026 {PERFIL.nombre} // BUILT WITH REACT + VITE</footer>
    </div>
  );
}

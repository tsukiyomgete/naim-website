import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/main1.mp4";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";
import mainm from "./assets/mainm.jpeg";
import mainm2 from "./assets/mainm2.jpeg";
import mainf from "./assets/mainf.gif";
import railwayImg from "./assets/projetyokai.png";

const CHARS = [char1, char2, char3];
const MAIN_IMAGES = [mainm, mainm2, mainf];

const REVEAL_CONTENT = [
  {
    label: "Yokai Watch Showdown",
    sections: [
      {
        id: "presentation",
        label: "Présentation",
        upper: ["Simulateur de combat compétitif Yokai Watch", "Développé en Java côté client et SQL côté serveur"],
        lower: "Le but du projet est de donner une plateforme de jeu free-to-play pour la communauté des fans de yokai-watch",
      },
      {
        id: "situation",
        label: "Situation",
        upper: ["Absence de plateforme compétitive pour la communauté Yokai Watch", "Projet personnel free-to-play"],
        lower: "situation",
      },
      {
        id: "tache",
        label: "Tâche",
        upper: ["Concevoir un simulateur de combat compétitif de A à Z", "Développé seule — client Java, serveur Spring Boot, BDD MySQL"],
        lower: "tâche",
      },
      {
        id: "action",
        label: "Action",
        upper: ["API REST déployée sur Railway", "Architecture client-serveur, MySQL hébergé en cloud"],
        lower: "cliquer sur l'image pour mieux comprendre",
        image: railwayImg,
      },
      {
        id: "resultat",
        label: "Résultat",
        upper: ["Application déployée et accessible en ligne", "Architecture complète et évolutive pour la communauté"],
        lower: "résultat",
      },
    ],
  },
  {
    label: "Arctic Circus",
    sections: [
      { id: "situation", label: "Situation", upper: ["Concours de développement de jeux vidéo en temps limité", "1 journée pour créer un jeu complet sur le thème du cirque"], lower: "situation" },
      { id: "tache", label: "Tâche", upper: ["Concevoir et développer un jeu fonctionnel en équipe de 4", "Respecter le thème imposé dans un délai très court"], lower: "tâche" },
      { id: "action", label: "Action", upper: ["Développement d'un jeu où un manchot jongle des balles", "Pour amuser le public du cirque"], lower: "action — collaboration et développement rapide" },
      { id: "resultat", label: "Résultat", upper: ["Jeu complet et fonctionnel livré dans les temps", "Expérience de travail en équipe sous contrainte"], lower: "résultat" },
    ],
  },
  {
    label: "Projet C++",
    sections: [
      { id: "situation", label: "Situation", upper: ["Projet académique pour comprendre les bases d'un moteur de jeu", "Aucune librairie abstraite — tout codé manuellement"], lower: "situation" },
      { id: "tache", label: "Tâche", upper: ["Concevoir un jeu avec personnage, ennemis et niveaux chargeables", "Gestion des entrées clavier, animations et collisions"], lower: "tâche" },
      { id: "action", label: "Action", upper: ["C++ orienté objet — classes séparées par responsabilité", "Niveaux chargés depuis fichiers externes pour plus de flexibilité"], lower: "action — développement bas niveau avec SDL" },
      { id: "resultat", label: "Résultat", upper: ["Prototype fonctionnel avec déplacement, ennemis et décor", "Base solide pour aborder des projets graphiques plus complexes"], lower: "résultat" },
    ],
  },
];

const ROLES = [
  { text: "LEADER" },
  { text: "PARTY" },
  { text: "PARTY" },
];

const ITEMS = [
  { id: "ykw", label: "Yokai Watch Showdown" },
  { id: "arctic", label: "Arctic Circus" },
  { id: "cpp", label: "Projet C++" },
];

export default function AboutMe() {
  const [active, setActive] = useState(0);
  const [activeSection, setActiveSection] = useState(null); // index de la section active à droite
  const [focus, setFocus] = useState("left");   // "left" | "right"
  const [zoomedImage, setZoomedImage] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (zoomedImage) {
        if (e.key === "Escape" || e.key === "Backspace" || e.key === "Enter") setZoomedImage(false);
        return;
      }

      if (focus === "left") {
        if (e.key === "ArrowUp") setActive(i => { const n = Math.max(0, i - 1); setActiveSection(null); return n; });
        if (e.key === "ArrowDown") setActive(i => { const n = Math.min(ITEMS.length - 1, i + 1); setActiveSection(null); return n; });
        if (e.key === "ArrowRight") { setFocus("right"); setActiveSection(0); }
        if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate(-1);
      } else {
        const sections = REVEAL_CONTENT[active].sections;
        if (e.key === "ArrowUp") setActiveSection(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActiveSection(i => Math.min(sections.length - 1, i + 1));
        if (e.key === "ArrowLeft") { setFocus("left"); setActiveSection(null); }
        if (e.key === "Escape" || e.key === "Backspace") { setFocus("left"); setActiveSection(null); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, focus, zoomedImage]);

  const currentSections = REVEAL_CONTENT[active].sections;
  const currentSection = activeSection !== null ? currentSections[activeSection] : null;

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />

      {/* Zoom overlay */}
      {zoomedImage && currentSection?.image && (
        <div
          onClick={() => setZoomedImage(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 99,
            background: "rgba(0,0,0,0.88)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "zoom-out", pointerEvents: "all"
          }}
        >
          <img
            src={currentSection.image}
            style={{
              maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain",
              clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)"
            }}
          />
        </div>
      )}

      {/* Dim quand une section est sélectionnée */}
      {currentSection && <div className="sc-dim" />}

      {/* Panel de contenu */}
      {currentSection && (
        <div className={`sc-reveal-panel${mounted ? " mounted" : ""}`} style={{ pointerEvents: "all" }}>
          <div className="sc-reveal-upper-bar">
            {currentSection.upper.map((line) => (
              <div className="sc-reveal-upper-line" key={line}>{line}</div>
            ))}
          </div>
          {currentSection.image && (
            <div
              className="sc-reveal-image-bar"
              style={{ cursor: "zoom-in", pointerEvents: "all" }}
              onClick={() => setZoomedImage(true)}
            >
              <img
                src={currentSection.image}
                alt=""
                className="sc-reveal-image"
                style={{ pointerEvents: "all", cursor: "zoom-in" }}
                onClick={() => setZoomedImage(true)}
              />
            </div>
          )}
          <div className="sc-reveal-lower-bar">
            {Array.isArray(currentSection.lower)
              ? currentSection.lower.map((line, i) => <div key={i}>{line}</div>)
              : currentSection.lower}
          </div>
        </div>
      )}

      {/* Portrait */}
      {currentSection && (
        <div className={`sc-main-portrait-shell${mounted ? " mounted" : ""}`}>
          <img className="sc-main-portrait" src={MAIN_IMAGES[active]} alt="" />
        </div>
      )}

      {/* Barres droite — sections STAR */}
      {mounted && (
        <div className="sc-right-sections">
          {currentSections.map((section, i) => (
            <div
              key={section.id}
              className={`sc-section-bar-outer${activeSection === i ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={() => { setActiveSection(i); setFocus("right"); }}
              onMouseEnter={() => { if (focus === "right") setActiveSection(i); }}
            >
              <div className="sc-section-bar">
                <div className="sc-section-bar-fill" />
                <div className="sc-section-bar-content">
                  <div className="sc-section-label">{section.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300&display=swap');

        .sc-root {
          position: absolute; inset: 0; z-index: 6; pointer-events: none;
          display: flex; flex-direction: column;
          align-items: flex-start; justify-content: center;
          gap: 6px; padding-left: 0;
        }
        .sc-dim {
          position: absolute; inset: 0; z-index: 12;
          background: rgba(40, 45, 54, 0.68); pointer-events: none;
          animation: sc-dim-in 0.32s ease-out;
        }
        @keyframes sc-dim-in { from { opacity: 0; } to { opacity: 1; } }

        @keyframes sc-reveal-bar-in {
          0%   { opacity: 0; transform: translateX(-120px) rotate(-20deg) scaleX(0.72); }
          60%  { opacity: 0.96; transform: translateX(18px) rotate(-20deg) scaleX(1.03); }
          100% { opacity: 0.92; transform: translateX(0) rotate(-20deg) scaleX(1); }
        }
        @keyframes sc-portrait-in {
          0%   { opacity: 0; transform: translateX(78px) skewX(-8deg) scale(0.94); filter: blur(8px); }
          55%  { opacity: 0.9; transform: translateX(-8px) skewX(-8deg) scale(1.015); filter: blur(0); }
          100% { opacity: 0.96; transform: translateX(0) skewX(-8deg) scale(1); filter: blur(0); }
        }
        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(-5px); opacity: 0.4; }
        }
        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(5px); opacity: 0.4; }
        }
        @keyframes sc-section-in {
          0%   { opacity: 0; transform: translateX(120px); }
          60%  { opacity: 1; transform: translateX(-6px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        .sc-main-portrait-shell {
          position: absolute; top: 0; right: -3vw; z-index: 13;
          pointer-events: none; width: 43vw; height: 100vh; overflow: hidden;
          opacity: 0; transform: translateX(24px) skewX(-8deg) scale(0.98);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sc-main-portrait-shell.mounted {
          opacity: 0.96; transform: translateX(0) skewX(-8deg) scale(1);
          animation: sc-portrait-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc-reveal-panel {
          position: absolute; top: 44vh; left: -6vw;
          width: 88vw; height: 60vh; z-index: 15; pointer-events: none;
          background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(243,246,252,0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%);
          box-shadow: 0 0 0 2px rgba(255,255,255,0.18), 18px 0 0 rgba(215,13,44,0.82), 28px 0 0 rgba(255,255,255,0.26);
          opacity: 0; transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom; transition: opacity 0.3s ease, transform 0.35s ease;
        }
        .sc-reveal-panel.mounted {
          opacity: 0.92; transform: translateX(0) rotate(-20deg);
          animation: sc-reveal-bar-in 0.46s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-reveal-panel::before {
          content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 8px;
          background: linear-gradient(180deg, #e03d31 0%, #eb3333 100%); clip-path: inherit;
        }

        .sc-reveal-upper-bar {
          position: absolute; top: 10%; left: 0; width: 100%; height: 40%;
          background: rgba(0,0,0,0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 10px; color: #fff; text-align: center;
        }
        .sc-reveal-upper-line {
          font-family: 'Montserrat', sans-serif; font-weight: 300;
          font-size: 20px; letter-spacing: 0.5px; line-height: 1.15;
        }

        .sc-reveal-image-bar {
  position: absolute; top: 52%; left: 0; width: 52%; height: 28%;
  overflow: hidden;
  transition: filter 0.2s ease;
}

.sc-reveal-image-bar, .sc-reveal-image {
  pointer-events: all !important;
  cursor: zoom-in !important;
}
        .sc-reveal-image-bar:hover { filter: brightness(1.15); }
        .sc-reveal-image { width: 100%; height: 100%; object-fit: cover; display: block; }

        .sc-reveal-lower-bar {
          position: absolute; top: 58%; right: 0; width: 48%; height: 20%;
          background: rgba(0,0,0,0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          display: flex; flex-direction: column; align-items: flex-start; justify-content: center;
          color: #fff; font-family: 'Montserrat', sans-serif; font-weight: 300;
          font-size: 18px; letter-spacing: 0.4px; text-transform: lowercase; padding-left: 22px; gap: 4px;
        }

        /* Barres droite STAR */
        .sc-right-sections {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 16;
          pointer-events: all;
        }

        .sc-section-bar-outer {
          position: relative;
          animation: sc-section-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .sc-section-bar {
          position: relative;
          width: 200px;
          height: 56px;
          background: #111;
          clip-path: polygon(14px 0, 100% 0, 100% 100%, 0 100%);
          box-shadow: 0 4px 18px rgba(0,0,0,0.6);
          cursor: pointer;
          transition: height 0.2s ease, background 0.2s ease;
          overflow: hidden;
        }

        .sc-section-bar-outer.active .sc-section-bar {
          height: 70px;
          background: #fff;
          box-shadow: -8px 6px 0 #c4001a;
        }

        .sc-section-bar-fill {
          position: absolute; inset: 0;
          background: #fff;
          clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
          transition: clip-path 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .sc-section-bar-outer.active .sc-section-bar-fill {
          clip-path: polygon(60% 0, 100% 0, 100% 100%, 46% 100%);
        }

        .sc-section-bar-content {
          position: relative; z-index: 2; height: 100%;
          display: flex; align-items: center; padding: 0 18px;
        }

        .sc-section-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px; letter-spacing: 3px; line-height: 1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease; user-select: none;
        }
        .sc-section-bar-outer.active .sc-section-label { color: #111; }

        /* Barres gauche projet */
        .sc-bar {
          position: relative; width: 45vw; height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111; cursor: pointer; pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65); z-index: 1;
        }
        .sc-bar-outer {
          position: relative; flex-shrink: 0; transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer.active .sc-bar     { height: 90px; }
        .sc-bar-outer.active .sc-bar-red { height: 90px; }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }

        .sc-bar-red {
          position: absolute; top: 0; left: 0; width: 45vw; height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px); opacity: 0;
          transition: opacity 0.2s ease; z-index: 0; pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; }

        .sc-bar-fill {
          position: absolute; inset: 0; width: 100%; background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1); z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        .sc-bar-shade {
          position: absolute; top: 0; bottom: 0; left: 73%; width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 1; pointer-events: none; opacity: 0; transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        .sc-bar::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10; pointer-events: none;
        }

        .sc-bar-content {
          position: relative; z-index: 2; height: 100%;
          display: flex; align-items: center; justify-content: space-between; padding: 0 20px;
        }

        .sc-role {
          display: flex; align-items: center; flex-shrink: 0;
          font-family: 'Anton', sans-serif; font-size: 50px;
          letter-spacing: -2px; color: #ffffff; transform: rotate(-30deg);
          user-select: none; line-height: 1; padding: 0 16px 0 8px;
        }

        .sc-main {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 3px; padding-left: 78px;
        }
        .sc-main-top { display: flex; align-items: center; gap: 12px; }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif; font-size: 28px;
          letter-spacing: 4px; line-height: 1;
          color: rgba(255,255,255,0.85); transition: color 0.2s ease; user-select: none;
        }
        .sc-bar-outer.active .sc-label { color: #111111; }

        .sc-char {
          position: absolute; top: 0; left: 110px;
          height: 100%; width: auto; max-width: 160px;
          object-fit: cover; object-position: top; pointer-events: none; z-index: 3;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        .sc-footer {
          position: fixed; bottom: 20px; right: 28px;
          display: flex; flex-direction: column; align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif; z-index: 14;
          opacity: 0; transition: opacity 0.4s ease 0.6s;
        }
        .sc-footer.mounted { opacity: 1; }
        .sc-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px; color: rgba(255,255,255,0.7);
        }
        .sc-footer-key {
          border: 2px solid rgba(255,255,255,0.3); border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
          color: rgba(255,255,255,0.8);
        }
      `}</style>

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => { setActive(i); setActiveSection(null); setFocus("left"); }}
            onMouseEnter={() => { if (focus === "left") setActive(i); }}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">→</span><span>SECTIONS</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">←</span><span>BACK</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>MENU</span></div>
      </div>
    </div>
  );
}
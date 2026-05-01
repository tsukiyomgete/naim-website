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
    pages: [
      {
        upper: ["Simulateur de combat compétitif Yokai Watch", "Développé en Java Côté client et SQL côté serveur"],
        lower: "Le but du projet est de donner une plateforme de jeu free-to-play pour la communauté des fans de yokai-watch",
      },
      {
        upper: ["Le logiciel client codé en Java va demander une requête vers l'API qui lui même communiquera avec la BDD",
          "Tout cela a été implémenté dans un Projet Commun"],
        lower: "Cliquer sur l'image pour mieux comprendre",
        image: railwayImg,
      },
      {
        upper: ["Parsing de JavaScript à SQL et de Java à JavaScript", "Sécurisation de base de donnée et Développement d'application"],
        lower: "Ce sont les compétences que j'ai amélioré lors de ce projet en développement",
      },
      {
        upper: ["Logiciel et autres utilisés pour ce projet :" , "VStudio (Programmation en java), Railway (Hôte de la BDD), Unity (Moteur 3D pour le jeu)"],
        lower: "Durée estimé: 9 mois à 1 ans",
      },
    ],
  },
  {
    label: "Arctic Circus",
    pages: [
      { upper: ["Il s'agit d'un jeu programmé en 1 journée pour la GameJam 2026"], lower: "Axel, Makhdi, Quentin et moi avons crée ce jeu" },
    ],
  },
  {
    label: "Projet C++",
    pages: [
      { upper:["Ce projet consiste à développer un petit jeu vidéo en 2D afin de comprendre les bases du développement",
         " d’un moteur de jeu en language Bas niveau. Grâce à ce projet, j'ai pu acquérir des notions pour développer un jeu", 
         "tel que l’affichage d’éléments graphiques, le déplacement d’un personnage, ainsi que les interactions des personnages"], lower: "Flêche pour aller à la suite" },
    ],
  },
];

const ROLES = [
  { text: "LEADER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "PARTY", color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "PARTY", color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
];

const ITEMS = [
  { id: "twitch", label: "Yokai Watch Showdown", icon: "🎮", barIcon: icon1 },
  { id: "instagram", label: "Code Game Jam", icon: "📷", barIcon: icon2 },
  { id: "tiktok", label: "Projet C++", icon: "🎵", barIcon: icon3 },
];

export default function AboutMe() {
  const [active, setActive] = useState(0);
  const [zoomedImage, setZoomedImage] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [subPage, setSubPage] = useState(0);
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
      if (e.key === "ArrowUp") { setActive(i => Math.max(0, i - 1)); setSubPage(0); setRevealed(false); }
      if (e.key === "ArrowDown") { setActive(i => Math.min(ITEMS.length - 1, i + 1)); setSubPage(0); setRevealed(false); }
      if (e.key === "Enter") setRevealed(true);
      if (e.key === "ArrowRight") {
        if (!revealed) setRevealed(true);
        else setSubPage(p => Math.min(REVEAL_CONTENT[active].pages.length - 1, p + 1));
      }
      if (e.key === "ArrowLeft") {
        if (revealed && subPage > 0) setSubPage(p => p - 1);
        else if (revealed) setRevealed(false);
        else navigate(-1);
      }
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, revealed, subPage, zoomedImage]);

  const currentPage = REVEAL_CONTENT[active].pages[subPage];
  const totalPages = REVEAL_CONTENT[active].pages.length;

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />

      {/* Zoom overlay — en dehors du panel pour pas être coupé par clip-path */}
      {zoomedImage && currentPage.image && (
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
            src={currentPage.image}
            style={{
              maxWidth: "90vw", maxHeight: "90vh",
              objectFit: "contain",
              clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)"
            }}
          />
        </div>
      )}

      {revealed && <div key={`dim-${active}`} className="sc-dim" />}
      {revealed && (
        <div key={`panel-${active}-${subPage}`} className={`sc-reveal-panel${mounted ? " mounted" : ""}`} style={{ pointerEvents: "all" }}>
          <div className="sc-reveal-upper-bar">
            {currentPage.upper.map((line) => (
              <div className="sc-reveal-upper-line" key={line}>{line}</div>
            ))}
          </div>
          {currentPage.image && (
            <div
              className="sc-reveal-image-bar"
              style={{ cursor: "zoom-in", pointerEvents: "all" }}
              onClick={() => setZoomedImage(true)}
            >
              <img src={currentPage.image} alt="" className="sc-reveal-image" />
            </div>
          )}
          <div className="sc-reveal-lower-bar">
            {Array.isArray(currentPage.lower)
              ? currentPage.lower.map((line, i) => <div key={i}>{line}</div>)
              : currentPage.lower}
          </div>
          {totalPages > 1 && (
            <div className="sc-reveal-pagination">
              {Array.from({ length: totalPages }).map((_, i) => (
                <div key={i} className={`sc-reveal-dot${i === subPage ? " active" : ""}`} />
              ))}
            </div>
          )}
        </div>
      )}

      {revealed && (
        <div key={`nav-${active}`} className="sc-right-nav">
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">LB</span>
          <span className="sc-nav-dot" />
          <span className="sc-nav-btn">RB</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}
      {revealed && (
        <div key={`portrait-${active}`} className={`sc-main-portrait-shell${mounted ? " mounted" : ""}`}>
          <img className="sc-main-portrait" src={MAIN_IMAGES[active]} alt="" />
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&family=Montserrat:wght@300&display=swap');

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
          width: 88vw; height: 60vh; z-index: 12; pointer-events: none;
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
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
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
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          transition: filter 0.2s ease;
        }
        .sc-reveal-image-bar:hover { filter: brightness(1.15); }
        .sc-reveal-image {
          width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;
        }

        .sc-reveal-lower-bar {
          position: absolute; top: 58%; right: 0; width: 48%; height: 20%;
          background: rgba(0,0,0,0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: flex-start;
          color: #fff; font-family: 'Montserrat', sans-serif; font-weight: 300;
          font-size: 22px; letter-spacing: 0.4px; text-transform: lowercase; padding-left: 22px;
        }

        .sc-reveal-pagination {
          position: absolute; bottom: 12%; left: 50%; transform: translateX(-50%);
          display: flex; gap: 8px; align-items: center;
        }
        .sc-reveal-dot {
          width: 8px; height: 8px; border-radius: 999px; background: rgba(0,0,0,0.25);
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .sc-reveal-dot.active { background: #c4001a; transform: scale(1.3); }

        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: absolute; top: 10vh; left: 6vw;
          display: flex; align-items: center; gap: 6px;
          pointer-events: none; z-index: 14;
          transform: translateX(-40px) rotate(-20deg); transform-origin: left bottom;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif; font-size: 100px;
          letter-spacing: 3px; line-height: 1; user-select: none;
          color: #fff; -webkit-text-stroke: 2px #000; paint-order: stroke fill;
          background: none; border: none; padding: 0 6px;
        }
        .sc-right-nav .sc-nav-dot {
          width: 16px; height: 16px; border-radius: 999px;
          background: #111; margin: 0 10px; flex-shrink: 0;
        }
        .sc-right-nav .sc-nav-arrow {
          font-family: 'Bebas Neue', sans-serif; font-size: 22px;
          color: #c4001a; display: inline-block; user-select: none;
        }
        .sc-right-nav .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-right-nav .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        .sc-main-portrait {
          width: 100%; height: 100%; object-fit: cover; object-position: top right;
          transform: skewX(8deg) scale(1.08); transform-origin: top right;
        }

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
          font-size: 13px; letter-spacing: 2px; color: rgba(255,255,255,0.22);
        }
        .sc-footer-key {
          border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }
      `}</style>

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => { setActive(i); setSubPage(0); setRevealed(false); }}
            onMouseEnter={() => { if (!revealed) setActive(i); }}
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
        <div className="sc-footer-row"><span className="sc-footer-key">↵ / →</span><span>REVEAL</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">←</span><span>BACK</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>MENU</span></div>
      </div>
    </div>
  );
}
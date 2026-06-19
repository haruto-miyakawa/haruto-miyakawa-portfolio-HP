"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LABEL_GAME_EXAMINE } from "@/constants/labels";
import sceneData from "@/game/scene.json";
import { profile } from "@/content/content.data";
import { playSfx, isSfxMuted, setSfxMuted } from "@/lib/sfx";

// 効果音トグルのスピーカーアイコン（カラー絵文字不使用・currentColor のモノクロ SVG）。
// 効果音トグルのランタンアイコン（世界観のモチーフ）。lit=ON で炎が灯り、OFF で消える。
// 炎の発光/ゆらぎは CSS（.flame）側で制御（prefers-reduced-motion で揺れは止める）。
function LanternIcon({ lit }: { lit: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* つり手と天面 */}
      <path d="M10 3h4M12 3v2.5" />
      <path d="M8.5 6.5h7l-.6 2h-5.8z" />
      {/* ランタン本体 */}
      <rect x="8" y="8.5" width="8" height="10.5" rx="1.6" />
      <path d="M8 18.8h8" />
      {/* 炎（lit のときだけ点灯。色/発光は CSS .flame） */}
      <path
        className="flame"
        d="M12 10.4c1.7 1.2 2.4 2.5 2.4 3.8a2.4 2.4 0 1 1-4.8 0c0-.9.4-1.7 1.1-2.4.3.7.9 1 1.3 1.1.2-.9-.4-1.8 0-2.5z"
        fill={lit ? "currentColor" : "none"}
        stroke="none"
      />
    </svg>
  );
}

// ─── BackgroundLayer interface (future WFC tile generation hook) ──────────────
// Replace `tileset` with a WFC-generated HTMLCanvasElement to swap map visuals
// without touching engine logic. tiles: row-major Uint8Array of tile indices.
interface BackgroundLayer {
  tiles: Uint8Array;
  tileset: HTMLCanvasElement; // offscreen canvas painted once at init
  tileWidth: number;
  tileHeight: number;
  cols: number;
  rows: number;
}

// ─── Types ────────────────────────────────────────────────────────────────────
type FSMState = "walk" | "dialog" | "wipe";
interface Zone {
  xMin: number;
  xMax: number;
  label: string;
  dialog: string[];
  action: string;
}

const INTERNAL_W = 320;
const INTERNAL_H = 180;
const WORLD_W: number = (sceneData as { worldWidth?: number }).worldWidth ?? INTERNAL_W;
const PLAYER_W = 10;
const PLAYER_H = 18;
const PLAYER_SPEED = 1.5;
const FIXED_DT = 1000 / 60;

const PAL = {
  sky: "#1c1027",
  ground: "#2a1a0e",
  groundLine: "#3d2810",
  player: "#e8a040",
  playerOutline: "#110b09",
  building: "#221430",
  buildingLine: "#e8a040",
  signBg: "#1a0e26",
  wipeBg: "rgba(12,8,20,1)",
};

function buildTileset(): BackgroundLayer {
  const tileW = 16;
  const tileH = 16;
  const cols = Math.ceil(WORLD_W / tileW) + 2;
  const rows = Math.ceil(INTERNAL_H / tileH);
  const tiles = new Uint8Array(cols * rows);
  const groundRow = Math.floor((INTERNAL_H - 28) / tileH);
  for (let c = 0; c < cols; c++) {
    for (let r = groundRow; r < rows; r++) {
      tiles[r * cols + c] = 1;
    }
  }
  const ts = document.createElement("canvas");
  ts.width = tileW * 2;
  ts.height = tileH;
  const ctx2 = ts.getContext("2d")!;
  ctx2.fillStyle = PAL.sky;
  ctx2.fillRect(0, 0, tileW, tileH);
  ctx2.fillStyle = PAL.ground;
  ctx2.fillRect(tileW, 0, tileW, tileH);
  return { tiles, tileset: ts, tileWidth: tileW, tileHeight: tileH, cols, rows };
}

function drawBackground(ctx: CanvasRenderingContext2D, bg: BackgroundLayer, cameraX: number) {
  const { tiles, tileset, tileWidth: tw, tileHeight: th, cols } = bg;
  const startCol = Math.floor(cameraX / tw);
  const endCol = startCol + Math.ceil(INTERNAL_W / tw) + 2;
  for (let r = 0; r < bg.rows; r++) {
    for (let c = startCol; c < Math.min(endCol, cols); c++) {
      const tileIdx = tiles[r * cols + c] ?? 0;
      const sx = tileIdx * tw;
      const dx = c * tw - cameraX;
      ctx.drawImage(tileset, sx, 0, tw, th, dx, r * th, tw, th);
    }
  }
}

function drawBuildings(ctx: CanvasRenderingContext2D, zones: Zone[], cameraX: number) {
  const groundY = INTERNAL_H - 28;
  for (const zone of zones) {
    if (zone.action === "__return__") continue;
    const bx = zone.xMin - cameraX;
    const bw = zone.xMax - zone.xMin;
    const bh = 48;
    const by = groundY - bh;
    ctx.fillStyle = PAL.building;
    ctx.fillRect(bx, by, bw, bh);
    ctx.strokeStyle = PAL.buildingLine;
    ctx.lineWidth = 1;
    ctx.strokeRect(bx + 0.5, by + 0.5, bw - 1, bh - 1);
    // Sign background only — label text rendered in DOM overlay
    ctx.fillStyle = PAL.signBg;
    const signH = 12;
    ctx.fillRect(bx + 4, by + 4, bw - 8, signH);
    ctx.strokeStyle = PAL.buildingLine;
    ctx.lineWidth = 0.5;
    ctx.strokeRect(bx + 4.5, by + 4.5, bw - 9, signH - 1);
  }
}

function drawLantern(ctx: CanvasRenderingContext2D, zones: Zone[], cameraX: number) {
  const lantern = zones.find((z) => z.action === "__return__");
  if (!lantern) return;
  const groundY = INTERNAL_H - 28;
  const lx = (lantern.xMin + lantern.xMax) / 2 - cameraX;
  const grad = ctx.createRadialGradient(lx, groundY - 28, 2, lx, groundY - 28, 18);
  grad.addColorStop(0, "rgba(255,170,70,0.5)");
  grad.addColorStop(1, "rgba(255,170,70,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(lx, groundY - 28, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#e8924f";
  ctx.fillRect(lx - 5, groundY - 40, 10, 14);
  ctx.fillStyle = "#f0b060";
  ctx.fillRect(lx - 3, groundY - 38, 6, 10);
}

function drawPlayer(ctx: CanvasRenderingContext2D, playerX: number, cameraX: number) {
  const groundY = INTERNAL_H - 28;
  const px = playerX - cameraX - PLAYER_W / 2;
  const py = groundY - PLAYER_H;
  ctx.fillStyle = PAL.playerOutline;
  ctx.fillRect(px - 1, py - 1, PLAYER_W + 2, PLAYER_H + 2);
  ctx.fillStyle = PAL.player;
  ctx.fillRect(px, py, PLAYER_W, PLAYER_H);
  ctx.fillStyle = "#f0b060";
  ctx.fillRect(px + 1, py, PLAYER_W - 2, PLAYER_H / 3);
}

function drawWipe(ctx: CanvasRenderingContext2D, alpha: number) {
  ctx.fillStyle = `rgba(12,8,20,${alpha})`;
  ctx.fillRect(0, 0, INTERNAL_W, INTERNAL_H);
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ExplorationScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasAreaRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const examinePromptRef = useRef<HTMLDivElement>(null);
  const dialogTextRef = useRef<HTMLDivElement>(null);
  const dialogCursorRef = useRef<HTMLDivElement>(null);
  const buildingLabelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();

  const [uiState, setUiState] = useState<"walk" | "dialog">("walk");
  const [muted, setMuted] = useState<boolean>(() => isSfxMuted());

  const prevZoneLabelRef = useRef<string | null>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const touchRef = useRef<{ left: boolean; right: boolean; examine: boolean }>({
    left: false, right: false, examine: false,
  });

  const stateRef = useRef<FSMState>("walk");
  const playerXRef = useRef<number>((sceneData as { playerStartX?: number }).playerStartX ?? 160);
  const dialogZoneRef = useRef<Zone | null>(null);
  const dialogPageRef = useRef(0);
  const wipeAlphaRef = useRef(0);
  const wipeTargetRef = useRef(0);
  const wipeActionRef = useRef<string>("");
  const bgRef = useRef<BackgroundLayer | null>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const accumRef = useRef<number>(0);

  const zones: Zone[] = (sceneData as { zones: Zone[] }).zones;

  // ── Body scroll lock ───────────────────────────────────────────────────────
  useEffect(() => {
    const scrollY = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      window.scrollTo(0, scrollY);
    };
  }, []);

  // ── Examine zone ──────────────────────────────────────────────────────────
  const examineZone = useCallback((zone: Zone) => {
    playSfx("examine"); // (a) しらべる（決定）— 明るい確定音
    dialogZoneRef.current = zone;
    dialogPageRef.current = 0;
    stateRef.current = "dialog";
    setUiState("dialog");
    if (dialogTextRef.current) dialogTextRef.current.textContent = zone.dialog[0];
    if (dialogCursorRef.current) {
      dialogCursorRef.current.textContent = zone.dialog.length === 1 ? "▶ けってい" : "▼";
    }
  }, []);

  // ── Confirm dialog (last page) ────────────────────────────────────────────
  const confirmDialog = useCallback(() => {
    const zone = dialogZoneRef.current;
    if (!zone) return;
    // (d) PRO 復帰: ランタンゾーンの確定（げんじつにもどる）で戻る音
    if (zone.action === "__return_pro__" || zone.action === "__return__") playSfx("return");
    stateRef.current = "wipe";
    wipeAlphaRef.current = 0;
    wipeTargetRef.current = 1;
    wipeActionRef.current = zone.action;
    setUiState("walk");
  }, []);

  // ── Return to previous page (✕ button / Esc in walk state) ───────────────
  const handleReturn = useCallback(() => {
    if (stateRef.current === "wipe") return;
    playSfx("return"); // (d) PRO 復帰 — ✕ もどる / Esc
    stateRef.current = "wipe";
    wipeAlphaRef.current = 0;
    wipeTargetRef.current = 1;
    wipeActionRef.current = "__return__";
    setUiState("walk");
  }, []);

  // ── Advance dialog page ───────────────────────────────────────────────────
  const dialogAdvance = useCallback(() => {
    const zone = dialogZoneRef.current;
    if (!zone) return;
    if (dialogPageRef.current < zone.dialog.length - 1) {
      dialogPageRef.current++;
      if (dialogTextRef.current) dialogTextRef.current.textContent = zone.dialog[dialogPageRef.current];
      if (dialogCursorRef.current) {
        const isLast = dialogPageRef.current >= zone.dialog.length - 1;
        dialogCursorRef.current.textContent = isLast ? "▶ けってい" : "▼";
      }
    } else {
      confirmDialog();
    }
  }, [confirmDialog]);

  // ── Cancel dialog ─────────────────────────────────────────────────────────
  const dialogCancel = useCallback(() => {
    if (stateRef.current === "dialog") {
      stateRef.current = "walk";
      dialogZoneRef.current = null;
      setUiState("walk");
    }
  }, []);

  // ── Keyboard input ────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "z", "Z", "x", "X", "Escape", " "].includes(e.key)) {
        e.preventDefault();
      }
      keysRef.current.add(e.key);

      if (stateRef.current === "dialog") {
        if (["z", "Z", " ", "Enter"].includes(e.key)) dialogAdvance();
        if (["x", "X", "Escape"].includes(e.key)) dialogCancel();
      }

      if (stateRef.current === "walk") {
        if (["z", "Z", " "].includes(e.key)) {
          const px = playerXRef.current;
          const zone = zones.find((z) => px >= z.xMin && px <= z.xMax);
          if (zone) examineZone(zone);
        }
        if (e.key === "Escape") handleReturn();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.key);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [zones, examineZone, dialogAdvance, dialogCancel, handleReturn]);

  // ── Game loop ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    bgRef.current = buildTileset();

    function update() {
      const state = stateRef.current;
      const keys = keysRef.current;
      const touch = touchRef.current;

      if (state === "walk") {
        const movingLeft = keys.has("ArrowLeft") || keys.has("a") || touch.left;
        const movingRight = keys.has("ArrowRight") || keys.has("d") || touch.right;
        if (movingLeft) playerXRef.current = Math.max(8, playerXRef.current - PLAYER_SPEED);
        if (movingRight) playerXRef.current = Math.min(WORLD_W - 8, playerXRef.current + PLAYER_SPEED);
        if (touch.examine) {
          touch.examine = false;
          const px = playerXRef.current;
          const zone = zones.find((z) => px >= z.xMin && px <= z.xMax);
          if (zone) examineZone(zone);
        }
      }

      if (state === "wipe") {
        const dir = wipeTargetRef.current === 1 ? 1 : -1;
        wipeAlphaRef.current = Math.min(1, Math.max(0, wipeAlphaRef.current + dir * (FIXED_DT / 200)));
        if (wipeTargetRef.current === 1 && wipeAlphaRef.current >= 1) {
          const action = wipeActionRef.current;
          if (action === "__return_pro__") {
            document.documentElement.dataset.mode = "pro";
            try { localStorage.setItem("site-mode", "pro"); } catch { /* private browsing */ }
            router.back();
          } else if (action === "__return__") {
            router.back();
          } else if (action === "__mail__") {
            window.location.href = `mailto:${profile.email}`;
          } else if (action) {
            router.push(action);
          }
          wipeTargetRef.current = 0;
        }
        if (wipeTargetRef.current === 0 && wipeAlphaRef.current <= 0) {
          stateRef.current = "walk";
        }
      }
    }

    function draw(now: number) {
      if (document.hidden) {
        lastTimeRef.current = now;
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      const delta = now - (lastTimeRef.current || now);
      lastTimeRef.current = now;
      accumRef.current += Math.min(delta, 200);

      while (accumRef.current >= FIXED_DT) {
        update();
        accumRef.current -= FIXED_DT;
      }

      const bg = bgRef.current!;
      const px = playerXRef.current;
      const cameraX = Math.min(Math.max(0, px - INTERNAL_W / 2), WORLD_W - INTERNAL_W);
      const state = stateRef.current;

      ctx.clearRect(0, 0, INTERNAL_W, INTERNAL_H);
      drawBackground(ctx, bg, cameraX);
      drawBuildings(ctx, zones, cameraX);
      drawLantern(ctx, zones, cameraX);

      ctx.strokeStyle = PAL.groundLine;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, INTERNAL_H - 28);
      ctx.lineTo(INTERNAL_W, INTERNAL_H - 28);
      ctx.stroke();

      drawPlayer(ctx, px, cameraX);

      if (state === "wipe" || wipeAlphaRef.current > 0) {
        drawWipe(ctx, wipeAlphaRef.current);
      }

      // ── Update DOM text overlays ─────────────────────────────────────────
      const groundY = INTERNAL_H - 28;

      // Examine prompt
      const currentZone = state === "walk" ? zones.find((z) => px >= z.xMin && px <= z.xMax) : null;

      // (b) ゾーン接近: プロンプトが出た「立ち上がり」一度だけ通知音（連打しない）
      const zoneLabel = currentZone ? currentZone.label : null;
      if (zoneLabel && zoneLabel !== prevZoneLabelRef.current) playSfx("approach");
      prevZoneLabelRef.current = zoneLabel;

      const ep = examinePromptRef.current;
      if (ep) {
        const text = currentZone ? `${LABEL_GAME_EXAMINE}　${currentZone.label}` : "";
        if (ep.textContent !== text) ep.textContent = text;
        const vis = currentZone ? "block" : "none";
        if (ep.style.display !== vis) ep.style.display = vis;
      }

      // Building sign labels — positioned as % of canvas-wrap
      let zoneIndex = 0;
      for (let i = 0; i < zones.length; i++) {
        const zone = zones[i];
        if (zone.action === "__return__") continue;
        const labelEl = buildingLabelRefs.current[zoneIndex];
        zoneIndex++;
        if (!labelEl) continue;
        const bx = zone.xMin - cameraX;
        const bw = zone.xMax - zone.xMin;
        const bh = 48;
        const by = groundY - bh;
        const signCenterX = bx + bw / 2;
        const signCenterY = by + 4 + 6; // sign midpoint Y in canvas px
        const visible = signCenterX > -bw && signCenterX < INTERNAL_W + bw;
        const vis = visible ? "block" : "none";
        if (labelEl.style.display !== vis) labelEl.style.display = vis;
        if (visible) {
          labelEl.style.left = `${(signCenterX / INTERNAL_W) * 100}%`;
          labelEl.style.top = `${(signCenterY / INTERNAL_H) * 100}%`;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [zones, router, examineZone]);

  // ── Resize: integer scale with letterbox ─────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const area = canvasAreaRef.current;
      if (!area) return;
      const availW = area.clientWidth;
      const availH = area.clientHeight;
      const scaleW = Math.max(1, Math.floor(availW / INTERNAL_W));
      const scaleH = Math.max(1, Math.floor(availH / INTERNAL_H));
      const scale = Math.min(scaleW, scaleH);
      canvas.style.width = `${INTERNAL_W * scale}px`;
      canvas.style.height = `${INTERNAL_H * scale}px`;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // ── Touch handlers ────────────────────────────────────────────────────────
  const setLeft = (v: boolean) => { touchRef.current.left = v; };
  const setRight = (v: boolean) => { touchRef.current.right = v; };
  const triggerExamine = () => { touchRef.current.examine = true; };

  // ── 効果音ミュートトグル（localStorage 永続・prefers-reduced-motion とは独立） ──
  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      setSfxMuted(next);
      return next;
    });
  }, []);

  // Building zones (excluding lantern) for DOM sign labels
  const buildingZones = zones.filter((z) => z.action !== "__return__");

  return (
    <div className="game-layer">
      {/* 効果音トグル — 左上（右上の「✕ もどる」と左右対称）。ランタンの炎で ON/OFF を表す。 */}
      <button
        type="button"
        role="switch"
        aria-checked={!muted}
        className={`game-sound-toggle${muted ? " is-off" : " is-on"}`}
        aria-label="効果音のオン/オフ"
        onClick={toggleMute}
      >
        <LanternIcon lit={!muted} />
        <span className="game-sound-label">{muted ? "OFF" : "ON"}</span>
      </button>

      {/* ✕ もどる — always visible, 44px+ tap target */}
      <button
        type="button"
        className="game-return-btn"
        aria-label="もどる"
        onClick={handleReturn}
      >
        <span className="game-return-x">✕</span>
        <span className="game-return-label">もどる</span>
      </button>

      {/* Canvas letterbox area */}
      <div className="game-canvas-area" ref={canvasAreaRef}>
        <div className="game-canvas-wrap" ref={canvasWrapRef}>
          <canvas
            ref={canvasRef}
            width={INTERNAL_W}
            height={INTERNAL_H}
            className="game-canvas"
            aria-label="探索シーン — キーボードまたは画面下のボタンで操作"
            onClick={() => { if (uiState === "dialog") dialogAdvance(); }}
          />

          {/* Building sign labels — world-space DOM overlays */}
          {buildingZones.map((zone, i) => (
            <div
              key={zone.label}
              ref={(el) => { buildingLabelRefs.current[i] = el; }}
              className="game-zone-label"
              style={{ display: "none" }}
            >
              {zone.label}
            </div>
          ))}

          {/* Examine prompt — visible when player is in zone (walk state) */}
          <div
            className="game-examine"
            ref={examinePromptRef}
            style={{ display: "none" }}
          />

          {/* Dialog window — visible in dialog state */}
          <div
            className="game-dialog"
            style={{ display: uiState === "dialog" ? "flex" : "none" }}
            onClick={dialogAdvance}
          >
            <div className="game-dialog-text" ref={dialogTextRef} />
            <div className="game-dialog-cursor" ref={dialogCursorRef} />
          </div>
        </div>
      </div>

      {/* Touch controls — below canvas in fullscreen layer */}
      <div className="game-controls" aria-label="タッチ操作">
        <button
          type="button"
          className="ex-btn"
          aria-label="左に移動"
          onPointerDown={() => setLeft(true)}
          onPointerUp={() => setLeft(false)}
          onPointerLeave={() => setLeft(false)}
        >
          ←
        </button>
        <button
          type="button"
          className="ex-btn ex-btn-examine"
          aria-label={uiState === "dialog" ? "すすむ / 決定" : "しらべる"}
          onClick={() => { if (uiState === "dialog") dialogAdvance(); else triggerExamine(); }}
        >
          {uiState === "dialog" ? "▶ すすむ" : (LABEL_GAME_EXAMINE.replace("▶", "").trim() || "しらべる")}
        </button>
        {uiState === "dialog" && (
          <button
            type="button"
            className="ex-btn"
            aria-label="キャンセル"
            onClick={dialogCancel}
          >
            もどる
          </button>
        )}
        <button
          type="button"
          className="ex-btn"
          aria-label="右に移動"
          onPointerDown={() => setRight(true)}
          onPointerUp={() => setRight(false)}
          onPointerLeave={() => setRight(false)}
        >
          →
        </button>
      </div>

      <div className="game-hint">
        <span>←→ 移動</span>
        <span>Z / スペース　しらべる</span>
        <span>X / Esc　もどる</span>
      </div>
    </div>
  );
}

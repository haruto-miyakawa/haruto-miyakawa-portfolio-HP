"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LABEL_GAME_EXAMINE, LABEL_GAME_RETURN } from "@/constants/labels";
import sceneData from "@/game/scene.json";
import { profile } from "@/content/content.data";

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
const FIXED_DT = 1000 / 60; // ms per tick

// ─── Palette (uses pro palette variables, not hardcoded) ──────────────────────
const PAL = {
  sky: "#1c1027",
  ground: "#2a1a0e",
  groundLine: "#3d2810",
  player: "#e8a040",
  playerOutline: "#110b09",
  building: "#221430",
  buildingLine: "#e8a040",
  signBg: "#1a0e26",
  signText: "#f5e6cc",
  examineText: "#e8a040",
  dialogBg: "rgba(12,8,20,0.92)",
  dialogBorder: "#e8a040",
  dialogText: "#f5e6cc",
  cursorColor: "#e8a040",
};

// ─── Build offscreen tileset (gray-box placeholder rects) ────────────────────
function buildTileset(): BackgroundLayer {
  const tileW = 16;
  const tileH = 16;
  const cols = Math.ceil(WORLD_W / tileW) + 2;
  const rows = Math.ceil(INTERNAL_H / tileH);
  const tiles = new Uint8Array(cols * rows); // all 0 = sky tile
  // Ground rows
  const groundRow = Math.floor((INTERNAL_H - 28) / tileH);
  for (let c = 0; c < cols; c++) {
    for (let r = groundRow; r < rows; r++) {
      tiles[r * cols + c] = 1; // ground tile
    }
  }
  // Build offscreen canvas for tileset
  const ts = document.createElement("canvas");
  ts.width = tileW * 2; // tile 0 = sky, tile 1 = ground
  ts.height = tileH;
  const ctx2 = ts.getContext("2d")!;
  // tile 0: sky
  ctx2.fillStyle = PAL.sky;
  ctx2.fillRect(0, 0, tileW, tileH);
  // tile 1: ground
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

// ─── Draw buildings (gray-box placeholder) ───────────────────────────────────
function drawBuildings(ctx: CanvasRenderingContext2D, zones: Zone[], cameraX: number) {
  const groundY = INTERNAL_H - 28;
  for (const zone of zones) {
    if (zone.action === "__return__") continue; // lantern: skip building rect
    const bx = zone.xMin - cameraX;
    const bw = zone.xMax - zone.xMin;
    const bh = 48;
    const by = groundY - bh;
    // building rect
    ctx.fillStyle = PAL.building;
    ctx.fillRect(bx, by, bw, bh);
    ctx.strokeStyle = PAL.buildingLine;
    ctx.lineWidth = 1;
    ctx.strokeRect(bx + 0.5, by + 0.5, bw - 1, bh - 1);
    // sign label
    ctx.fillStyle = PAL.signBg;
    const signH = 12;
    ctx.fillRect(bx + 4, by + 4, bw - 8, signH);
    ctx.strokeStyle = PAL.buildingLine;
    ctx.lineWidth = 0.5;
    ctx.strokeRect(bx + 4.5, by + 4.5, bw - 9, signH - 1);
    ctx.fillStyle = PAL.signText;
    ctx.font = "7px monospace";
    ctx.textAlign = "center";
    ctx.fillText(zone.label, bx + bw / 2, by + 4 + 9, bw - 10);
  }
  ctx.textAlign = "left";
}

// ─── Draw lantern (placeholder circle) ───────────────────────────────────────
function drawLantern(ctx: CanvasRenderingContext2D, zones: Zone[], cameraX: number) {
  const lantern = zones.find((z) => z.action === "__return__");
  if (!lantern) return;
  const groundY = INTERNAL_H - 28;
  const lx = ((lantern.xMin + lantern.xMax) / 2) - cameraX;
  // glow
  const grad = ctx.createRadialGradient(lx, groundY - 28, 2, lx, groundY - 28, 18);
  grad.addColorStop(0, "rgba(255,170,70,0.5)");
  grad.addColorStop(1, "rgba(255,170,70,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(lx, groundY - 28, 18, 0, Math.PI * 2);
  ctx.fill();
  // body
  ctx.fillStyle = "#e8924f";
  ctx.fillRect(lx - 5, groundY - 40, 10, 14);
  ctx.fillStyle = "#f0b060";
  ctx.fillRect(lx - 3, groundY - 38, 6, 10);
}

// ─── Draw player ──────────────────────────────────────────────────────────────
function drawPlayer(ctx: CanvasRenderingContext2D, playerX: number, cameraX: number) {
  const groundY = INTERNAL_H - 28;
  const px = playerX - cameraX - PLAYER_W / 2;
  const py = groundY - PLAYER_H;
  ctx.fillStyle = PAL.playerOutline;
  ctx.fillRect(px - 1, py - 1, PLAYER_W + 2, PLAYER_H + 2);
  ctx.fillStyle = PAL.player;
  ctx.fillRect(px, py, PLAYER_W, PLAYER_H);
  // head (slightly lighter)
  ctx.fillStyle = "#f0b060";
  ctx.fillRect(px + 1, py, PLAYER_W - 2, PLAYER_H / 3);
}

// ─── Draw examine prompt ─────────────────────────────────────────────────────
function drawExaminePrompt(ctx: CanvasRenderingContext2D, label: string) {
  ctx.fillStyle = PAL.examineText;
  ctx.font = "bold 7px monospace";
  ctx.textAlign = "center";
  ctx.fillText(LABEL_GAME_EXAMINE + " " + label, INTERNAL_W / 2, INTERNAL_H - 6);
  ctx.textAlign = "left";
}

// ─── Draw dialog box ─────────────────────────────────────────────────────────
function drawDialog(ctx: CanvasRenderingContext2D, line: string, page: number, total: number) {
  const pad = 8;
  const boxH = 42;
  const bx = pad;
  const by = INTERNAL_H - boxH - pad;
  const bw = INTERNAL_W - pad * 2;
  // box
  ctx.fillStyle = PAL.dialogBg;
  ctx.fillRect(bx, by, bw, boxH);
  ctx.strokeStyle = PAL.dialogBorder;
  ctx.lineWidth = 1;
  ctx.strokeRect(bx + 0.5, by + 0.5, bw - 1, boxH - 1);
  // inner border
  ctx.strokeStyle = "rgba(232,160,64,0.3)";
  ctx.lineWidth = 0.5;
  ctx.strokeRect(bx + 3, by + 3, bw - 6, boxH - 6);
  // text
  ctx.fillStyle = PAL.dialogText;
  ctx.font = "8px monospace";
  ctx.fillText(line, bx + 8, by + 16, bw - 16);
  // page indicator / cursor
  if (page < total - 1) {
    ctx.fillStyle = PAL.cursorColor;
    ctx.font = "8px monospace";
    ctx.textAlign = "right";
    ctx.fillText("▼", bx + bw - 8, by + boxH - 8);
    ctx.textAlign = "left";
  } else {
    // last page — show confirm prompt
    ctx.fillStyle = PAL.cursorColor;
    ctx.font = "7px monospace";
    ctx.textAlign = "right";
    ctx.fillText("[Z] はい  [X] いいえ", bx + bw - 8, by + boxH - 8);
    ctx.textAlign = "left";
  }
}

// ─── Draw wipe overlay ───────────────────────────────────────────────────────
function drawWipe(ctx: CanvasRenderingContext2D, alpha: number) {
  ctx.fillStyle = `rgba(12,8,20,${alpha})`;
  ctx.fillRect(0, 0, INTERNAL_W, INTERNAL_H);
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ExplorationScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  // Input state (mutable refs to avoid re-renders in game loop)
  const keysRef = useRef<Set<string>>(new Set());
  const touchRef = useRef<{ left: boolean; right: boolean; examine: boolean }>({
    left: false,
    right: false,
    examine: false,
  });

  // Game state refs
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

  // ── Examine current zone ───────────────────────────────────────────────────
  const examineZone = useCallback((zone: Zone) => {
    dialogZoneRef.current = zone;
    dialogPageRef.current = 0;
    stateRef.current = "dialog";
  }, []);

  // ── Confirm last dialog page (navigate or return) ─────────────────────────
  const confirmDialog = useCallback(() => {
    const zone = dialogZoneRef.current;
    if (!zone) return;
    stateRef.current = "wipe";
    wipeAlphaRef.current = 0;
    wipeTargetRef.current = 1;
    wipeActionRef.current = zone.action;
  }, []);

  // ── Input handlers ────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "z", "Z", "x", "X", "Escape", " "].includes(e.key)) {
        e.preventDefault();
      }
      keysRef.current.add(e.key);

      // Dialog input
      if (stateRef.current === "dialog") {
        if (["z", "Z", " ", "Enter"].includes(e.key)) {
          const zone = dialogZoneRef.current;
          if (!zone) return;
          if (dialogPageRef.current < zone.dialog.length - 1) {
            dialogPageRef.current++;
          } else {
            confirmDialog();
          }
        }
        if (["x", "X", "Escape"].includes(e.key)) {
          stateRef.current = "walk";
          dialogZoneRef.current = null;
        }
      }

      // Walk: examine
      if (stateRef.current === "walk" && ["z", "Z", " "].includes(e.key)) {
        const px = playerXRef.current;
        const zone = zones.find((z) => px >= z.xMin && px <= z.xMax);
        if (zone) examineZone(zone);
      }
      // ESC from walk: return to normal site
      if (stateRef.current === "walk" && e.key === "Escape") {
        wipeActionRef.current = "__return__";
        stateRef.current = "wipe";
        wipeAlphaRef.current = 0;
        wipeTargetRef.current = 1;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.key);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [zones, examineZone, confirmDialog]);

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
        // Touch examine
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
          // Fully black — execute action
          const action = wipeActionRef.current;
          if (action === "__return__") {
            // Switch back to pro mode
            document.documentElement.dataset.mode = "pro";
            try { localStorage.setItem("site-mode", "pro"); } catch { /* private browsing */ }
          } else if (action === "__mail__") {
            window.location.href = `mailto:${profile.email}`;
          } else if (action) {
            router.push(action);
          }
          wipeTargetRef.current = 0; // start fade-out (or router handles navigation)
          if (action === "__return__") {
            // Don't navigate, just fade back
            wipeTargetRef.current = 0;
          }
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
      accumRef.current += Math.min(delta, 200); // cap to avoid spiral of death

      while (accumRef.current >= FIXED_DT) {
        update();
        accumRef.current -= FIXED_DT;
      }

      const bg = bgRef.current!;
      const px = playerXRef.current;
      // Camera: center on player, clamped to world bounds
      const cameraX = Math.min(
        Math.max(0, px - INTERNAL_W / 2),
        WORLD_W - INTERNAL_W
      );

      ctx.clearRect(0, 0, INTERNAL_W, INTERNAL_H);
      drawBackground(ctx, bg, cameraX);
      drawBuildings(ctx, zones, cameraX);
      drawLantern(ctx, zones, cameraX);

      // Ground line
      ctx.strokeStyle = PAL.groundLine;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, INTERNAL_H - 28);
      ctx.lineTo(INTERNAL_W, INTERNAL_H - 28);
      ctx.stroke();

      drawPlayer(ctx, px, cameraX);

      const state = stateRef.current;
      if (state === "walk") {
        const zone = zones.find((z) => px >= z.xMin && px <= z.xMax);
        if (zone) drawExaminePrompt(ctx, zone.label);
      }
      if (state === "dialog") {
        const zone = dialogZoneRef.current;
        if (zone) {
          drawExaminePrompt(ctx, zone.label);
          drawDialog(ctx, zone.dialog[dialogPageRef.current], dialogPageRef.current, zone.dialog.length);
        }
      }
      if (state === "wipe" || wipeAlphaRef.current > 0) {
        drawWipe(ctx, wipeAlphaRef.current);
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [zones, router, examineZone, confirmDialog]);

  // ── Resize: integer scale ─────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const w = canvas.parentElement?.clientWidth ?? INTERNAL_W;
      const scale = Math.max(1, Math.floor(w / INTERNAL_W));
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

  const dialogCancel = () => {
    if (stateRef.current === "dialog") {
      stateRef.current = "walk";
      dialogZoneRef.current = null;
    }
  };
  const dialogAdvance = () => {
    const zone = dialogZoneRef.current;
    if (!zone) return;
    if (dialogPageRef.current < zone.dialog.length - 1) {
      dialogPageRef.current++;
    } else {
      confirmDialog();
    }
  };

  return (
    <div className="exploration-wrap">
      <canvas
        ref={canvasRef}
        width={INTERNAL_W}
        height={INTERNAL_H}
        className="exploration-canvas"
        aria-label="探索シーン — キーボードまたは画面下のボタンで操作"
      />
      <div className="exploration-controls" aria-label="タッチ操作">
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
          aria-label="しらべる / 決定"
          onClick={stateRef.current === "dialog" ? dialogAdvance : triggerExamine}
        >
          {LABEL_GAME_EXAMINE.replace("▶", "").trim() || "しらべる"}
        </button>
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
      <div className="exploration-hint">
        <span>←→ 移動</span>
        <span>Z / スペース　しらべる</span>
        <span>X / Esc　キャンセル</span>
      </div>
    </div>
  );
}

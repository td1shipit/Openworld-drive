import { world } from "./world.js";
import { renderList } from "./ui.js";

async function load(path) {
  const res = await fetch(path);
  return res.json();
}

function generateGameCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function setupMultiplayerUI() {
  const createBtn = document.getElementById("create-game-btn");
  const gameCodeSpan = document.getElementById("game-code");
  const joinBtn = document.getElementById("join-game-btn");
  const joinInput = document.getElementById("join-code-input");
  const joinStatus = document.getElementById("join-status");

  createBtn.addEventListener("click", () => {
    const code = generateGameCode();
    gameCodeSpan.textContent = code;
    joinStatus.textContent = "";
  });

  joinBtn.addEventListener("click", () => {
    const code = joinInput.value.trim().toUpperCase();
    if (!code) {
      joinStatus.textContent = "Enter a code first.";
      return;
    }
    joinStatus.textContent = `Trying to join game ${code}...`;
  });
}

async function start() {
  const vehicles = await load("src/data/vehicles.json");
  const locations = await load("src/data/locations.json");
  const bots = await load("src/data/bots.json");

  document.getElementById("world").innerText =
    `${world.name} — ${world.description}`;

  renderList(
    document.getElementById("vehicles"),
    vehicles,
    (v) => `${v.name} (${v.type}) — FREE`
  );

  renderList(
    document.getElementById("locations"),
    locations,
    (l) => l.name
  );

  renderList(
    document.getElementById("bots"),
    bots,
    (b) => `${b.name} driving a ${b.vehicle}`
  );

  setupMultiplayerUI();
}

start().catch(console.error);

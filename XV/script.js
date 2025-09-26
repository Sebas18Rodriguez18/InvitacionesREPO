window.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");

  // Inicialmente lo dejamos muteado
  bgMusic.muted = true;
  bgMusic.volume = 0.6;

  // Intentar reproducir apenas cargue
  bgMusic.play().catch(() => {
    console.log("Autoplay bloqueado. Esperando interacción...");
  });

  // Apenas el usuario interactúe, habilitamos el sonido
  const enableSound = () => {
    if (bgMusic.paused) {
      bgMusic.play();
    }
    bgMusic.muted = false;
    document.removeEventListener("click", enableSound);
    document.removeEventListener("touchstart", enableSound);
  };

  document.addEventListener("click", enableSound);
  document.addEventListener("touchstart", enableSound);
});

// === Countdown ===
function countdown() {
  const target = new Date("October 18, 2025 19:30:00").getTime();
  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = target - now;

    if (distance < 0) {
      clearInterval(interval);
      document.getElementById("countdown").innerHTML = "¡Es hoy!";
      return;
    }

    document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
  }, 1000);
}
countdown();

// === Mapa desbloqueable ===
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("mapOverlay");
  if (overlay) {
    overlay.addEventListener("click", () => {
      overlay.style.display = "none";
    });
  }
});
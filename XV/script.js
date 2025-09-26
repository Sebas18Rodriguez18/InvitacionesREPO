// === Música de fondo ===
window.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");

  // Intentar reproducir automáticamente
  const playMusic = () => {
    bgMusic.play().then(() => {
      bgMusic.muted = false;
      bgMusic.volume = 0.6;
    }).catch((err) => {
      console.log("Autoplay bloqueado por el navegador:", err);
    });
  };

  playMusic();

  // Intentar de nuevo en caso de que el navegador lo bloquee
  document.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      bgMusic.muted = false;
    }
  });
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
  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });
});
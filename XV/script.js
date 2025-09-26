function spawnLantern() {
  const lantern = document.createElement("div");
  lantern.className = "lantern";
  lantern.style.left = Math.random() * 90 + "%";
  lantern.style.animationDuration = (12 + Math.random() * 8) + "s";

  const size = 30 + Math.random() * 40;
  lantern.style.width = size + "px";
  lantern.style.height = size * 1.5 + "px";
  lantern.style.opacity = 0.5 + Math.random() * 0.5;

  document.querySelector(".hero").appendChild(lantern);
  setTimeout(() => lantern.remove(), 15000);
}
setInterval(spawnLantern, 2500);

class CountdownTimer {
  constructor() {
    this.targetDate = new Date(2025, 9, 18, 19, 30, 0, 0).getTime();

    this.daysEl = document.getElementById("days");
    this.hoursEl = document.getElementById("hours");
    this.minutesEl = document.getElementById("minutes");
    this.secondsEl = document.getElementById("seconds");

    this.init();
  }

  init() {
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000);
  }

  updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance < 0) {
      this.daysEl.textContent = "00";
      this.hoursEl.textContent = "00";
      this.minutesEl.textContent = "00";
      this.secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.daysEl.textContent = String(days).padStart(2,"0");
    this.hoursEl.textContent = String(hours).padStart(2,"0");
    this.minutesEl.textContent = String(minutes).padStart(2,"0");
    this.secondsEl.textContent = String(seconds).padStart(2,"0");
  }
}

new CountdownTimer();

const bgMusic = new Audio("music/XV-Tangled.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.6;

document.addEventListener("DOMContentLoaded", () => {
  bgMusic.play().catch(() => {
    document.body.addEventListener("click", () => {
      bgMusic.play();
    }, { once: true });
  });
});
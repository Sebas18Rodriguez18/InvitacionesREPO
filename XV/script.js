window.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");
  const toggleBtn = document.getElementById("musicToggle");

  bgMusic.volume = 0.6;
  toggleBtn.classList.add("paused");

  toggleBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        bgMusic.muted = false;
        toggleBtn.classList.remove("paused");
        toggleBtn.classList.add("playing");
      });
    } else {
      bgMusic.pause();
      toggleBtn.classList.remove("playing");
      toggleBtn.classList.add("paused");
    }
  });

  const enableSound = () => {
    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        bgMusic.muted = false;
        toggleBtn.classList.remove("paused");
        toggleBtn.classList.add("playing");
      });
    }
    document.removeEventListener("touchstart", enableSound);
    document.removeEventListener("click", enableSound);
  };
  document.addEventListener("touchstart", enableSound);
  document.addEventListener("click", enableSound);

  const rainContainer = document.getElementById("mailRain");
  const numMails = 15;

  for (let i = 0; i < numMails; i++) {
    const mail = document.createElement("div");
    mail.classList.add("mail");
    mail.innerText = "$";
    mail.style.left = `${Math.random() * 100}%`;
    mail.style.animationDuration = `${4 + Math.random() * 4}s`;
    mail.style.animationDelay = `${Math.random() * 4}s`;
    rainContainer.appendChild(mail);
  }
});

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
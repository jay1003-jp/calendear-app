const video = document.getElementById("backgroundVideo");
const overlay = document.getElementById("overlay");
const startButton = document.getElementById("startGameButton");
const infoButton = document.getElementById("infoButton");

function freezeOnFirstFrame() {
  if (!video) return;

  video.pause();
  video.currentTime = 0;
  video.style.opacity = "1";
}

if (video.readyState >= 2) {
  freezeOnFirstFrame();
} else {
  video.addEventListener("loadeddata", freezeOnFirstFrame, { once: true });
}

startButton.addEventListener("click", () => {
  overlay.classList.remove("show-info");
  overlay.classList.add("is-hidden");

  if (!video) {
    return;
  }

  video.removeAttribute("muted");
  video.muted = false;
  const playPromise = video.play();

  if (playPromise instanceof Promise) {
    playPromise.catch(() => {
      // If playback fails (e.g., autoplay restrictions), keep the video muted and retry.
      video.setAttribute("muted", "");
      video.muted = true;
      video.play().catch(() => {
        // no-op, user interaction already happened so this should rarely fail
      });
    });
  }
});

if (infoButton) {
  infoButton.addEventListener("click", () => {
    overlay.classList.toggle("show-info");
  });
}

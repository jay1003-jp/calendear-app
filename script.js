const startButton = document.getElementById("startButton");
const bgVideo = document.getElementById("bgVideo");
const whiteout = document.getElementById("whiteout");
const introScreen = document.getElementById("introScreen");
const gameScreen = document.getElementById("gameScreen");

startButton.addEventListener("click", () => {
  // 背景動画をリセットして再生（ホワイトアウト付きの完全版）
  bgVideo.currentTime = 0;
  bgVideo.play();

  // ボタンを非表示
  startButton.classList.add("hidden");

  // 動画の再生終了を監視
  bgVideo.addEventListener("ended", () => {
    // ホワイトアウト開始
    whiteout.classList.remove("hidden");
    whiteout.style.opacity = "1";

    // 白フェードが終わったら次画面へ遷移
    setTimeout(() => {
      introScreen.classList.add("hidden");
      whiteout.style.opacity = "0";
      whiteout.classList.add("hidden");
      gameScreen.classList.remove("hidden");
    }, 2000); // 白フェード後2秒で切り替え
  });
});

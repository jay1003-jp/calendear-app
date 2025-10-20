const startButton = document.getElementById("startButton");
const howToButton = document.getElementById("howToButton");
const bgVideo = document.getElementById("bgVideo");
const whiteout = document.getElementById("whiteout");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

// 🎮 ゲーム開始ボタン
startButton.addEventListener("click", () => {
  bgVideo.currentTime = 0;
  bgVideo.loop = false; // ✅ 一回だけ再生
  bgVideo.play();

  // 再生終了時のホワイトアウト
  bgVideo.addEventListener("ended", () => {
    whiteout.classList.remove("hidden");
    setTimeout(() => {
      whiteout.style.opacity = "1";
    }, 100);

    // ホワイトアウト後に遷移（例：別ページや新しい要素表示）
    setTimeout(() => {
      alert("次の画面へ！✨（ここに遷移処理を追加）");
    }, 2500);
  });
});

// ❔ 遊び方ボタン
howToButton.addEventListener("click", () => {
  popup.classList.remove("hidden");
});

// 閉じるボタン
closePopup.addEventListener("click", () => {
  popup.classList.add("hidden");
});

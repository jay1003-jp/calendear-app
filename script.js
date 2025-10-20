 const door = document.getElementById("door");
 const doorContainer = document.getElementById("doorContainer");
 const videoContainer = document.getElementById("videoContainer");
 const videoPlayer = document.getElementById("videoPlayer");
 const title = document.getElementById("title");
 const message = document.getElementById("message");
 const photoBg = document.getElementById("photoBg");
 const lockedMessage = document.getElementById("lockedMessage");
+const whiteout = document.getElementById("whiteout");
+const nextScreen = document.getElementById("nextScreen");
 
 let currentDate = new Date();
 let currentDay = currentDate.getDate();
 const storageKey = "lastWatchedDate";
 
 // 動画・写真パス
 function getVideoPath() {
   return `movies/${String(currentDay).padStart(2, '0')}.mp4`;
 }
 function getPhotoPath() {
   return `images/bg_${String(currentDay).padStart(2, '0')}.jpg`;
 }
 
 // タイトル更新
 title.textContent = `${currentDate.getMonth() + 1}月${currentDay}日`;
 
 // ロック確認
 const lastWatched = localStorage.getItem(storageKey);
 if (lastWatched === `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDay}`) {
   doorContainer.classList.add("hidden");
+  videoContainer.classList.add("hidden");
   lockedMessage.classList.remove("hidden");
+  nextScreen.classList.remove("hidden");
 }
 
 // 扉クリック処理
 door.addEventListener("click", () => {
   // 扉開くアニメーション
   door.classList.add("open");
+  lockedMessage.classList.add("hidden");
+  nextScreen.classList.add("hidden");
+
   setTimeout(() => {
     doorContainer.classList.add("hidden");
     videoContainer.classList.remove("hidden");
 
     // 背景写真と動画をセット
     photoBg.style.backgroundImage = `url('${getPhotoPath()}')`;
     videoPlayer.src = getVideoPath();
     videoPlayer.play();
 
     message.textContent = "動画を最後まで見てね！";
   }, 1200);
 });
 
 // 動画終了時の処理
 videoPlayer.addEventListener("ended", () => {
   message.textContent = "お疲れさま！今日の扉は閉まります🔒";
 
   // 視聴済み記録
   localStorage.setItem(storageKey, `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDay}`);
 
-  // 扉を閉める
-  setTimeout(() => {
+  const handleFadeInEnd = (event) => {
+    if (event.target !== whiteout || !whiteout.classList.contains("active")) {
+      return;
+    }
+
+    whiteout.removeEventListener("transitionend", handleFadeInEnd);
+
     videoContainer.classList.add("hidden");
-    doorContainer.classList.remove("hidden");
+    doorContainer.classList.add("hidden");
     door.classList.remove("open");
+    nextScreen.classList.remove("hidden");
     lockedMessage.classList.remove("hidden");
-  }, 3000);
+
+    requestAnimationFrame(() => {
+      whiteout.classList.remove("active");
+    });
+
+    const handleFadeOutEnd = (fadeEvent) => {
+      if (fadeEvent.target !== whiteout || whiteout.classList.contains("active")) {
+        return;
+      }
+
+      whiteout.classList.add("hidden");
+      whiteout.removeEventListener("transitionend", handleFadeOutEnd);
+    };
+
+    whiteout.addEventListener("transitionend", handleFadeOutEnd);
+  };
+
+  whiteout.classList.remove("hidden");
+  requestAnimationFrame(() => {
+    whiteout.classList.add("active");
+  });
+
+  whiteout.addEventListener("transitionend", handleFadeInEnd);
 });
 
 // 日付変更監視（0時更新）
 function checkDateChange() {
   const now = new Date();
   if (now.getDate() !== currentDay) {
     localStorage.removeItem(storageKey); // ロック解除
     location.reload();
   }
 }
 setInterval(checkDateChange, 60000);

//Elements
const iFrame = document.querySelector(".iframe");
const reconnectButton = document.querySelector(".float-button");
const stopButton = document.querySelector(".float-button.top");

let params = new URL(document.location).searchParams;
let url = params.get("url");
iFrame.src = url;

reconnectButton.addEventListener("click", () => {
  window.open("./../app.html?url=" + url, "_self");
});

stopButton.addEventListener("click", () => {
  window.open("./../index.html", "_self");
});

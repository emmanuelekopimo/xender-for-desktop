//Elements
const connectButton = document.querySelector(".connect-button");
const modalContent = document.querySelector(".content.modal-content");
const modalTitle = document.querySelector(".section.title.modal-title");
const modalButton = document.querySelector(".modal-button");
const modal = document.querySelector(".modal");

// Functions
const onWindowClose = () => {
  Neutralino.app.exit();
};

const connect = async () => {
  await Neutralino.os.spawnProcess(`"wifi/wifi.exe"`);
};

// Initializations
Neutralino.init();

// Events listeners
Neutralino.events.on("windowClose", onWindowClose);

Neutralino.events.on("spawnedProcess", async (evt) => {
  switch (evt.detail.action) {
    case "stdOut":
      console.log(evt.detail.data);
      //url recieved from wifi program
      url = evt.detail.data;
      window.open("./../app.html?url=" + url, "_self");
      break;
    case "stdErr":
      console.error(evt.detail.data);
      //Internal error from the terminal program
      break;
    case "exit":
      if (evt.detail.data == "0") {
        console.log("0");
        // Closed without any errors
      }
      if (evt.detail.data == "1") {
        console.log("1");
        //Wi-Fi is not available onthe system
        modalTitle.innerText = "Wi-Fi Adapter Error";
        modalContent.innerText = `Wi-Fi adapter not found on this system. Try reinserting or rebooting the adapter`;
        modal.classList.toggle("show", true);
      }
      if (evt.detail.data == "2") {
        console.log("2");
        //Wi-Fi is not connected
        modalTitle.innerText = "Wi-Fi Adapter Error";
        modalContent.innerText = `Wi-Fi is not connected on this system. Connect to a Wi-Fi network to link phone`;
        modal.classList.toggle("show", true);
      } else {
        console.log(evt.detail.data);
        //Any other errors
      }
  }
});

//Bindings
connectButton.addEventListener("click", () => {
  connect();
});

modalButton.addEventListener("click", () => {
  modal.classList.toggle("show", false);
});

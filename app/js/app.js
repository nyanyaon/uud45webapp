//SideBar
function addClickMenuEvent() {
  let btnOpen = document.getElementById("menu-btn");
  let btnClose = document.getElementById("close-btn");
  let sidebar = document.getElementById("sidebar");

  btnOpen.addEventListener("click", (e) => {
    sidebar.classList.toggle("mobile-only");
  });

  btnClose.addEventListener("click", (e) => {
    sidebarAnim(sidebar);
  });
}

let sidebarAnim = (sidebar) => {
  sidebar.style.animationName = "out";
  setTimeout(() => {
    sidebar.style.animationName = "in";
    sidebar.classList.toggle("mobile-only");
  }, 400);
};

//Display Content
const uud45FileName = "/app/js/uud45.json";
async function getMenu() {
  let response = await fetch(uud45FileName);
  const data = await response.json();
  let el = document.getElementById("list-menu");
  for (const prop in data) {
    el.insertAdjacentHTML(
      "beforeend",
      `<li><a href="#" data-bab="${prop}">${data[prop]["BAB"]} ${data[prop]["title"]}</a></li>`
    );
  }
  setEvent();
}

function createH(text) {
  let h = document.createElement("h2");
  h.innerText = "Pasal " + text;

  return h;
}

function createP(text, order) {
  let p = document.createElement("p");
  p.innerText = `(${++order}) ${text}`;
  p.style.cssText += `--order: ${++order}`;

  return p;
}

function createPWithoutOrder(text) {
  let p = document.createElement("p");
  p.innerText = `${text}`;
  p.style.cssText += `--order: 1`;

  return p;
}

async function renderData(bab) {
  let article = document.getElementById("article");
  article.innerHTML = "";

  let response = await fetch(uud45FileName);
  const data = await response.json();

  let pasal = data[bab]["pasal"];

  for (item of pasal) {
    let el = document.createElement("div");
    el.classList.add("pasal");
    if (item["no"] !== "") {
      el.appendChild(createH(item["no"]));
    }

    if (item["ayat"].length === 1) {
      el.appendChild(createPWithoutOrder(item["ayat"][0]));
    } else {
      for (let order in item["ayat"]) {
        el.appendChild(createP(item["ayat"][order], order));
      }
    }
    article.appendChild(el);
  }
}

function setEvent() {
  let nav = document.querySelector("ul.nav");
  let lis = nav.querySelectorAll("li>a");
  let sidebar = document.getElementById("sidebar");

  lis.forEach(function (li) {
    li.addEventListener("click", function (e) {
      sidebarAnim(sidebar);
      let bab = li.dataset.bab;
      renderData(bab);
      focusOn(e.target);
    });
  });
}

function focusOn(e) {
  for (let li of e.parentElement.parentElement.children) {
    let a = li.querySelector("a");
    a.classList.remove("selected");
  }
  e.classList.add("selected");
}

function setAboutBtn() {
  let aboutmeBtn = document.getElementById("about-btn");
  let aboutmeModal = document.getElementById("aboutme-modal");
  let closeBtn = document.getElementById("modalCloseBtn");

  aboutmeBtn.addEventListener("click", () => {
    aboutmeModal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    aboutmeModal.style.display = "none";
  });
}

// function deleteMsgBox() {
//   let msgBox = document.getElementById("msgBox");

//   if (sessionStorage.getItem("hasDeletedMsgBox") == "true") {
//     msgBox.remove();
//   }

//   setTimeout(() => {
//     msgBox.remove();
//     sessionStorage.setItem("hasDeletedMsgBox", true);
//   }, 10000);
// }

document.addEventListener("DOMContentLoaded", async function (e) {
  getMenu();
  addClickMenuEvent();
  setAboutBtn();
  deleteMsgBox();

  let installBtn = document.getElementById("install-btn");
  installBtn.addEventListener("click", async () => {
    // Hide the app provided install promotion

    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
  });
});

// window.addEventListener("load", () => {
//     if ("serviceWorker" in navigator) {
//       navigator.serviceWorker.register("service-worker.js");
//     }
// });

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  // Optionally, send analytics event that PWA install promo was shown.
  console.log(`'beforeinstallprompt' event was fired.`);
});

window.addEventListener("appinstalled", () => {
  // Clear the deferredPrompt so it can be garbage collected
  deferredPrompt = null;
  // Optionally, send analytics event to indicate successful install
  console.log("app has installed");
});

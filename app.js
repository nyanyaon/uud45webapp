//SideBar
function addClickMenuEvent() {
    let btn = document.getElementById("menu-btn");
    let sidebar = document.getElementById("sidebar");

    btn.addEventListener("click", (e) => {
        sidebar.classList.toggle("mobile-only");
        setTimeout(()=>{
            sidebar.style.opacity = 1;
        }, 200)
    });
}


//Display Content

async function getMenu() {
    let response = await fetch("uud45.json");
    const data = await response.json();
    let el = document.getElementById("list-menu");
    for(const prop in data) {
        el.insertAdjacentHTML("beforeend", `<li><a href="#" data-bab="${prop}">${data[prop]["BAB"]} ${data[prop]["title"]}</a></li>`)
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
    p.innerText =  `(${++order}) ${text}`;
    p.style.cssText += `--order: ${++order}`;

    return p;
}

function createPWithoutOrder(text) {
    let p = document.createElement("p");
    p.innerText =  `${text}`;

    return p;
}

async function renderData(bab) {
    let response = await fetch("uud45.json");
    const data = await response.json();

    let pasal = data[bab]["pasal"];

    let article = document.getElementById("article");
    article.innerHTML = "";
    for(item of pasal) {
        let el = document.createElement("div");
        el.classList.add("pasal");
        if(item["no"] !== "") {
            el.appendChild(createH(item["no"]));
        }

        if(item["ayat"].length === 1) {
            el.appendChild(createPWithoutOrder(item["ayat"][0]));
        } else {
            for(let order in item["ayat"]) {
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

    lis.forEach(function(li) {
        li.addEventListener("click", function(e){
            let bab = li.dataset.bab;
            renderData(bab);
            focusOn(e.target);
            sidebar.style.opacity = 0;
            setTimeout(()=>{
                sidebar.classList.toggle("mobile-only");
            }, 200)
        });
    });
}

function focusOn(e) {
    console.log(e.parentElement.parentElement.children);
    for(let li of e.parentElement.parentElement.children) {
        let a = li.querySelector("a");
        a.classList.remove("selected");
    }
    e.classList.add("selected");
}

document.addEventListener("DOMContentLoaded", async function(e) {
    getMenu();
    addClickMenuEvent();
});


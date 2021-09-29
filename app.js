async function getMenu() {
    let response = await fetch("uud45.json");
    const data = await response.json();
    let el = document.getElementById("list-menu");
    for(const prop in data) {
        el.insertAdjacentHTML("beforeend", `<li><a href="#" data-bab="${prop}">${data[prop]["BAB"]} ${data[prop]["title"]}</a></li>`)
    }

}

function createH(text) {
    let h = document.createElement("h2");
    h.innerText = "Pasal " + text;

    return h;
}

function createP(text) {
    let p = document.createElement("p");
    p.innerText = text;

    return p;
}

async function renderData(bab) {
    let response = await fetch("uud45.json");
    const data = await response.json();

    let pasal = data[bab]["pasal"];

    let article = document.getElementById("article");
    article.innerHTML = "";
    for(item of pasal) {
        console.log(item);
        article.appendChild(createH(item["no"]));
        for(ayat of item["ayat"]) {
            article.appendChild(createP(ayat));
        }
    }
}

function setEvent() {
    let nav = document.querySelector("ul.nav");
    let lis = nav.querySelectorAll("li>a");

    lis.forEach(function(li) {
        console.log(li.dataset.bab);
        li.addEventListener("click", function(){
            let bab = li.dataset.bab;
            renderData(bab);
        });
    });
}

document.addEventListener("DOMContentLoaded", async function(e) {
    await getMenu();
    setEvent();
});


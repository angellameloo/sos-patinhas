/* ======================================================
   SOS PATINHAS
   script.js
====================================================== */

/* ===========================
   MENU FIXO
=========================== */

window.addEventListener("scroll", function () {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.classList.add("shadow");

    } else {

        navbar.classList.remove("shadow");

    }

});

/* ===========================
   BOTÃO VOLTAR AO TOPO
=========================== */

const btnTopo = document.createElement("button");

btnTopo.id = "btnTopo";

btnTopo.innerHTML = "⬆";

document.body.appendChild(btnTopo);

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        btnTopo.style.display = "block";

    } else {

        btnTopo.style.display = "none";

    }

});

btnTopo.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* ===========================
   FAVORITOS
=========================== */

const favoritos = document.querySelectorAll(".favorite-btn");

favoritos.forEach(botao => {

    botao.addEventListener("click", function () {

        const icone = this.querySelector("i");

        if (icone.classList.contains("bi-heart")) {

            icone.classList.remove("bi-heart");

            icone.classList.add("bi-heart-fill");

            this.classList.remove("btn-outline-danger");

            this.classList.add("btn-danger");

        } else {

            icone.classList.remove("bi-heart-fill");

            icone.classList.add("bi-heart");

            this.classList.remove("btn-danger");

            this.classList.add("btn-outline-danger");

        }

    });

});

/* ===========================
   MENSAGEM DE BOAS-VINDAS
=========================== */

window.addEventListener("load", () => {

    console.log("Bem-vindo ao SOS Patinhas!");

});

/* ===========================
   ANIMAÇÃO DOS CARDS
=========================== */

const cards = document.querySelectorAll(".animal-card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});
/* ======================================================
   PESQUISA DE ANIMAIS
====================================================== */

const campoPesquisa = document.querySelector("#pesquisa");

if (campoPesquisa) {

    campoPesquisa.addEventListener("keyup", function () {

        let texto = this.value.toLowerCase();

        let cards = document.querySelectorAll(".animal-card");

        cards.forEach(card => {

            let nome = card.querySelector("h5").innerText.toLowerCase();

            if (nome.includes(texto)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

/* ======================================================
   FAVORITOS (LOCAL STORAGE)
====================================================== */

let favoritosSalvos =
JSON.parse(localStorage.getItem("favoritos")) || [];

const botoesFavorito =
document.querySelectorAll(".favorite-btn");

botoesFavorito.forEach((botao, indice) => {

    if(favoritosSalvos.includes(indice)){

        botao.classList.add("btn-danger");

        botao.innerHTML='<i class="bi bi-heart-fill"></i>';

    }

    botao.addEventListener("click",()=>{

        if(favoritosSalvos.includes(indice)){

            favoritosSalvos =
            favoritosSalvos.filter(item=>item!=indice);

            botao.classList.remove("btn-danger");

            botao.classList.add("btn-outline-danger");

            botao.innerHTML='<i class="bi bi-heart"></i>';

        }

        else{

            favoritosSalvos.push(indice);

            botao.classList.remove("btn-outline-danger");

            botao.classList.add("btn-danger");

            botao.innerHTML='<i class="bi bi-heart-fill"></i>';

        }

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritosSalvos)
        );

    });

});

/* ======================================================
   SCROLL SUAVE
====================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

const destino=document.querySelector(this.getAttribute("href"));

if(destino){

destino.scrollIntoView({

behavior:"smooth"

});

}

});

});

/* ======================================================
   DATA E HORA
====================================================== */

function atualizarHorario(){

const data=new Date();

const hora=data.toLocaleTimeString("pt-BR");

const relogio=document.querySelector("#horaAtual");

if(relogio){

relogio.innerHTML=hora;

}

}

setInterval(atualizarHorario,1000);

/* ======================================================
   ANIMAÇÃO AO ROLAR A PÁGINA
====================================================== */

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("mostrar");

}

});

});

document.querySelectorAll(".animal-card,.info-card").forEach(el=>{

observer.observe(el);

});
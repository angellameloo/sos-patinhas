/* =========================================================
   SOS PATINHAS
   JavaScript principal
   ========================================================= */


/* =========================================================
   1. FAVORITOS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const botoesFavoritos = document.querySelectorAll(".favorite-button");

    let favoritos = JSON.parse(
        localStorage.getItem("sosPatinhasFavoritos")
    ) || [];


    botoesFavoritos.forEach(function (botao) {

        const animal = botao.dataset.animal;

        // Verifica se já está favoritado
        if (favoritos.includes(animal)) {

            botao.classList.add("favorited");

            botao.innerHTML = '<i class="bi bi-heart-fill"></i>';

        }


        botao.addEventListener("click", function () {

            if (favoritos.includes(animal)) {

                // Remove dos favoritos
                favoritos = favoritos.filter(function (item) {
                    return item !== animal;
                });

                botao.classList.remove("favorited");

                botao.innerHTML = '<i class="bi bi-heart"></i>';

                mostrarMensagem(
                    `${animal} foi removido dos favoritos.`
                );

            } else {

                // Adiciona aos favoritos
                favoritos.push(animal);

                botao.classList.add("favorited");

                botao.innerHTML = '<i class="bi bi-heart-fill"></i>';

                mostrarMensagem(
                    `${animal} foi adicionado aos favoritos!`
                );

            }


            localStorage.setItem(
                "sosPatinhasFavoritos",
                JSON.stringify(favoritos)
            );

        });

    });


    /* =====================================================
       2. PESQUISA DA HOME
    ===================================================== */

    const formularioPesquisa =
        document.getElementById("formPesquisa");


    if (formularioPesquisa) {

        formularioPesquisa.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const cidade =
                    document.getElementById("cidade").value.trim();

                const especie =
                    document.getElementById("especie").value;

                const porte =
                    document.getElementById("porte").value;


                // Guarda os filtros para a página de animais
                const filtros = {

                    cidade: cidade,

                    especie: especie,

                    porte: porte

                };


                localStorage.setItem(
                    "sosPatinhasFiltros",
                    JSON.stringify(filtros)
                );


                // Redireciona para a página de animais
                window.location.href =
                    "pages/animais.html";

            }
        );

    }


    /* =====================================================
       3. ROLAGEM SUAVE
    ===================================================== */

    const linksInternos =
        document.querySelectorAll('a[href^="#"]');


    linksInternos.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const destino =
                document.querySelector(
                    this.getAttribute("href")
                );


            if (destino) {

                event.preventDefault();

                destino.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


});


/* =========================================================
   4. MENSAGEM TEMPORÁRIA
   ========================================================= */

function mostrarMensagem(texto) {

    const mensagemExistente =
        document.querySelector(".mensagem-sos");

    if (mensagemExistente) {
        mensagemExistente.remove();
    }


    const mensagem =
        document.createElement("div");


    mensagem.className = "mensagem-sos";


    mensagem.innerHTML = `
        <i class="bi bi-check-circle-fill"></i>
        <span>${texto}</span>
    `;


    document.body.appendChild(mensagem);


    setTimeout(function () {

        mensagem.classList.add("mostrar");

    }, 50);


    setTimeout(function () {

        mensagem.classList.remove("mostrar");


        setTimeout(function () {

            mensagem.remove();

        }, 300);

    }, 3000);

}
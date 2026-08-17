document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       FAVORITOS
    ========================================= */

    let favoritos = JSON.parse(
        localStorage.getItem("sosPatinhasFavoritos")
    ) || [];


    const botoesFavoritos = document.querySelectorAll(
        ".favorite-button"
    );


    botoesFavoritos.forEach(function (botao) {

        const animal = botao.dataset.animal;


        if (!animal) {
            return;
        }


        // Verifica se já está favoritado
        if (favoritos.includes(animal)) {

            botao.classList.add("favorited");

            botao.innerHTML =
                '<i class="bi bi-heart-fill"></i>';

        }


        botao.addEventListener("click", function () {

            if (favoritos.includes(animal)) {

                // Remove
                favoritos = favoritos.filter(function (item) {
                    return item !== animal;
                });

                botao.classList.remove("favorited");

                botao.innerHTML =
                    '<i class="bi bi-heart"></i>';

                mostrarMensagem(
                    `${animal} foi removido dos favoritos.`
                );

            } else {

                // Adiciona
                favoritos.push(animal);

                botao.classList.add("favorited");

                botao.innerHTML =
                    '<i class="bi bi-heart-fill"></i>';

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


    /* =========================================
       PESQUISA
    ========================================= */

    const formularioPesquisa =
        document.getElementById("formPesquisa");


    if (formularioPesquisa) {

        formularioPesquisa.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const cidade =
                    document.getElementById("cidade")?.value || "";

                const especie =
                    document.getElementById("especie")?.value || "";

                const porte =
                    document.getElementById("porte")?.value || "";


                const filtros = {

                    cidade: cidade,

                    especie: especie,

                    porte: porte

                };


                localStorage.setItem(
                    "sosPatinhasFiltros",
                    JSON.stringify(filtros)
                );


                window.location.href =
                    "pages/animais.html";

            }
        );

    }


    /* =========================================
       LINKS INTERNOS
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(
        function (link) {

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

        }
    );

});


/* =========================================
   MENSAGEM
========================================= */

function mostrarMensagem(texto) {

    const antiga =
        document.querySelector(".mensagem-sos");


    if (antiga) {
        antiga.remove();
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
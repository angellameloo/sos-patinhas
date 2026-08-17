document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       SISTEMA DE FAVORITOS
    ========================================= */

    let favoritos = JSON.parse(
        localStorage.getItem("sosPatinhasFavoritos")
    ) || [];


    const botoesFavoritos =
        document.querySelectorAll(".favorite-button");


    botoesFavoritos.forEach(function (botao) {

        const animal = botao.dataset.animal;


        if (!animal) {
            return;
        }


        // Se o animal já estiver favoritado
        if (favoritos.includes(animal)) {

            botao.innerHTML =
                '<i class="bi bi-heart-fill"></i>';

            botao.classList.add("favorited");

        }


        // Clique no coração
        botao.addEventListener("click", function () {

            if (favoritos.includes(animal)) {

                // REMOVE
                favoritos = favoritos.filter(
                    function (item) {
                        return item !== animal;
                    }
                );


                botao.innerHTML =
                    '<i class="bi bi-heart"></i>';

                botao.classList.remove("favorited");


                mostrarMensagem(
                    animal + " foi removido dos favoritos."
                );


            } else {

                // ADICIONA
                favoritos.push(animal);


                botao.innerHTML =
                    '<i class="bi bi-heart-fill"></i>';

                botao.classList.add("favorited");


                mostrarMensagem(
                    animal + " foi adicionado aos favoritos!"
                );

            }


            // Salva no navegador
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
                    document.getElementById("cidade").value;

                const especie =
                    document.getElementById("especie").value;

                const porte =
                    document.getElementById("porte").value;


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
       MENSAGEM
    ========================================= */

    window.mostrarMensagem = function (texto) {

        const mensagemAnterior =
            document.querySelector(".mensagem-sos");


        if (mensagemAnterior) {
            mensagemAnterior.remove();
        }


        const mensagem =
            document.createElement("div");


        mensagem.className =
            "mensagem-sos";


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

    };

});
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // FAVORITOS
    // ==========================================

    let favoritos = JSON.parse(
        localStorage.getItem("sosPatinhasFavoritos")
    ) || [];


    // Procura os corações dos animais
    const botoes = document.querySelectorAll(
        ".favorite-button"
    );


    botoes.forEach(function (botao) {

        const nomeAnimal =
            botao.getAttribute("data-animal");


        if (!nomeAnimal) {
            return;
        }


        // Verifica se o animal já está favoritado
        atualizarCoracao(
            botao,
            favoritos.includes(nomeAnimal)
        );


        // Clique no coração
        botao.addEventListener("click", function () {

            if (favoritos.includes(nomeAnimal)) {

                // ------------------------------
                // REMOVER DOS FAVORITOS
                // ------------------------------

                favoritos = favoritos.filter(
                    function (nome) {
                        return nome !== nomeAnimal;
                    }
                );


                atualizarCoracao(botao, false);


                mostrarMensagem(
                    nomeAnimal +
                    " foi removido dos favoritos."
                );


            } else {

                // ------------------------------
                // ADICIONAR AOS FAVORITOS
                // ------------------------------

                favoritos.push(nomeAnimal);


                atualizarCoracao(botao, true);


                mostrarMensagem(
                    nomeAnimal +
                    " foi adicionado aos favoritos! ❤️"
                );

            }


            // Salva no navegador
            localStorage.setItem(
                "sosPatinhasFavoritos",
                JSON.stringify(favoritos)
            );

        });

    });


    // ==========================================
    // ATUALIZAR CORAÇÃO
    // ==========================================

    function atualizarCoracao(botao, favoritado) {

        if (favoritado) {

            botao.classList.add("favorited");

            botao.innerHTML =
                '<i class="bi bi-heart-fill"></i>';

            botao.setAttribute(
                "aria-label",
                "Remover dos favoritos"
            );

        } else {

            botao.classList.remove("favorited");

            botao.innerHTML =
                '<i class="bi bi-heart"></i>';

            botao.setAttribute(
                "aria-label",
                "Favoritar animal"
            );

        }

    }


    // ==========================================
    // MENSAGEM
    // ==========================================

    function mostrarMensagem(texto) {

        const mensagemAntiga =
            document.querySelector(".mensagem-sos");


        if (mensagemAntiga) {
            mensagemAntiga.remove();
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

    }

});
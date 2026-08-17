document.addEventListener("DOMContentLoaded", function () {

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


        // Verifica se já está favoritado
        if (favoritos.includes(animal)) {

            botao.innerHTML =
                '<i class="bi bi-heart-fill"></i>';

            botao.classList.add("favorited");

        }


        botao.addEventListener("click", function () {

            if (favoritos.includes(animal)) {

                // Remover
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

                // Adicionar
                favoritos.push(animal);

                botao.innerHTML =
                    '<i class="bi bi-heart-fill"></i>';

                botao.classList.add("favorited");

                mostrarMensagem(
                    animal + " foi adicionado aos favoritos!"
                );
            }


            localStorage.setItem(
                "sosPatinhasFavoritos",
                JSON.stringify(favoritos)
            );

        });

    });

});


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
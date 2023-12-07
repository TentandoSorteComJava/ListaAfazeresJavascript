const entradaAfazer = document.querySelector(".entrada-afazer");
const botaoAfazer = document.querySelector(".botao-afazer");
const listaAfazer = document.querySelector(".lista-afazer");
const filtroAfazer = document.querySelector(".filtro-afazer");

document.addEventListener("DOMContentLoaded", obterAfazeresLocais);
botaoAfazer.addEventListener("click", adicionarAfazer);
listaAfazer.addEventListener("click", deletarConferirAfazer);
filtroAfazer.addEventListener("change", filtrarAfazeres);

function adicionarAfazer(evento) {
    evento.preventDefault();
    const divAfazer = document.createElement("div");
    divAfazer.classList.add("afazer");
    const novoAfazer = document.createElement("li");
    novoAfazer.innerText = entradaAfazer.value;
    novoAfazer.classList.add("item-afazer");
    divAfazer.appendChild(novoAfazer);
    
    salvarAfazeresLocais(entradaAfazer.value);

    const botaoConcluirAfazer = document.createElement("button");
    botaoConcluirAfazer.innerHTML = '<i class="fas fa-check-circle"></i>';
    botaoConcluirAfazer.classList.add("botao-concluir-afazer");
    divAfazer.appendChild(botaoConcluirAfazer);

    const botaoExcluirAfazer = document.createElement("button");
    botaoExcluirAfazer.innerHTML = '<i class="fas fa-trash"></i>';
    botaoExcluirAfazer.classList.add("botao-excluir-afazer");
    divAfazer.appendChild(botaoExcluirAfazer);
    
    listaAfazer.appendChild(divAfazer);
    entradaAfazer.value = "";
}

function deletarConferirAfazer(e) {
    const elemento = e.target;

    if(elemento.classList[0] === "botao-excluir-afazer") {
        const afazer = elemento.parentElement;
        afazer.classList.add("deslizar");

        removerAfazeresLocais(afazer);
        afazer.addEventListener("transitionend", function() {
            afazer.remove();
        });
    }

    if(elemento.classList[0] === "botao-concluir-afazer") {
        const afazer = elemento.parentElement;
        afazer.classList.toggle("concluido");
    }
}

function filtrarAfazeres(e) {
    const afazeres = listaAfazer.childNodes;
    afazeres.forEach(function(afazer) {
        switch(e.target.value) {
            case "todos": 
                afazer.style.display = "flex";
                break;
            case "completo": 
                if(afazer.classList.contains("concluido")) {
                    afazer.style.display = "flex";
                } else {
                    afazer.style.display = "none";
                }
                break;
            case "incompleto":
                if(!afazer.classList.contains("concluido")) {
                    afazer.style.display = "flex";
                } else {
                    afazer.style.display = "none";
                }
                break;
        }
    });
}

function salvarAfazeresLocais(afazer) {
    let afazeres;
    if(localStorage.getItem("afazeres") === null) {
        afazeres = [];
    } else {
        afazeres = JSON.parse(localStorage.getItem("afazeres"));
    }
    afazeres.push(afazer);
    localStorage.setItem("afazeres", JSON.stringify(afazeres));
}

function obterAfazeresLocais() {
    let afazeres;
    if(localStorage.getItem("afazeres") === null) {
        afazeres = [];
    } else {
        afazeres = JSON.parse(localStorage.getItem("afazeres"));
    }
    afazeres.forEach(function(afazer) {
        const divAfazer = document.createElement("div");
        divAfazer.classList.add("afazer");
        const novoAfazer = document.createElement("li");
        novoAfazer.innerText = afazer;
        novoAfazer.classList.add("item-afazer");
        divAfazer.appendChild(novoAfazer);

        const botaoConcluirAfazer = document.createElement("button");
        botaoConcluirAfazer.innerHTML = '<i class="fas fa-check-circle"></i>';
        botaoConcluirAfazer.classList.add("botao-concluir-afazer");
        divAfazer.appendChild(botaoConcluirAfazer);

        const botaoExcluirAfazer = document.createElement("button");
        botaoExcluirAfazer.innerHTML = '<i class="fas fa-trash"></i>';
        botaoExcluirAfazer.classList.add("botao-excluir-afazer");
        divAfazer.appendChild(botaoExcluirAfazer);

        listaAfazer.appendChild(divAfazer);
    });
}

function removerAfazeresLocais(afazer) {
    let afazeres;
    if(localStorage.getItem("afazeres") === null) {
        afazeres = [];
    } else {
        afazeres = JSON.parse(localStorage.getItem("afazeres"));
    }

    const indiceAfazer = afazer.children[0].innerText;

}
// ==========================
// CONFIGURAÇÕES EDITÁVEIS
// ==========================

const album = {
    nome: "Emanuely",
    dataNamoro: "2026-02-07",
    musica: "Luther",
    playlist: "https://open.spotify.com/playlist/1mNnrZr8rPctc6XZIX4Jcy?si=bf144285f5a84d14",

    memorias: [
        {
            titulo: "Momentos felizes 📸",
            legenda: "Nessa foto foi capturado o sorriso mais sincero que já dei, culpa totalmente sua. Foi um dos momentos mais felizes da minha vida."
        },
        {
            titulo: "Nosso 1º piquenique ✨",
            legenda: "Aqui foi onde tivemos nosso primeiro 'encontro', passamos o dia comendo frutinhas, bolo de limão e suco de laranja. E foi o dia onde encontramos nossa música..."
        },
        {
            titulo: "Onde tudo começou 💕",
            legenda: "Não poderia deixar isso de fora. Acho que para uma primeira impressão, essa foi a maneira mais engraçada de se conhecer kkk. Ali eu ainda não sabia o quanto importante você ia ser na minha vida. Eu amo esse momento, pois de fato foi o início de tudo!"
        },
        {
            titulo: "Minha foto favorita 📸",
            legenda: "Fotinha do seu niver, mas que tem muito carinho, eu vejo muito amor no nosso olhar e espero que mesmo velhinhos continuemos nos olhando assim. Eu te amo 💕"
        },
        {
            titulo: "Nosso momento favorito 🌷",
            legenda: "Por mais que seja uma foto aleatória, ela representa a parte mais feliz do meu dia. Qualquer momento que passo contigo se torna especial, seja assistindo um filme, ou só conversando. Amo nossos momentos."
        },
        {
            titulo: "Só nós dois ❤️",
            legenda: "Só coloquei essa foto pois amo o seu olhar, e amo o jeito que me olha com esses zoios verdes. 💚"
        },
        {
            titulo: "Mais uma lembrança especial ✨",
            legenda: "Mais um momento totalmente aleatório que se torna especial com você. Casal com mais aura +1000 🔥."
        },
        {
            titulo: "Conquistas 🤍",
            legenda: "Te amo demais. Você está comigo desde o começo, a pé, de bike e agora de moto. Um dia espero conquistar tudo que sonho, e quero que em todas essas conquistas você esteja do meu lado."
        }
    ]
};


// ==========================
// SCROLL / NAVEGAÇÃO
// ==========================

function scrollParaSeacao(idSeacao) {
    const elemento = document.getElementById(idSeacao);
    if (elemento) {
        elemento.scrollIntoView({
            behavior: "smooth"
        });
    }
}

function scrollParaHistoria() {
    scrollParaSeacao("page1");
}


// ==========================
// CONTADOR AVANÇADO (ESTILO SCRAPBOOK)
// ==========================

function atualizarContador() {
    const inicio = new Date("2026-02-07T00:00:00");
    const hoje = new Date();
    
    const diferenca = hoje - inicio;
    if (diferenca < 0) return;

    const totalDias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const totalSemanas = Math.floor(totalDias / 7);
    const totalMeses = (hoje.getFullYear() - inicio.getFullYear()) * 12 + (hoje.getMonth() - inicio.getMonth());
    const totalAnos = hoje.getFullYear() - inicio.getFullYear();
    const horas = hoje.getHours();

    const formatar = (num, digitos = 2) => String(num).padStart(digitos, '0');

    const elementoAnos = document.getElementById("box-anos");
    const elementoMeses = document.getElementById("box-meses");
    const elementoSemanas = document.getElementById("box-semanas");
    const elementoDias = document.getElementById("box-dias");
    const elementoHoras = document.getElementById("box-horas") || document.getElementById("box-hours");

    if (elementoAnos) elementoAnos.innerText = formatar(totalAnos, 3);
    if (elementoMeses) elementoMeses.innerText = formatar(totalMeses);
    if (elementoSemanas) elementoSemanas.innerText = formatar(totalSemanas);
    if (elementoDias) elementoDias.innerText = formatar(totalDias);
    if (elementoHoras) elementoHoras.innerText = formatar(horas);
}

atualizarContador();
setInterval(atualizarContador, 1000);


// ==========================
// MODAL MEMÓRIAS
// ==========================

function abrirMemoria(index) {
    if (!album.memorias[index]) return;

    const elementoTitulo = document.getElementById("tituloMemoria");
    const elementoTexto = document.getElementById("textoMemoria");
    const elementoModal = document.getElementById("modal");

    if (elementoTitulo && elementoTexto && elementoModal) {
        elementoTitulo.innerText = album.memorias[index].titulo;
        elementoTexto.innerText = album.memorias[index].legenda;
        elementoModal.style.display = "flex";
    }
}

function fecharModal() {
    const elementoModal = document.getElementById("modal");
    if (elementoModal) {
        elementoModal.style.display = "none";
    }
}

window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};


// ==========================
// CHUVA DE CORAÇÕES
// ==========================

function chuvaCoracoes() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            criarCoracao();
        }, i * 120);
    }

    setTimeout(() => {
        alert("Obrigado por fazer parte da minha história ❤️");
    }, 6500);
}

function criarCoracao() {
    const coracao = document.createElement("div");
    coracao.classList.add("coracao");
    coracao.innerHTML = "❤️";

    coracao.style.left = Math.random() * 100 + "vw";
    coracao.style.bottom = "-30px";
    coracao.style.fontSize = (20 + Math.random() * 25) + "px";

    document.body.appendChild(coracao);

    setTimeout(() => {
        coracao.remove();
    }, 4000);
}


// ==========================
// LOGICA DO JOGO DA VELHA
// ==========================

// ==========================
// LOGICA DO JOGO DA VELHA
// ==========================

// Captura as células e a caixa de recompensa
const celulas = document.querySelectorAll(".cell");
const caixaRecompensa = document.getElementById("reward-box");

let jogoAtivo = true;
let estadoJogo = ["", "", "", "", "", "", "", "", ""];

const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

// Adiciona o evento de clique em todas as células
celulas.forEach(celula => celula.addEventListener("click", cliqueCelula));

function cliqueCelula(evento) {
    const celulaClicada = evento.target;
    const indexClicado = parseInt(celulaClicada.getAttribute("data-index"));

    // Se a célula já estiver ocupada ou o jogo acabou, não faz nada
    if (estadoJogo[indexClicado] !== "" || !jogoAtivo) return;

    // Jogada do usuário (Emanuely)
    estadoJogo[indexClicado] = "❤️";
    celulaClicada.innerHTML = "❤️";

    // Verifica se o usuário ganhou ou empatou
    if (verificarResultado()) return;

    // Desativa o jogo temporariamente para a IA jogar
    jogoAtivo = false;
    
    // Executa a jogada do computador após um pequeno delay
    setTimeout(jogadaComputador, 400);
}

function jogadaComputador() {
    // Coleta os índices vazios
    let celulasVazias = [];
    for (let i = 0; i < estadoJogo.length; i++) {
        if (estadoJogo[i] === "") celulasVazias.push(i);
    }

    // Se houver espaço, o computador joga
    if (celulasVazias.length > 0) {
        const indexAleatorio = celulasVazias[Math.floor(Math.random() * celulasVazias.length)];
        estadoJogo[indexAleatorio] = "❌";
        
        // Procura a célula pelo atributo data-index correspondente
        const celulaAlvo = document.querySelector(`.cell[data-index='${indexAleatorio}']`);
        if (celulaAlvo) {
            celulaAlvo.innerHTML = "❌";
            celulaAlvo.style.color = "#777";
        }
        
        // Reativa o jogo após a jogada da IA
        jogoAtivo = true;

        // Verifica se a IA ganhou ou empatou após jogar
        verificarResultado();
    }
}

function verificarResultado() {
    let rodadaGanha = false;
    let sinalVencedor = "";

    for (let i = 0; i < combinacoesVitoria.length; i++) {
        const condicao = combinacoesVitoria[i];
        let a = estadoJogo[condicao[0]];
        let b = estadoJogo[condicao[1]];
        let c = estadoJogo[condicao[2]];

        if (a === "" || b === "" || c === "") continue;
        if (a === b && b === c) {
            rodadaGanha = true;
            sinalVencedor = a; 
            break;
        }
    }

    if (rodadaGanha) {
        jogoAtivo = false;
        
        if (sinalVencedor === "❤️") {
            if (caixaRecompensa) {
                caixaRecompensa.classList.remove("hidden");
                caixaRecompensa.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        } else {
            alert("Ah poxa, eu ganhei! Tente de novo para pegar seu prêmio! 😘");
            resetarJogo(); // Auto-reseta para ela tentar de novo se perder
        }
        return true;
    }

    // Se não há espaços vazios e ninguém ganhou, deu empate
    if (!estadoJogo.includes("")) {
        alert("Deu empate! Reinicie o jogo para tentar ganhar seu prêmio. 💕");
        jogoAtivo = false;
        return true;
    }

    return false;
}

function resetarJogo() {
    jogoAtivo = true;
    estadoJogo = ["", "", "", "", "", "", "", "", ""];
    if (caixaRecompensa) {
        caixaRecompensa.classList.add("hidden");
    }
    celulas.forEach(celula => {
        celula.innerHTML = "";
        celula.style.color = ""; // Reseta a cor cinza do ❌
    });
}
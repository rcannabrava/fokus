const html = document.querySelector('html');
const button = document.querySelector('.app__card-button');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.getElementById('start-pause');

const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

const musicaFoco = document.getElementById('alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('sons/play.wav');
const audioPause = new Audio('sons/pause.mp3');
const tempoFinalizado = new Audio ('sons/beep.mp3');

const timer = document.getElementById('timer');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFoco.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1;
    alterarContexto('foco');
    titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`;
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    titulo.innerHTML = `Que tal dar uma respirada?<strong class="app__title-strong">Faça uma pausa curta!</strong>`;
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    titulo.innerHTML = `Hora de voltar à superficie.<br><strong class="app__title-strong">Faça uma pausa longa!</strong>`;
    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        tempoFinalizado.play();
        alert('Tempo finalizado');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if(focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarPausar);

function iniciarPausar() {
    if(intervaloId) {
        audioPause.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    startPauseBt.innerHTML = `<img class="app__card-primary-butto-icon" src="imagens/pause.png" alt=""> <span>Pausar</span>`;
}

function zerar() {
    clearInterval(intervaloId);
    startPauseBt.innerHTML = `<img class="app__card-primary-butto-icon" src="imagens/play_arrow.png" alt=""> <span>Começar</span>`;
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    timer.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
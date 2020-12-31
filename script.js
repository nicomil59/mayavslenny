const btn = document.querySelector('.btn');
const boost = document.querySelector('.boost');
// const reloadButton = document.querySelector('.reload');
const mayaCourse = document.querySelectorAll('.maya .bloc');
const opponentCourse = document.querySelectorAll('.opponent .bloc');
let previousIndex = 0;
let currentIndex = 19;
let previousIndexOppo = 0;
let currentIndexOppo = 19;
let isBoostActive = false;

const startSound = document.querySelector('#start-sound');
const moveSound = document.querySelector('#move-sound');
const winSound = document.querySelector('#win-sound');
const loseSound = document.querySelector('#lose-sound');
const drawSound = document.querySelector('#draw-sound');
const stallSound = document.querySelector('#stall-sound');
const boostSound = document.querySelector('#boost-sound');

const resultat = document.querySelector('.resultat');
const resultatContainer = document.querySelector('.resultat-container');

const endBlocs = document.querySelectorAll('.end');

const showSteps = document.querySelector('.start');

startSound.play();

//enclenche le boost après appui sur le bouton
boost.addEventListener('click', () => {
    isBoostActive = true;
    boostSound.play();
    boost.disabled = true;
}); 

//joue le son lors d'un clic
const playSound = (action) => {
    if (action === "move") {
        moveSound.play();
    } else if (action === "stall") {
        stallSound.play();
    }
}

//tire un numéro entre 0 et 2
const getStep = () => {
    return Math.floor(Math.random() * 3);
}

//vérifie quel est le vainqueur de la partie
const checkWhoWins = () => {
    if (currentIndex <= 0 && currentIndexOppo <= 0) {
        drawSound.play();
        resultat.innerHTML = 'ÉGALITÉ !<br><span class="message">Clique pour rejouer</span>';
        resultat.style.display = 'block';
        resultatContainer.style.display = 'block';
        endBlocs.forEach(endbloc => {
            endbloc.innerText = '';
        });
    } else if (currentIndex <= 0) {
        winSound.play();
        resultat.innerHTML = 'BRAVO MAYA !<br><span class="message">Clique pour rejouer</span>';
        resultat.style.display = 'block';
        resultatContainer.style.display = 'block';
        endBlocs[0].innerText = '';
    } else if (currentIndexOppo <= 0) {
        loseSound.play();
        resultat.innerHTML = 'LENNY A ÉTÉ PLUS RAPIDE !<br><span class="message">Clique pour rejouer</span>';
        resultat.style.display = 'block';
        resultatContainer.style.display = 'block';
        endBlocs[1].innerText = '';
    }
}

//fonction pour mouvement joueur
const mayaMove = () => {
    
    const step = getStep();
    previousIndex = currentIndex;

    if (isBoostActive) {
        currentIndex -= step + 2;
        isBoostActive = false;
        showSteps.innerText = `+${step+2}`;
    } else {
        currentIndex -= step;
        showSteps.innerText = `+${step}`;
    }

    mayaCourse[previousIndex].classList.remove("filled");

    if (step > 0) {
        playSound("move");
    } else playSound("stall")

    if (currentIndex <= 0) {
        // console.log("Tu es arrivé")
        mayaCourse[0].classList.add("filled");
        btn.disabled = true;
    } else {
        // console.log(`Il te reste encore ${currentIndex} cases pour finir`);
        mayaCourse[currentIndex].classList.add("filled");
    }
}

//fonction pour mouvement adversaire
const oppoMove = () => {
    const step = getStep();
    previousIndexOppo = currentIndexOppo;
    currentIndexOppo -= step;
    
    opponentCourse[previousIndexOppo].classList.remove("filled-oppo");

    if (currentIndexOppo <= 0) {
        opponentCourse[0].classList.add("filled-oppo");
        btn.disabled = true;
    } else {
        opponentCourse[currentIndexOppo].classList.add("filled-oppo");
    }

    checkWhoWins();
}


//mouvements joueur et adversaire lors d'un clic
btn.addEventListener('click', mayaMove);
btn.addEventListener('click', oppoMove);

//Pour relancer la page
// reloadButton.addEventListener('click', () => {
//     window.location.reload();
// });
resultat.addEventListener('click', () => {
    window.location.reload();
});

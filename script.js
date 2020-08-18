const btnplay = document.getElementById('play');
const rondas = document.getElementById('rondas');
const mainimage = document.getElementById('main-image');
const options = document.getElementById('options');
const player = document.getElementById('player');
const fingers = document.getElementById('fingers');
const time = document.getElementById('time');

const modal = document.getElementById('modal');
const close = document.getElementById('close');
const detail = document.getElementById('detail');
const alert = document.getElementById('alert');
const numrounds = document.getElementById('numrounds');
const selectnumround = document.getElementById('select-numround');

let contadorrondas = '1';
let numrondaselegidas = '1';
const selection = ['piedra', 'papel', 'tijeras'];
let playerselection = '';
let pcselection = '';
let pointsplayer = 0;
let pointspc = 0;

const resetPlay = () => {
	count = 3;
	time.innerHTML = count;
	playerselection = '';
	for (const finger of fingers.children) {
		finger.classList.remove('hide');
	}
};

const compareFingers = (playerfinger, pcfinger) => {
	if (playerfinger == pcfinger) {
		//Han empatado vuelven a reintentar
		alert.innerHTML = '<p>Habéis empatado, vuelve a intentarlo</p>';
		alert.classList.add('modal--show');
		setTimeout(() => {
			alert.innerHTML = '';
			alert.classList.remove('modal--show');
			play();
			// resetPlay();
			// countFunction();
		}, 2000);
	} else {
		if ((playerfinger == 'papel' && pcfinger == 'piedra') || (playerfinger == 'piedra' && pcfinger == 'tijeras') || (playerfinger == 'tijeras' && pcfinger == 'papel')) {
			pointsplayer++;
			alert.innerHTML = '<p>Has ganado</p>';
		} else if ((playerfinger == 'papel' && pcfinger == 'tijeras') || (playerfinger == 'piedra' && pcfinger == 'papel') || (playerfinger == 'tijeras' && pcfinger == 'piedra')) {
			pointspc++;
			alert.innerHTML = '<p>Has perdido</p>';
		} else if (playerfinger == '' || playerfinger == 'undefined') {
			pointspc++;
			alert.innerHTML = '<p>Se acabo el tiempo, has perdido</p>';
		}
		alert.classList.add('modal--show');
		setTimeout(() => {
			alert.innerHTML = '';
			alert.classList.remove('modal--show');
			// options.classList.remove('hide');
			// player.classList.add('hide');
			contadorrondas++;
			if (numrondaselegidas >= contadorrondas) {
				//volver a jugar
				console.log('volver a jugar');
				resetPlay();
				options.classList.add('hide');
				player.classList.remove('hide');

				countFunction();
			} else {
				//fin del juego
				console.log('fin del juego');
				options.classList.remove('hide');
				player.classList.add('hide');
			}
		}, 2000);
	}
};

const countFunction = () => {
	let count = 3;
	let c = setInterval(() => {
		if (count == 0) {
			clearInterval(c);
			pcselection = Math.floor(Math.random() * 3) + 1;
			time.innerHTML = '';
			const img = document.createElement('IMG');
			img.setAttribute('src', 'images/' + selection[pcselection - 1] + '.png');
			time.append(img);
			compareFingers(playerselection, selection[pcselection - 1]);
		} else {
			time.innerHTML = count;
			count = count - 1;
		}
	}, 1000);
};

fingers.addEventListener('click', (e) => {
	if (e.target.nodeName == 'IMG') {
		const elements = document.querySelectorAll('.fingers img:not(#' + e.target.id + ')');
		for (const element of elements) {
			element.classList.add('hide');
			playerselection = e.target.id;
		}
	}
});

const play = () => {
	resetPlay();
	options.classList.add('hide');
	player.classList.remove('hide');
	countFunction();
};

btnplay.addEventListener('click', (e) => {
	contadorrondas = 1;
	play();
});

rondas.addEventListener('click', (e) => {
	numrounds.classList.add('modal--show');
});

selectnumround.addEventListener('change', (e) => {
	numrounds.classList.remove('modal--show');
	numrondaselegidas = e.target.value;
});
